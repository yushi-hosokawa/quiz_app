import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const languageId = query.languageId ? Number(query.languageId) : undefined
    const genreId = query.genreId ? Number(query.genreId) : undefined
    const questionType = query.questionType as string | undefined
    const limit = query.limit ? Number(query.limit) : undefined

    const where: any = {}
    if (languageId) where.languageId = languageId
    if (genreId) where.genreId = genreId
    if (questionType) where.questionType = questionType

    const problems = await prisma.problem.findMany({
      where,
      include: {
        language: true,
        genre: true,
        choices: {
          orderBy: { displayOrder: 'asc' }
        },
        tags: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })

    return problems
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: '問題の取得に失敗しました'
    })
  }
})
