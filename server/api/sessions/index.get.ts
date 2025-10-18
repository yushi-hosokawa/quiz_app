import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const limit = query.limit ? parseInt(query.limit as string) : 10

    // セッションを取得
    const sessions = await prisma.studySession.findMany({
      take: limit,
      orderBy: { sessionStart: 'desc' },
      include: {
        studyRecords: {
          select: {
            isCorrect: true
          }
        }
      }
    })

    // 各セッションの正解数を計算
    const sessionsWithStats = sessions.map(session => ({
      id: session.id,
      sessionStart: session.sessionStart,
      sessionEnd: session.sessionEnd,
      totalQuestions: session.totalQuestions,
      correctCount: session.studyRecords.filter(r => r.isCorrect).length
    }))

    return sessionsWithStats
  } catch (error: any) {
    console.error('Sessions fetch error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'セッションの取得に失敗しました'
    })
  }
})
