import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: '無効なIDです'
      })
    }

    // バリデーション
    if (!body.questionType || !body.questionText) {
      throw createError({
        statusCode: 400,
        statusMessage: '問題タイプと問題文は必須です'
      })
    }

    // 既存の選択肢とタグを削除
    await prisma.choice.deleteMany({
      where: { problemId: id }
    })
    await prisma.problemTag.deleteMany({
      where: { problemId: id }
    })

    // 問題を更新
    const problem = await prisma.problem.update({
      where: { id },
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
    console.error('Problem update error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '問題の更新に失敗しました'
    })
  }
})
