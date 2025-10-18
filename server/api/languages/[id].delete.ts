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

    // 関連する問題のlanguageIdをnullに設定
    await prisma.problem.updateMany({
      where: { languageId: id },
      data: { languageId: null }
    })

    // 言語を削除
    await prisma.language.delete({
      where: { id }
    })

    return { success: true }
  } catch (error: any) {
    console.error('Language deletion error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '言語の削除に失敗しました'
    })
  }
})
