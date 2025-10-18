import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const count = query.count ? Number(query.count) : 10
    const random = query.random !== 'false' // デフォルトはtrue

    // クエリパラメータを配列として取得
    const getArrayParam = (key: string): string[] | undefined => {
      const value = query[key]
      if (!value) return undefined
      return Array.isArray(value) ? value as string[] : [value as string]
    }

    const questionTypes = getArrayParam('questionType')
    const languageIdStrs = getArrayParam('languageId')
    const genreIdStrs = getArrayParam('genreId')
    const difficulties = getArrayParam('difficulty')
    const tags = getArrayParam('tag')

    const languageIds = languageIdStrs?.map(Number).filter(n => !isNaN(n))
    const genreIds = genreIdStrs?.map(Number).filter(n => !isNaN(n))

    console.log('[Random API] Query params:', {
      count,
      random,
      questionTypes,
      languageIds,
      genreIds,
      difficulties,
      tags
    })

    // WHERE条件を構築
    const where: any = {}

    if (questionTypes && questionTypes.length > 0) {
      where.questionType = { in: questionTypes }
    }

    if (languageIds && languageIds.length > 0) {
      where.languageId = { in: languageIds }
    }

    if (genreIds && genreIds.length > 0) {
      where.genreId = { in: genreIds }
    }

    if (difficulties && difficulties.length > 0) {
      where.difficulty = { in: difficulties }
    }

    // タグフィルタ
    if (tags && tags.length > 0) {
      where.tags = {
        some: {
          tagName: { in: tags }
        }
      }
    }

    console.log('[Random API] Where clause:', where)

    // 総問題数を取得
    const totalCount = await prisma.problem.count({ where })
    console.log('[Random API] Total matching problems:', totalCount)

    if (totalCount === 0) {
      return []
    }

    const requestedCount = Math.min(count, totalCount)

    let problems: any[]

    if (random) {
      // ランダムに問題を取得
      const randomIndexes: number[] = []

      while (randomIndexes.length < requestedCount) {
        const randomIndex = Math.floor(Math.random() * totalCount)
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex)
        }
      }

      problems = await Promise.all(
        randomIndexes.map(async (skip) => {
          return await prisma.problem.findFirst({
            where,
            skip,
            include: {
              language: true,
              genre: true,
              choices: {
                orderBy: { displayOrder: 'asc' }
              },
              tags: true
            }
          })
        })
      )

      problems = problems.filter((p) => p !== null)
    } else {
      // 順序通りに問題を取得
      problems = await prisma.problem.findMany({
        where,
        take: requestedCount,
        include: {
          language: true,
          genre: true,
          choices: {
            orderBy: { displayOrder: 'asc' }
          },
          tags: true
        },
        orderBy: {
          id: 'asc'
        }
      })
    }

    console.log('[Random API] Returning', problems.length, 'problems')
    return problems
  } catch (error: any) {
    console.error('[Random API] Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'ランダム問題の取得に失敗しました'
    })
  }
})
