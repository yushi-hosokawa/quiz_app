import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // 過去12週間の学習記録を取得
    const twelveWeeksAgo = new Date()
    twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84) // 12 weeks

    const sessions = await prisma.studySession.findMany({
      where: {
        sessionStart: {
          gte: twelveWeeksAgo
        }
      },
      include: {
        studyRecords: true
      },
      orderBy: {
        sessionStart: 'asc'
      }
    })

    // 週別に集計
    const weeklyStats: Record<string, {
      weekStart: string
      weekEnd: string
      sessionCount: number
      totalProblems: number
      correctCount: number
      incorrectCount: number
    }> = {}

    sessions.forEach(session => {
      const sessionDate = new Date(session.sessionStart)

      // 週の開始日（日曜日）を計算
      const dayOfWeek = sessionDate.getDay()
      const weekStart = new Date(sessionDate)
      weekStart.setDate(sessionDate.getDate() - dayOfWeek)
      weekStart.setHours(0, 0, 0, 0)

      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)
      weekEnd.setHours(23, 59, 59, 999)

      const weekKey = weekStart.toISOString().split('T')[0]

      if (!weeklyStats[weekKey]) {
        weeklyStats[weekKey] = {
          weekStart: weekKey,
          weekEnd: weekEnd.toISOString().split('T')[0],
          sessionCount: 0,
          totalProblems: 0,
          correctCount: 0,
          incorrectCount: 0
        }
      }

      weeklyStats[weekKey].sessionCount++
      weeklyStats[weekKey].totalProblems += session.studyRecords.length
      weeklyStats[weekKey].correctCount += session.studyRecords.filter(r => r.isCorrect).length
      weeklyStats[weekKey].incorrectCount += session.studyRecords.filter(r => !r.isCorrect).length
    })

    // 配列に変換してソート
    const result = Object.values(weeklyStats).sort((a, b) =>
      a.weekStart.localeCompare(b.weekStart)
    )

    return result
  } catch (error: any) {
    console.error('Weekly stats fetch error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '週間統計の取得に失敗しました'
    })
  }
})
