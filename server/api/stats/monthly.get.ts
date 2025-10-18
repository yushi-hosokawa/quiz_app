import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // 過去12ヶ月の学習記録を取得
    const twelveMonthsAgo = new Date()
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)

    const sessions = await prisma.studySession.findMany({
      where: {
        sessionStart: {
          gte: twelveMonthsAgo
        }
      },
      include: {
        studyRecords: true
      },
      orderBy: {
        sessionStart: 'asc'
      }
    })

    // 月別に集計
    const monthlyStats: Record<string, {
      month: string
      year: number
      monthNumber: number
      sessionCount: number
      totalProblems: number
      correctCount: number
      incorrectCount: number
    }> = {}

    sessions.forEach(session => {
      const sessionDate = new Date(session.sessionStart)
      const year = sessionDate.getFullYear()
      const month = sessionDate.getMonth() + 1
      const monthKey = `${year}-${String(month).padStart(2, '0')}`

      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = {
          month: monthKey,
          year,
          monthNumber: month,
          sessionCount: 0,
          totalProblems: 0,
          correctCount: 0,
          incorrectCount: 0
        }
      }

      monthlyStats[monthKey].sessionCount++
      monthlyStats[monthKey].totalProblems += session.studyRecords.length
      monthlyStats[monthKey].correctCount += session.studyRecords.filter(r => r.isCorrect).length
      monthlyStats[monthKey].incorrectCount += session.studyRecords.filter(r => !r.isCorrect).length
    })

    // 配列に変換してソート
    const result = Object.values(monthlyStats).sort((a, b) =>
      a.month.localeCompare(b.month)
    )

    return result
  } catch (error: any) {
    console.error('Monthly stats fetch error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '月間統計の取得に失敗しました'
    })
  }
})
