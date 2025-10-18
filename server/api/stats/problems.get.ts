import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // 全問題を取得し、各問題の統計を計算
    const problems = await prisma.problem.findMany({
      include: {
        language: true,
        genre: true,
        studyRecords: {
          orderBy: {
            answeredAt: 'desc'
          }
        }
      }
    })

    // 問題ごとの統計を計算
    const problemStats = problems.map(problem => {
      const totalAttempts = problem.studyRecords.length
      const correctAttempts = problem.studyRecords.filter(r => r.isCorrect).length
      const correctRate = totalAttempts > 0
        ? Math.round((correctAttempts / totalAttempts) * 100)
        : null

      const lastStudied = problem.studyRecords.length > 0
        ? problem.studyRecords[0].answeredAt
        : null

      return {
        id: problem.id,
        questionText: problem.questionText.substring(0, 100) + (problem.questionText.length > 100 ? '...' : ''),
        questionType: problem.questionType,
        language: problem.language?.name || null,
        genre: problem.genre?.name || null,
        difficulty: problem.difficulty,
        totalAttempts,
        correctAttempts,
        incorrectAttempts: totalAttempts - correctAttempts,
        correctRate,
        lastStudied
      }
    })

    // 正答率でソート（低い順）
    problemStats.sort((a, b) => {
      if (a.correctRate === null && b.correctRate === null) return 0
      if (a.correctRate === null) return 1
      if (b.correctRate === null) return -1
      return a.correctRate - b.correctRate
    })

    return problemStats
  } catch (error: any) {
    console.error('Problem stats fetch error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '問題別統計の取得に失敗しました'
    })
  }
})
