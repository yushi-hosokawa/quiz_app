import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // 間違えた問題のIDを取得（まだ正解していない問題）
    // 各問題について、最後の解答が不正解のものを取得
    const incorrectRecords = await prisma.studyRecord.findMany({
      where: {
        isCorrect: false
      },
      orderBy: {
        answeredAt: 'desc'
      },
      select: {
        problemId: true,
        answeredAt: true
      }
    })

    // 問題IDごとに最新の記録を取得
    const problemIds = new Set<number>()
    const problemLastAnswers = new Map<number, Date>()

    for (const record of incorrectRecords) {
      if (!problemLastAnswers.has(record.problemId)) {
        problemLastAnswers.set(record.problemId, record.answeredAt)
      }
    }

    // 各問題について、最後の解答が不正解かつ、その後正解していない問題を抽出
    for (const [problemId, lastIncorrectDate] of problemLastAnswers.entries()) {
      // この問題について、最後の不正解より後に正解があるかチェック
      const laterCorrectRecord = await prisma.studyRecord.findFirst({
        where: {
          problemId,
          isCorrect: true,
          answeredAt: {
            gt: lastIncorrectDate
          }
        }
      })

      // 正解がなければ復習対象
      if (!laterCorrectRecord) {
        problemIds.add(problemId)
      }
    }

    // 復習対象の問題を取得
    const problems = await prisma.problem.findMany({
      where: {
        id: {
          in: Array.from(problemIds)
        }
      },
      include: {
        language: true,
        genre: true,
        choices: {
          orderBy: { displayOrder: 'asc' }
        },
        tags: true
      }
    })

    return problems
  } catch (error: any) {
    console.error('Review problems fetch error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '復習問題の取得に失敗しました'
    })
  }
})
