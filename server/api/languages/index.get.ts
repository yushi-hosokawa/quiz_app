import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const languages = await prisma.language.findMany({
      orderBy: {
        name: 'asc'
      },
      include: {
        _count: {
          select: { problems: true }
        }
      }
    })

    return languages
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: '言語の取得に失敗しました'
    })
  }
})
