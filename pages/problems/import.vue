<template>
  <div class="max-w-6xl mx-auto animate-fade-in">
    <div class="mb-8">
      <NuxtLink to="/problems" class="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← 問題一覧に戻る
      </NuxtLink>
      <h1 class="text-4xl font-bold gradient-text">📥 CSVインポート</h1>
    </div>

    <!-- フォーマット説明 -->
    <div class="card mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        <span class="text-3xl mr-3">📋</span>
        CSVフォーマット
      </h2>
      <div class="bg-gray-50 p-6 rounded-xl border-2 border-gray-200 mb-4">
        <p class="text-sm text-gray-700 mb-4 font-semibold">以下の形式でCSVファイルを準備してください：</p>
        <div class="bg-white p-4 rounded-lg border border-gray-300 overflow-x-auto">
          <pre class="text-xs font-mono text-gray-800">question_type,question_text,answer_text,explanation,language,genre,difficulty,tags,choice1,choice2,choice3,choice4,correct_choice</pre>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 class="font-bold text-gray-900 mb-2">📌 必須フィールド</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• <strong>question_type</strong>: choice / text / code</li>
            <li>• <strong>question_text</strong>: 問題文</li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-gray-900 mb-2">📌 任意フィールド</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• <strong>answer_text</strong>: 正解（記述式・プログラミング）</li>
            <li>• <strong>explanation</strong>: 解説</li>
            <li>• <strong>language</strong>: プログラミング言語</li>
            <li>• <strong>genre</strong>: ジャンル</li>
            <li>• <strong>difficulty</strong>: easy / medium / hard</li>
            <li>• <strong>tags</strong>: タグ（セミコロン区切り）</li>
          </ul>
        </div>
      </div>

      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 class="font-bold text-blue-900 mb-2">💡 選択式問題の場合</h3>
        <ul class="text-sm text-blue-800 space-y-1">
          <li>• <strong>choice1〜choice4</strong>: 選択肢（最低2つ必要）</li>
          <li>• <strong>correct_choice</strong>: 正解の番号（1-4）</li>
        </ul>
      </div>
    </div>

    <!-- サンプルダウンロード -->
    <div class="card mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        <span class="text-3xl mr-3">📄</span>
        サンプルCSV
      </h2>
      <p class="text-gray-600 mb-4">サンプルCSVをダウンロードして参考にしてください。</p>
      <button @click="downloadSample" class="btn-secondary">
        ⬇️ サンプルCSVをダウンロード
      </button>
    </div>

    <!-- ファイルアップロード -->
    <div class="card mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        <span class="text-3xl mr-3">📤</span>
        ファイルアップロード
      </h2>

      <div class="mb-6">
        <label class="block">
          <div
            class="border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer"
            :class="dragOver
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
            @drop.prevent="handleDrop"
          >
            <div class="text-6xl mb-4">📁</div>
            <p class="text-xl font-semibold text-gray-900 mb-2">
              CSVファイルをドラッグ&ドロップ
            </p>
            <p class="text-gray-600 mb-4">または</p>
            <input
              type="file"
              accept=".csv"
              @change="handleFileSelect"
              class="hidden"
            />
            <span class="btn-primary inline-block">
              ファイルを選択
            </span>
          </div>
        </label>
      </div>

      <div v-if="fileName" class="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
        <p class="text-green-800 font-semibold">
          📎 選択されたファイル: {{ fileName }}
        </p>
        <p class="text-sm text-green-700 mt-1">
          {{ previewData.length }} 件のデータが読み込まれました
        </p>
      </div>
    </div>

    <!-- プレビュー -->
    <div v-if="previewData.length > 0" class="card mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        <span class="text-3xl mr-3">👀</span>
        プレビュー（最初の5件）
      </h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-gray-100 border-b-2 border-gray-300">
              <th class="px-4 py-3 text-left font-bold">問題タイプ</th>
              <th class="px-4 py-3 text-left font-bold">問題文</th>
              <th class="px-4 py-3 text-left font-bold">言語</th>
              <th class="px-4 py-3 text-left font-bold">ジャンル</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in previewData.slice(0, 5)"
              :key="index"
              class="border-b border-gray-200 hover:bg-gray-50"
            >
              <td class="px-4 py-3">
                <span class="badge-primary text-xs">{{ questionTypeText(row.question_type) }}</span>
              </td>
              <td class="px-4 py-3 max-w-md truncate">{{ row.question_text }}</td>
              <td class="px-4 py-3">{{ row.language || '-' }}</td>
              <td class="px-4 py-3">{{ row.genre || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- インポート結果 -->
    <div v-if="importResult" class="card mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        <span class="text-3xl mr-3">📊</span>
        インポート結果
      </h2>

      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-green-50 p-6 rounded-xl border-2 border-green-200">
          <div class="text-4xl font-bold text-green-600 mb-2">{{ importResult.success }}</div>
          <div class="text-sm text-green-800">成功</div>
        </div>
        <div class="bg-red-50 p-6 rounded-xl border-2 border-red-200">
          <div class="text-4xl font-bold text-red-600 mb-2">{{ importResult.failed }}</div>
          <div class="text-sm text-red-800">失敗</div>
        </div>
      </div>

      <div v-if="importResult.errors.length > 0" class="bg-red-50 p-6 rounded-xl border-2 border-red-200">
        <h3 class="font-bold text-red-900 mb-4">⚠️ エラー詳細</h3>
        <div class="space-y-3 max-h-96 overflow-y-auto">
          <div
            v-for="(error, index) in importResult.errors"
            :key="index"
            class="bg-white p-4 rounded-lg border border-red-300"
          >
            <p class="font-semibold text-red-800 mb-2">行 {{ error.row }}: {{ error.error }}</p>
            <pre class="text-xs text-gray-700 overflow-x-auto">{{ JSON.stringify(error.data, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- インポート実行ボタン -->
    <div v-if="previewData.length > 0" class="flex space-x-4">
      <button
        @click="executeImport"
        :disabled="importing"
        class="btn-primary flex-1 text-lg py-4"
        :class="{ 'opacity-50 cursor-not-allowed': importing }"
      >
        {{ importing ? 'インポート中...' : `✅ ${previewData.length}件をインポート` }}
      </button>
      <button
        @click="clearData"
        class="btn-secondary text-lg py-4 px-8"
      >
        クリア
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const { success, error } = useToast()
const fileName = ref('')
const previewData = ref<any[]>([])
const dragOver = ref(false)
const importing = ref(false)
const importResult = ref<any>(null)

const questionTypeText = (type: string) => {
  const map: Record<string, string> = {
    choice: '選択式',
    text: '記述式',
    code: 'プログラミング'
  }
  return map[type] || type
}

// サンプルCSVダウンロード
const downloadSample = () => {
  const sample = `question_type,question_text,answer_text,explanation,language,genre,difficulty,tags,choice1,choice2,choice3,choice4,correct_choice
choice,"JavaScriptでの配列の宣言方法として正しいものは？","","配列は[]を使って宣言します","JavaScript","基礎文法","easy","配列;基礎","let arr = []","let arr = {}","let arr = ()","let arr = <>",1
text,"CSSでフレックスボックスを有効にするプロパティは？","display: flex","display: flexを指定することでフレックスボックスレイアウトが有効になります","CSS","レイアウト","easy","CSS;フレックスボックス","","","","",""
code,"Pythonでリストの要素を逆順にする関数を書いてください","def reverse_list(lst):\\n    return lst[::-1]","スライス記法[::-1]を使うことでリストを逆順にできます","Python","基礎文法","medium","Python;リスト","","","","",""`

  const blob = new Blob([sample], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'sample_problems.csv'
  link.click()
}

// ファイル選択
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    parseCSV(target.files[0])
  }
}

// ドラッグ&ドロップ
const handleDrop = (event: DragEvent) => {
  dragOver.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    parseCSV(event.dataTransfer.files[0])
  }
}

// CSV解析
const parseCSV = (file: File) => {
  fileName.value = file.name

  const reader = new FileReader()
  reader.onload = (e) => {
    const text = e.target?.result as string
    const lines = text.split('\n').filter(line => line.trim())

    if (lines.length < 2) {
      error('CSVファイルが空または不正です')
      return
    }

    const headers = lines[0].split(',').map(h => h.trim())
    const data: any[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i])
      const row: any = {}

      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })

      data.push(row)
    }

    previewData.value = data
    importResult.value = null
  }

  reader.readAsText(file, 'UTF-8')
}

// CSV行解析（ダブルクォート対応）
const parseCSVLine = (line: string): string[] => {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

// インポート実行
const executeImport = async () => {
  try {
    importing.value = true

    const result = await $fetch('/api/problems/import', {
      method: 'POST',
      body: {
        data: previewData.value
      }
    })

    importResult.value = result

    if (result.success > 0) {
      success(`${result.success}件の問題をインポートしました！`)
    }
  } catch (err) {
    console.error('Import error:', err)
    error('インポートに失敗しました')
  } finally {
    importing.value = false
  }
}

// データクリア
const clearData = () => {
  fileName.value = ''
  previewData.value = []
  importResult.value = null
}
</script>
