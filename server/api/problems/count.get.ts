import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // クエリパラメータから配列を取得するヘルパー関数
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

  // フィルタ条件を構築
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

  if (tags && tags.length > 0) {
    where.tags = {
      some: {
        tagName: { in: tags }
      }
    }
  }

  // 問題数をカウント
  const count = await prisma.problem.count({
    where
  })

  return { count }
})
