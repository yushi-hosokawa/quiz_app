<template>
  <div class="max-w-6xl mx-auto animate-fade-in">
    <div class="mb-8">
      <NuxtLink to="/problems" class="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← 問題一覧に戻る
      </NuxtLink>
      <h1 class="text-4xl font-bold gradient-text">📥 JSONインポート</h1>
      <p class="text-gray-600 mt-2">JSON形式で複数の問題を一括登録できます</p>
    </div>

    <!-- JSON入力エリア -->
    <div class="card mb-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">📝 JSON データ</h2>
      <p class="text-sm text-gray-600 mb-4">
        JSON形式で問題データを貼り付けてください。配列形式で複数の問題を一度に登録できます。
      </p>
      <div class="json-editor-container">
        <CodeEditor
          v-model="jsonInput"
          :placeholder="placeholderText"
        />
      </div>
    </div>

    <!-- フォーマット説明 -->
    <div class="card mb-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">📖 フォーマット説明</h2>

      <div class="space-y-4 text-sm">
        <div>
          <h3 class="font-bold text-gray-900 mb-2">基本フィールド</h3>
          <ul class="list-disc list-inside space-y-1 text-gray-700 ml-4">
            <li><code class="bg-gray-100 px-2 py-1 rounded">questionType</code>: 問題タイプ（<code>"choice"</code> / <code>"text"</code> / <code>"code"</code>）【必須】</li>
            <li><code class="bg-gray-100 px-2 py-1 rounded">questionText</code>: 問題文【必須】</li>
            <li><code class="bg-gray-100 px-2 py-1 rounded">answerText</code>: 正解（記述式・プログラミング問題の場合）</li>
            <li><code class="bg-gray-100 px-2 py-1 rounded">explanation</code>: 解説</li>
            <li><code class="bg-gray-100 px-2 py-1 rounded">language</code>: プログラミング言語名</li>
            <li><code class="bg-gray-100 px-2 py-1 rounded">genre</code>: ジャンル名</li>
            <li><code class="bg-gray-100 px-2 py-1 rounded">difficulty</code>: 難易度（<code>"easy"</code> / <code>"medium"</code> / <code>"hard"</code>）</li>
            <li><code class="bg-gray-100 px-2 py-1 rounded">tags</code>: タグの配列（例: <code>["配列", "基礎"]</code>）</li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-gray-900 mb-2">選択式問題の場合</h3>
          <ul class="list-disc list-inside space-y-1 text-gray-700 ml-4">
            <li><code class="bg-gray-100 px-2 py-1 rounded">choices</code>: 選択肢の配列【必須】</li>
            <li>各選択肢には <code>choiceText</code>（テキスト）と <code>isCorrect</code>（正解かどうか）を指定</li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-gray-900 mb-2">Markdown対応</h3>
          <p class="text-gray-700 ml-4">
            問題文、解答、解説にはMarkdown記法が使えます。<br>
            コードブロックは <code>`</code>（インラインコード）や <code>```</code>（コードブロック）で記述できます。
          </p>
        </div>
      </div>
    </div>

    <!-- サンプルJSON -->
    <div class="card mb-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">💡 サンプルJSON</h2>
      <div class="space-y-4">
        <button
          @click="loadSample('choice')"
          class="btn-secondary mr-2"
        >
          選択式のサンプル
        </button>
        <button
          @click="loadSample('text')"
          class="btn-secondary mr-2"
        >
          記述式のサンプル
        </button>
        <button
          @click="loadSample('code')"
          class="btn-secondary"
        >
          プログラミングのサンプル
        </button>
      </div>
    </div>

    <!-- プレビュー -->
    <div v-if="previewData.length > 0" class="card mb-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">👀 プレビュー（{{ previewData.length }}問）</h2>
      <div class="space-y-4 max-h-96 overflow-y-auto">
        <div
          v-for="(problem, index) in previewData"
          :key="index"
          class="p-4 bg-gray-50 rounded-xl border border-gray-200"
        >
          <div class="flex items-center gap-2 mb-2">
            <span class="badge-primary text-xs">{{ index + 1 }}</span>
            <span class="badge-primary text-xs">{{ questionTypeText(problem.questionType) }}</span>
            <span v-if="problem.language" class="badge-success text-xs">{{ problem.language }}</span>
            <span v-if="problem.genre" class="badge-warning text-xs">{{ problem.genre }}</span>
            <span v-if="problem.difficulty" class="badge text-xs bg-gray-200 text-gray-700">
              {{ difficultyText(problem.difficulty) }}
            </span>
          </div>
          <p class="font-semibold text-gray-900 mb-1">{{ truncateText(problem.questionText, 100) }}</p>
          <p v-if="problem.questionType === 'choice' && problem.choices" class="text-xs text-gray-600">
            選択肢: {{ problem.choices.length }}個
          </p>
        </div>
      </div>
    </div>

    <!-- エラー表示 -->
    <div v-if="errors.length > 0" class="card mb-6 bg-red-50 border-red-200">
      <h2 class="text-xl font-bold text-red-900 mb-4">❌ エラー</h2>
      <ul class="space-y-2">
        <li
          v-for="(error, index) in errors"
          :key="index"
          class="text-sm text-red-700"
        >
          {{ error }}
        </li>
      </ul>
    </div>

    <!-- ボタン -->
    <div class="flex space-x-4 mb-8">
      <button
        @click="validateJSON"
        class="btn-secondary flex-1"
        :disabled="!jsonInput.trim()"
      >
        🔍 検証してプレビュー
      </button>
      <button
        @click="importJSON"
        class="btn-primary flex-1"
        :disabled="previewData.length === 0 || importing"
      >
        {{ importing ? 'インポート中...' : '✅ インポート実行' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const router = useRouter()
const { success, error } = useToast()

const jsonInput = ref('')
const previewData = ref<any[]>([])
const errors = ref<string[]>([])
const importing = ref(false)

// プレースホルダーテキスト
const placeholderText = `例:
[
  {
    "questionType": "choice",
    "questionText": "JavaScriptでの配列の宣言方法として正しいものは？",
    "explanation": "配列は\`[]\`を使って宣言します",
    "language": "JavaScript",
    "genre": "基礎文法",
    "difficulty": "easy",
    "tags": ["配列", "基礎"],
    "choices": [
      {"choiceText": "let arr = []", "isCorrect": true},
      {"choiceText": "let arr = {}", "isCorrect": false}
    ]
  }
]`

// サンプルデータ
const samples = {
  choice: [
    {
      questionType: 'choice',
      questionText: 'JavaScriptでの配列の宣言方法として正しいものは？',
      explanation: '配列は`[]`を使って宣言します。`{}`はオブジェクト、`()`は関数呼び出しやグループ化に使います。',
      language: 'JavaScript',
      genre: '基礎文法',
      difficulty: 'easy',
      tags: ['配列', '基礎'],
      choices: [
        { choiceText: 'let arr = []', isCorrect: true },
        { choiceText: 'let arr = {}', isCorrect: false },
        { choiceText: 'let arr = ()', isCorrect: false },
        { choiceText: 'let arr = <>', isCorrect: false }
      ]
    }
  ],
  text: [
    {
      questionType: 'text',
      questionText: 'CSSでフレックスボックスを有効にするプロパティは？',
      answerText: 'display: flex',
      explanation: '`display: flex`を指定することでフレックスボックスレイアウトが有効になります。',
      language: 'CSS',
      genre: 'レイアウト',
      difficulty: 'easy',
      tags: ['CSS', 'フレックスボックス']
    }
  ],
  code: [
    {
      questionType: 'code',
      questionText: 'Pythonでリストの要素を逆順にする関数を書いてください',
      answerText: 'def reverse_list(lst):\n    return lst[::-1]',
      explanation: 'スライス記法`[::-1]`を使うことでリストを逆順にできます。\n\n```python\n# 使用例\nnumbers = [1, 2, 3, 4, 5]\nreversed_numbers = reverse_list(numbers)\nprint(reversed_numbers)  # [5, 4, 3, 2, 1]\n```',
      language: 'Python',
      genre: '基礎文法',
      difficulty: 'medium',
      tags: ['Python', 'リスト', 'スライス']
    }
  ]
}

// JSON検証
const validateJSON = () => {
  errors.value = []
  previewData.value = []

  try {
    const parsed = JSON.parse(jsonInput.value)

    if (!Array.isArray(parsed)) {
      errors.value.push('JSONは配列形式である必要があります')
      return
    }

    if (parsed.length === 0) {
      errors.value.push('少なくとも1つの問題が必要です')
      return
    }

    // 各問題のバリデーション
    parsed.forEach((problem, index) => {
      const problemNum = index + 1

      if (!problem.questionType) {
        errors.value.push(`問題${problemNum}: questionTypeは必須です`)
      } else if (!['choice', 'text', 'code'].includes(problem.questionType)) {
        errors.value.push(`問題${problemNum}: questionTypeは "choice", "text", "code" のいずれかである必要があります`)
      }

      if (!problem.questionText || !problem.questionText.trim()) {
        errors.value.push(`問題${problemNum}: questionTextは必須です`)
      }

      if (problem.questionType === 'choice') {
        if (!problem.choices || !Array.isArray(problem.choices)) {
          errors.value.push(`問題${problemNum}: 選択式問題にはchoices配列が必要です`)
        } else {
          if (problem.choices.length < 2) {
            errors.value.push(`問題${problemNum}: 選択肢は2つ以上必要です`)
          }
          const hasCorrect = problem.choices.some((c: any) => c.isCorrect === true)
          if (!hasCorrect) {
            errors.value.push(`問題${problemNum}: 正解の選択肢が1つ必要です`)
          }
          problem.choices.forEach((choice: any, cIndex: number) => {
            if (!choice.choiceText || !choice.choiceText.trim()) {
              errors.value.push(`問題${problemNum}: 選択肢${cIndex + 1}のテキストが空です`)
            }
          })
        }
      } else {
        if (!problem.answerText || !problem.answerText.trim()) {
          errors.value.push(`問題${problemNum}: answerTextは必須です`)
        }
      }

      if (problem.difficulty && !['easy', 'medium', 'hard'].includes(problem.difficulty)) {
        errors.value.push(`問題${problemNum}: difficultyは "easy", "medium", "hard" のいずれかである必要があります`)
      }
    })

    if (errors.value.length === 0) {
      previewData.value = parsed
      success(`${parsed.length}問の問題を検証しました`)
    }
  } catch (e: any) {
    errors.value.push(`JSON解析エラー: ${e.message}`)
  }
}

// インポート実行
const importJSON = async () => {
  if (previewData.value.length === 0) {
    error('先に検証してください')
    return
  }

  try {
    importing.value = true

    const response = await $fetch('/api/problems/import-json', {
      method: 'POST',
      body: { problems: previewData.value }
    })

    success(`${response.imported}問の問題をインポートしました！`)
    router.push('/problems')
  } catch (e: any) {
    console.error('Import failed:', e)
    error('インポートに失敗しました: ' + (e.data?.message || e.message))
  } finally {
    importing.value = false
  }
}

// サンプル読み込み
const loadSample = (type: 'choice' | 'text' | 'code') => {
  jsonInput.value = JSON.stringify(samples[type], null, 2)
  previewData.value = []
  errors.value = []
}

// ヘルパー関数
const questionTypeText = (type: string) => {
  const map: Record<string, string> = {
    choice: '選択式',
    text: '記述式',
    code: 'プログラミング'
  }
  return map[type] || type
}

const difficultyText = (difficulty: string) => {
  const map: Record<string, string> = {
    easy: '初級',
    medium: '中級',
    hard: '上級'
  }
  return map[difficulty] || difficulty
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
</script>

<style scoped>
.json-editor-container {
  min-height: 24rem;
}

.json-editor-container :deep(.code-editor-textarea) {
  height: 24rem;
}
</style>
