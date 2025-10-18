import { prisma } from '~/server/utils/prisma'

// 学習セッションを終了
export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id || '0')

    const session = await prisma.studySession.update({
      where: { id },
      data: {
        sessionEnd: new Date()
      }
    })

    return session
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'セッションの終了に失敗しました'
    })
  }
})
