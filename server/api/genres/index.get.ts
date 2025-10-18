import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const genres = await prisma.genre.findMany({
      orderBy: {
        name: 'asc'
      },
      include: {
        _count: {
          select: { problems: true }
        }
      }
    })

    return genres
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'ジャンルの取得に失敗しました'
    })
  }
})
