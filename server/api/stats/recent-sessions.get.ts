import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const limit = Number(query.limit) || 10

    const sessions = await prisma.studySession.findMany({
      take: limit,
      orderBy: {
        sessionStart: 'desc'
      },
      include: {
        studyRecords: {
          include: {
            problem: {
              include: {
                language: true,
                genre: true
              }
            }
          }
        }
      }
    })

    // セッション情報を整形
    const result = sessions.map(session => {
      const totalProblems = session.studyRecords.length
      const correctCount = session.studyRecords.filter(r => r.isCorrect).length
      const correctRate = totalProblems > 0
        ? Math.round((correctCount / totalProblems) * 100)
        : 0

      return {
        id: session.id,
        sessionStart: session.sessionStart,
        sessionEnd: session.sessionEnd,
        totalProblems,
        correctCount,
        incorrectCount: totalProblems - correctCount,
        correctRate
      }
    })

    return result
  } catch (error: any) {
    console.error('Recent sessions fetch error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '最近のセッション取得に失敗しました'
    })
  }
})
