import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const limit = Number(query.limit) || 10

    // 学習記録のある問題を取得
    const problems = await prisma.problem.findMany({
      where: {
        studyRecords: {
          some: {}
        }
      },
      include: {
        language: true,
        genre: true,
        studyRecords: true
      }
    })

    // 問題ごとの統計を計算
    const problemStats = problems
      .map(problem => {
        const totalAttempts = problem.studyRecords.length
        const correctAttempts = problem.studyRecords.filter(r => r.isCorrect).length
        const correctRate = totalAttempts > 0
          ? (correctAttempts / totalAttempts) * 100
          : 0

        return {
          id: problem.id,
          questionText: problem.questionText,
          questionType: problem.questionType,
          language: problem.language?.name || null,
          genre: problem.genre?.name || null,
          difficulty: problem.difficulty,
          totalAttempts,
          correctAttempts,
          incorrectAttempts: totalAttempts - correctAttempts,
          correctRate: Math.round(correctRate)
        }
      })
      .filter(stat => stat.totalAttempts >= 2) // 少なくとも2回以上解いた問題
      .sort((a, b) => a.correctRate - b.correctRate) // 正答率が低い順
      .slice(0, limit)

    return problemStats
  } catch (error: any) {
    console.error('Weak problems fetch error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '苦手な問題の取得に失敗しました'
    })
  }
})
