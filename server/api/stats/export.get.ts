import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // 全ての学習記録を取得
    const studyRecords = await prisma.studyRecord.findMany({
      include: {
        session: true,
        problem: {
          include: {
            language: true,
            genre: true
          }
        }
      },
      orderBy: {
        answeredAt: 'desc'
      }
    })

    // CSVヘッダー
    const headers = [
      'セッションID',
      '問題ID',
      '問題文',
      '問題タイプ',
      '言語',
      'ジャンル',
      '難易度',
      '正解',
      'ユーザーの解答',
      '解答日時',
      '解答時間（秒）'
    ]

    // CSVデータ
    const rows = studyRecords.map(record => [
      record.sessionId,
      record.problemId,
      `"${record.problem.questionText.replace(/"/g, '""')}"`, // ダブルクォートをエスケープ
      record.problem.questionType,
      record.problem.language?.name || '',
      record.problem.genre?.name || '',
      record.problem.difficulty || '',
      record.isCorrect ? '○' : '×',
      record.userAnswer ? `"${record.userAnswer.replace(/"/g, '""')}"` : '',
      new Date(record.answeredAt).toLocaleString('ja-JP'),
      record.timeSpent || ''
    ])

    // CSV文字列を作成
    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    // BOMを追加（Excel対応）
    const bom = '\uFEFF'
    const csvWithBom = bom + csv

    // レスポンスヘッダーを設定
    setResponseHeaders(event, {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="study_records_${new Date().toISOString().split('T')[0]}.csv"`
    })

    return csvWithBom
  } catch (error: any) {
    console.error('Export error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'データのエクスポートに失敗しました'
    })
  }
})
