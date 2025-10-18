import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: '無効なIDです'
      })
    }

    // 問題を削除（カスケード削除により関連データも削除される）
    await prisma.problem.delete({
      where: { id }
    })

    return { success: true }
  } catch (error: any) {
    console.error('Problem deletion error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '問題の削除に失敗しました'
    })
  }
})
