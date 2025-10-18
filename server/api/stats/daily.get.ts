import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // 過去30日間の学習記録を取得
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const sessions = await prisma.studySession.findMany({
      where: {
        sessionStart: {
          gte: thirtyDaysAgo
        }
      },
      include: {
        studyRecords: true
      },
      orderBy: {
        sessionStart: 'asc'
      }
    })

    // 日別に集計
    const dailyStats: Record<string, {
      date: string
      sessionCount: number
      totalProblems: number
      correctCount: number
      incorrectCount: number
    }> = {}

    sessions.forEach(session => {
      const dateKey = session.sessionStart.toISOString().split('T')[0]

      if (!dailyStats[dateKey]) {
        dailyStats[dateKey] = {
          date: dateKey,
          sessionCount: 0,
          totalProblems: 0,
          correctCount: 0,
          incorrectCount: 0
        }
      }

      dailyStats[dateKey].sessionCount++
      dailyStats[dateKey].totalProblems += session.studyRecords.length
      dailyStats[dateKey].correctCount += session.studyRecords.filter(r => r.isCorrect).length
      dailyStats[dateKey].incorrectCount += session.studyRecords.filter(r => !r.isCorrect).length
    })

    // 配列に変換してソート
    const result = Object.values(dailyStats).sort((a, b) =>
      a.date.localeCompare(b.date)
    )

    return result
  } catch (error: any) {
    console.error('Daily stats fetch error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '日別統計の取得に失敗しました'
    })
  }
})
