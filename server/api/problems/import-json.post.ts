import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { problems } = body

    if (!Array.isArray(problems) || problems.length === 0) {
      throw createError({
        statusCode: 400,
        message: '問題データが不正です'
      })
    }

    let imported = 0
    const errors: string[] = []

    for (const [index, problemData] of problems.entries()) {
      try {
        // 言語・ジャンルの取得または作成
        let languageId: number | null = null
        let genreId: number | null = null

        if (problemData.language) {
          const language = await prisma.language.upsert({
            where: { name: problemData.language },
            create: { name: problemData.language },
            update: {}
          })
          languageId = language.id
        }

        if (problemData.genre) {
          const genre = await prisma.genre.upsert({
            where: { name: problemData.genre },
            create: { name: problemData.genre },
            update: {}
          })
          genreId = genre.id
        }

        // 問題を作成
        const problem = await prisma.problem.create({
          data: {
            questionType: problemData.questionType,
            questionText: problemData.questionText,
            answerText: problemData.answerText || null,
            explanation: problemData.explanation || null,
            languageId,
            genreId,
            difficulty: problemData.difficulty || null
          }
        })

        // 選択肢を作成（選択式問題の場合）
        if (problemData.questionType === 'choice' && problemData.choices) {
          for (const [choiceIndex, choice] of problemData.choices.entries()) {
            await prisma.choice.create({
              data: {
                problemId: problem.id,
                choiceText: choice.choiceText,
                isCorrect: choice.isCorrect || false,
                displayOrder: choiceIndex + 1
              }
            })
          }
        }

        // タグを作成
        if (problemData.tags && Array.isArray(problemData.tags)) {
          for (const tag of problemData.tags) {
            await prisma.problemTag.create({
              data: {
                problemId: problem.id,
                tagName: tag
              }
            })
          }
        }

        imported++
      } catch (error: any) {
        console.error(`Failed to import problem ${index + 1}:`, error)
        errors.push(`問題${index + 1}: ${error.message}`)
      }
    }

    if (errors.length > 0) {
      return {
        imported,
        errors,
        message: `${imported}問をインポートしました（${errors.length}件のエラー）`
      }
    }

    return {
      imported,
      message: `${imported}問をインポートしました`
    }
  } catch (error: any) {
    console.error('JSON import error:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'インポートに失敗しました'
    })
  }
})
