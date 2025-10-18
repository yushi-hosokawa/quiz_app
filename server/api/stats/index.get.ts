import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // 総問題数
    const totalProblems = await prisma.problem.count()

    // 総セッション数
    const totalSessions = await prisma.studySession.count()

    // 総解答数と正解数
    const totalAnswers = await prisma.studyRecord.count()
    const correctAnswers = await prisma.studyRecord.count({
      where: { isCorrect: true }
    })

    // 正答率
    const correctRate = totalAnswers > 0
      ? Math.round((correctAnswers / totalAnswers) * 100)
      : 0

    // 言語別問題数
    const byLanguageRaw = await prisma.problem.groupBy({
      by: ['languageId'],
      _count: true,
      where: {
        languageId: { not: null }
      }
    })

    const languageIds = byLanguageRaw.map(item => item.languageId).filter((id): id is number => id !== null)
    const languages = await prisma.language.findMany({
      where: { id: { in: languageIds } }
    })

    const byLanguage = byLanguageRaw.map(item => {
      const language = languages.find(l => l.id === item.languageId)
      return {
        language: language?.name || '不明',
        count: item._count
      }
    })

    // ジャンル別問題数
    const byGenreRaw = await prisma.problem.groupBy({
      by: ['genreId'],
      _count: true,
      where: {
        genreId: { not: null }
      }
    })

    const genreIds = byGenreRaw.map(item => item.genreId).filter((id): id is number => id !== null)
    const genres = await prisma.genre.findMany({
      where: { id: { in: genreIds } }
    })

    const byGenre = byGenreRaw.map(item => {
      const genre = genres.find(g => g.id === item.genreId)
      return {
        genre: genre?.name || '不明',
        count: item._count
      }
    })

    return {
      totalProblems,
      totalSessions,
      totalAnswers,
      correctRate,
      byLanguage,
      byGenre
    }
  } catch (error: any) {
    console.error('Stats fetch error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '統計の取得に失敗しました'
    })
  }
})
