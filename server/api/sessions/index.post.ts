import { prisma } from '~/server/utils/prisma'

// 新しい学習セッションを開始
export default defineEventHandler(async (event) => {
  try {
    const session = await prisma.studySession.create({
      data: {
        sessionStart: new Date(),
        totalQuestions: 0
      }
    })

    return session
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'セッションの作成に失敗しました'
    })
  }
})
