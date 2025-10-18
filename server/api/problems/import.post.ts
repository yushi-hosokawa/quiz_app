import { prisma } from '~/server/utils/prisma'

interface CSVRow {
  question_type: string
  question_text: string
  answer_text: string
  explanation: string
  language: string
  genre: string
  difficulty: string
  tags: string
  choice1?: string
  choice2?: string
  choice3?: string
  choice4?: string
  correct_choice?: string
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const csvData: CSVRow[] = body.data

    if (!Array.isArray(csvData) || csvData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'CSVデータが不正です'
      })
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as any[]
    }

    for (let i = 0; i < csvData.length; i++) {
      const row = csvData[i]

      try {
        // バリデーション
        if (!row.question_type || !row.question_text) {
          throw new Error('問題タイプと問題文は必須です')
        }

        if (!['choice', 'text', 'code'].includes(row.question_type)) {
          throw new Error('問題タイプは choice, text, code のいずれかである必要があります')
        }

        // 言語を取得または作成
        let language = null
        if (row.language && row.language.trim()) {
          language = await prisma.language.upsert({
            where: { name: row.language.trim() },
            update: {},
            create: { name: row.language.trim() }
          })
        }

        // ジャンルを取得または作成
        let genre = null
        if (row.genre && row.genre.trim()) {
          genre = await prisma.genre.upsert({
            where: { name: row.genre.trim() },
            update: {},
            create: { name: row.genre.trim() }
          })
        }

        // タグを分割
        const tags = row.tags
          ? row.tags.split(';').map(t => t.trim()).filter(t => t.length > 0)
          : []

        // 選択肢を処理
        const choices: any[] = []
        if (row.question_type === 'choice') {
          const correctChoiceNum = parseInt(row.correct_choice || '0')

          if (!correctChoiceNum || correctChoiceNum < 1 || correctChoiceNum > 4) {
            throw new Error('正解の選択肢番号(1-4)が必要です')
          }

          for (let j = 1; j <= 4; j++) {
            const choiceKey = `choice${j}` as keyof CSVRow
            const choiceText = row[choiceKey]

            if (choiceText && choiceText.trim()) {
              choices.push({
                choiceText: choiceText.trim(),
                isCorrect: j === correctChoiceNum,
                displayOrder: j
              })
            }
          }

          if (choices.length < 2) {
            throw new Error('選択式問題には少なくとも2つの選択肢が必要です')
          }
        }

        // 問題を作成
        await prisma.problem.create({
          data: {
            questionType: row.question_type,
            questionText: row.question_text.trim(),
            answerText: row.answer_text ? row.answer_text.trim() : null,
            explanation: row.explanation ? row.explanation.trim() : null,
            languageId: language?.id || null,
            genreId: genre?.id || null,
            difficulty: row.difficulty && ['easy', 'medium', 'hard'].includes(row.difficulty)
              ? row.difficulty
              : null,
            choices: choices.length > 0 ? {
              create: choices
            } : undefined,
            tags: tags.length > 0 ? {
              create: tags.map(tag => ({ tagName: tag }))
            } : undefined
          }
        })

        results.success++
      } catch (error: any) {
        results.failed++
        results.errors.push({
          row: i + 1,
          data: row,
          error: error.message
        })
      }
    }

    return results
  } catch (error: any) {
    console.error('CSV import error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'CSVインポートに失敗しました: ' + error.message
    })
  }
})
