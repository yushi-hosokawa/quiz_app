import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // 言語データ
  const javascript = await prisma.language.upsert({
    where: { name: 'JavaScript' },
    update: {},
    create: { name: 'JavaScript' }
  })

  const typescript = await prisma.language.upsert({
    where: { name: 'TypeScript' },
    update: {},
    create: { name: 'TypeScript' }
  })

  const python = await prisma.language.upsert({
    where: { name: 'Python' },
    update: {},
    create: { name: 'Python' }
  })

  console.log('Languages created:', { javascript, typescript, python })

  const sql = await prisma.language.upsert({
    where: { name: 'SQL' },
    update: {},
    create: { name: 'SQL' }
  })

  console.log('Languages created:', { javascript, typescript, python, sql })

  // ジャンルデータ
  const basics = await prisma.genre.upsert({
    where: { name: '基礎文法' },
    update: {},
    create: { name: '基礎文法' }
  })

  const async = await prisma.genre.upsert({
    where: { name: '非同期処理' },
    update: {},
    create: { name: '非同期処理' }
  })

  const oop = await prisma.genre.upsert({
    where: { name: 'オブジェクト指向' },
    update: {},
    create: { name: 'オブジェクト指向' }
  })

  const algorithm = await prisma.genre.upsert({
    where: { name: 'アルゴリズム' },
    update: {},
    create: { name: 'アルゴリズム' }
  })

  const database = await prisma.genre.upsert({
    where: { name: 'データベース' },
    update: {},
    create: { name: 'データベース' }
  })

  console.log('Genres created:', { basics, async, oop, algorithm, database })

  // サンプル問題
  const problem1 = await prisma.problem.create({
    data: {
      questionType: 'choice',
      questionText: 'JavaScriptで変数を宣言する際、再代入不可能な変数を宣言するキーワードは？',
      answerText: 'const',
      explanation: 'constは定数を宣言するキーワードで、一度代入すると再代入できません。',
      languageId: javascript.id,
      genreId: basics.id,
      difficulty: 'easy',
      choices: {
        create: [
          { choiceText: 'var', isCorrect: false, displayOrder: 1 },
          { choiceText: 'let', isCorrect: false, displayOrder: 2 },
          { choiceText: 'const', isCorrect: true, displayOrder: 3 },
          { choiceText: 'function', isCorrect: false, displayOrder: 4 }
        ]
      }
    }
  })

  const problem2 = await prisma.problem.create({
    data: {
      questionType: 'choice',
      questionText: 'TypeScriptで型を定義する際に使用するキーワードは？',
      answerText: 'type',
      explanation: 'typeキーワードを使用して型エイリアスを定義できます。interfaceも型定義に使用できます。',
      languageId: typescript.id,
      genreId: basics.id,
      difficulty: 'easy',
      choices: {
        create: [
          { choiceText: 'type', isCorrect: true, displayOrder: 1 },
          { choiceText: 'define', isCorrect: false, displayOrder: 2 },
          { choiceText: 'declare', isCorrect: false, displayOrder: 3 },
          { choiceText: 'typedef', isCorrect: false, displayOrder: 4 }
        ]
      }
    }
  })

  const problem3 = await prisma.problem.create({
    data: {
      questionType: 'choice',
      questionText: 'JavaScriptでPromiseを待機するために使用するキーワードは？',
      answerText: 'await',
      explanation: 'await演算子はPromiseの解決を待機します。async関数内でのみ使用できます。',
      languageId: javascript.id,
      genreId: async.id,
      difficulty: 'medium',
      choices: {
        create: [
          { choiceText: 'wait', isCorrect: false, displayOrder: 1 },
          { choiceText: 'await', isCorrect: true, displayOrder: 2 },
          { choiceText: 'sleep', isCorrect: false, displayOrder: 3 },
          { choiceText: 'defer', isCorrect: false, displayOrder: 4 }
        ]
      }
    }
  })

  const problem4 = await prisma.problem.create({
    data: {
      questionType: 'choice',
      questionText: 'Pythonでリストの最後に要素を追加するメソッドは？',
      answerText: 'append',
      explanation: 'append()メソッドはリストの末尾に要素を追加します。',
      languageId: python.id,
      genreId: basics.id,
      difficulty: 'easy',
      choices: {
        create: [
          { choiceText: 'add', isCorrect: false, displayOrder: 1 },
          { choiceText: 'append', isCorrect: true, displayOrder: 2 },
          { choiceText: 'push', isCorrect: false, displayOrder: 3 },
          { choiceText: 'insert', isCorrect: false, displayOrder: 4 }
        ]
      }
    }
  })

  const problem5 = await prisma.problem.create({
    data: {
      questionType: 'text',
      questionText: 'JavaScriptで配列の要素数を取得するプロパティ名を答えてください。',
      answerText: 'length',
      explanation: 'lengthプロパティは配列やstringsの長さを返します。',
      languageId: javascript.id,
      genreId: basics.id,
      difficulty: 'easy'
    }
  })

  const problem6 = await prisma.problem.create({
    data: {
      questionType: 'choice',
      questionText: 'JavaScriptで配列を宣言する正しい方法はどれですか？',
      explanation: '配列は[]を使って宣言します。{}はオブジェクト、()は関数の引数や式で使用されます。',
      languageId: javascript.id,
      genreId: basics.id,
      difficulty: 'easy',
      choices: {
        create: [
          { choiceText: 'let arr = []', isCorrect: true, displayOrder: 1 },
          { choiceText: 'let arr = {}', isCorrect: false, displayOrder: 2 },
          { choiceText: 'let arr = ()', isCorrect: false, displayOrder: 3 },
          { choiceText: 'let arr = <>', isCorrect: false, displayOrder: 4 }
        ]
      },
      tags: {
        create: [
          { tagName: '配列' },
          { tagName: '基礎' }
        ]
      }
    }
  })

  const problem7 = await prisma.problem.create({
    data: {
      questionType: 'code',
      questionText: 'JavaScriptで1から10までの数字を合計する関数を書いてください',
      answerText: `function sum() {
  let total = 0;
  for (let i = 1; i <= 10; i++) {
    total += i;
  }
  return total;
}`,
      explanation: 'forループを使って1から10まで繰り返し、totalに加算していきます。結果は55になります。',
      languageId: javascript.id,
      genreId: algorithm.id,
      difficulty: 'medium',
      tags: {
        create: [
          { tagName: 'ループ' },
          { tagName: '関数' }
        ]
      }
    }
  })

  const problem8 = await prisma.problem.create({
    data: {
      questionType: 'choice',
      questionText: 'SQLで全てのレコードを取得するキーワードはどれですか？',
      explanation: 'SELECT * FROM テーブル名 で全てのカラムとレコードを取得できます。',
      languageId: sql.id,
      genreId: database.id,
      difficulty: 'easy',
      choices: {
        create: [
          { choiceText: 'SELECT *', isCorrect: true, displayOrder: 1 },
          { choiceText: 'GET *', isCorrect: false, displayOrder: 2 },
          { choiceText: 'FETCH *', isCorrect: false, displayOrder: 3 },
          { choiceText: 'RETRIEVE *', isCorrect: false, displayOrder: 4 }
        ]
      },
      tags: {
        create: [
          { tagName: 'SQL' },
          { tagName: '基礎' }
        ]
      }
    }
  })

  const problem9 = await prisma.problem.create({
    data: {
      questionType: 'choice',
      questionText: 'Pythonでリストを逆順にするメソッドはどれですか？',
      explanation: 'reverse()メソッドはリストを逆順にします。sort()はソート、append()は要素追加、pop()は要素削除です。',
      languageId: python.id,
      genreId: basics.id,
      difficulty: 'easy',
      choices: {
        create: [
          { choiceText: 'reverse()', isCorrect: true, displayOrder: 1 },
          { choiceText: 'sort()', isCorrect: false, displayOrder: 2 },
          { choiceText: 'append()', isCorrect: false, displayOrder: 3 },
          { choiceText: 'pop()', isCorrect: false, displayOrder: 4 }
        ]
      },
      tags: {
        create: [
          { tagName: 'リスト' },
          { tagName: 'メソッド' }
        ]
      }
    }
  })

  const problem10 = await prisma.problem.create({
    data: {
      questionType: 'choice',
      questionText: 'SQLで重複を除外してデータを取得するキーワードは？',
      explanation: 'DISTINCTキーワードを使うと重複した値を除外して取得できます。',
      languageId: sql.id,
      genreId: database.id,
      difficulty: 'easy',
      choices: {
        create: [
          { choiceText: 'DISTINCT', isCorrect: true, displayOrder: 1 },
          { choiceText: 'UNIQUE', isCorrect: false, displayOrder: 2 },
          { choiceText: 'DIFFERENT', isCorrect: false, displayOrder: 3 },
          { choiceText: 'EXCLUDE', isCorrect: false, displayOrder: 4 }
        ]
      },
      tags: {
        create: [
          { tagName: 'SQL' },
          { tagName: '基礎' }
        ]
      }
    }
  })

  console.log('Problems created: 10 problems')
  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
