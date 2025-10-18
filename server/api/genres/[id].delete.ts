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

    // 関連する問題のgenreIdをnullに設定
    await prisma.problem.updateMany({
      where: { genreId: id },
      data: { genreId: null }
    })

    // ジャンルを削除
    await prisma.genre.delete({
      where: { id }
    })

    return { success: true }
  } catch (error: any) {
    console.error('Genre deletion error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'ジャンルの削除に失敗しました'
    })
  }
})
