import { prisma } from '~/server/utils/prisma'

// 学習記録を追加
export default defineEventHandler(async (event) => {
  try {
    const sessionId = parseInt(event.context.params?.id || '0')
    const body = await readBody(event)

    if (!body.problemId || typeof body.isCorrect !== 'boolean') {
      throw createError({
        statusCode: 400,
        statusMessage: '問題IDと正誤情報が必要です'
      })
    }

    // 記録を作成
    const record = await prisma.studyRecord.create({
      data: {
        sessionId,
        problemId: body.problemId,
        isCorrect: body.isCorrect,
        userAnswer: body.userAnswer || null,
        timeSpent: body.timeSpent || null
      }
    })

    // セッションの総問題数を更新
    await prisma.studySession.update({
      where: { id: sessionId },
      data: {
        totalQuestions: {
          increment: 1
        }
      }
    })

    return record
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: '学習記録の保存に失敗しました'
    })
  }
})
