import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const days = Number(query.days) || 90 // デフォルトは90日（約3ヶ月）

    // 指定日数前から今日までの学習記録を取得
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    startDate.setHours(0, 0, 0, 0)

    const sessions = await prisma.studySession.findMany({
      where: {
        sessionStart: {
          gte: startDate
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

    // 全ての日付を初期化（データがない日も含める）
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - 1 - i))
      date.setHours(0, 0, 0, 0)
      const dateKey = date.toISOString().split('T')[0]

      dailyStats[dateKey] = {
        date: dateKey,
        sessionCount: 0,
        totalProblems: 0,
        correctCount: 0,
        incorrectCount: 0
      }
    }

    // セッションデータを集計
    sessions.forEach(session => {
      const dateKey = session.sessionStart.toISOString().split('T')[0]

      if (dailyStats[dateKey]) {
        dailyStats[dateKey].sessionCount++
        dailyStats[dateKey].totalProblems += session.studyRecords.length
        dailyStats[dateKey].correctCount += session.studyRecords.filter(r => r.isCorrect).length
        dailyStats[dateKey].incorrectCount += session.studyRecords.filter(r => !r.isCorrect).length
      }
    })

    // 配列に変換してソート
    const result = Object.values(dailyStats).sort((a, b) =>
      a.date.localeCompare(b.date)
    )

    return result
  } catch (error: any) {
    console.error('Calendar stats fetch error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'カレンダー統計の取得に失敗しました'
    })
  }
})
