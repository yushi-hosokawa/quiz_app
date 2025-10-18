import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id || '0')

    const problem = await prisma.problem.findUnique({
      where: { id },
      include: {
        language: true,
        genre: true,
        choices: {
          orderBy: { displayOrder: 'asc' }
        },
        tags: true
      }
    })

    if (!problem) {
      throw createError({
        statusCode: 404,
        statusMessage: '問題が見つかりません'
      })
    }

    return problem
  } catch (error: any) {
    if (error.statusCode === 404) throw error

    throw createError({
      statusCode: 500,
      statusMessage: '問題の取得に失敗しました'
    })
  }
})
