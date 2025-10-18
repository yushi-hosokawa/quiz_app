import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // バリデーション
    if (!body.questionType || !body.questionText) {
      throw createError({
        statusCode: 400,
        statusMessage: '問題タイプと問題文は必須です'
      })
    }

    // 問題を作成
    const problem = await prisma.problem.create({
      data: {
        questionType: body.questionType,
        questionText: body.questionText,
        answerText: body.answerText || null,
        explanation: body.explanation || null,
        languageId: body.languageId || null,
        genreId: body.genreId || null,
        difficulty: body.difficulty || null,
        choices: body.choices && body.choices.length > 0 ? {
          create: body.choices.map((choice: any, index: number) => ({
            choiceText: choice.choiceText,
            isCorrect: choice.isCorrect || false,
            displayOrder: index + 1
          }))
        } : undefined,
        tags: body.tags && body.tags.length > 0 ? {
          create: body.tags.map((tag: string) => ({
            tagName: tag
          }))
        } : undefined
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

    return problem
  } catch (error: any) {
    console.error('Problem creation error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '問題の作成に失敗しました'
    })
  }
})
