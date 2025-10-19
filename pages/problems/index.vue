<template>
  <div class="animate-fade-in">
    <div class="mb-8 flex items-center justify-between">
      <h1 class="text-4xl font-bold gradient-text">📝 問題管理</h1>
      <div class="flex space-x-3">
        <NuxtLink to="/problems/import" class="btn-secondary">
          📥 CSVインポート
        </NuxtLink>
        <NuxtLink to="/problems/import-json" class="btn-secondary">
          📄 JSONインポート
        </NuxtLink>
        <NuxtLink to="/problems/create" class="btn-primary">
          ➕ 新規作成
        </NuxtLink>
      </div>
    </div>

    <!-- フィルター -->
    <div class="card mb-6">
      <div class="grid md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">問題タイプ</label>
          <select v-model="filters.questionType" class="input-field">
            <option value="">すべて</option>
            <option value="choice">選択式</option>
            <option value="text">記述式</option>
            <option value="code">プログラミング</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">プログラミング言語</label>
          <select v-model="filters.languageId" class="input-field">
            <option value="">すべて</option>
            <option v-for="lang in languages" :key="lang.id" :value="lang.id">
              {{ lang.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">ジャンル</label>
          <select v-model="filters.genreId" class="input-field">
            <option value="">すべて</option>
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">
              {{ genre.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">難易度</label>
          <select v-model="filters.difficulty" class="input-field">
            <option value="">すべて</option>
            <option value="easy">初級</option>
            <option value="medium">中級</option>
            <option value="hard">上級</option>
          </select>
        </div>
      </div>
      <div class="mt-4">
        <button @click="applyFilters" class="btn-primary mr-2">
          🔍 検索
        </button>
        <button @click="clearFilters" class="btn-secondary">
          🔄 クリア
        </button>
      </div>
    </div>

    <!-- 問題一覧 -->
    <div v-if="problems.length > 0" class="space-y-4">
      <div
        v-for="problem in problems"
        :key="problem.id"
        class="card hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
        @click="navigateTo(`/problems/${problem.id}/edit`)"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <!-- タグ -->
            <div class="flex flex-wrap gap-2 mb-3">
              <span class="badge-primary text-xs">
                {{ questionTypeText(problem.questionType) }}
              </span>
              <span v-if="problem.language" class="badge-success text-xs">
                💻 {{ problem.language.name }}
              </span>
              <span v-if="problem.genre" class="badge-warning text-xs">
                📚 {{ problem.genre.name }}
              </span>
              <span v-if="problem.difficulty" class="badge-secondary text-xs">
                ⭐ {{ difficultyText(problem.difficulty) }}
              </span>
            </div>

            <!-- 問題文 -->
            <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {{ truncateText(problem.questionText, 100) }}
            </h3>

            <!-- 統計情報 -->
            <div class="flex items-center gap-4 text-sm text-gray-500">
              <span>🆔 ID: {{ problem.id }}</span>
              <span>📅 作成日: {{ formatDate(problem.createdAt) }}</span>
            </div>
          </div>

          <!-- アクション -->
          <div class="flex space-x-2 ml-4 relative z-10">
            <button
              @click.stop="confirmDelete(problem)"
              class="btn-secondary py-2 px-4 text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-300"
            >
              🗑️ 削除
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 問題なし -->
    <div v-else class="card text-center py-16">
      <div class="text-6xl mb-4">📭</div>
      <h2 class="text-2xl font-bold text-gray-900 mb-4">問題がありません</h2>
      <p class="text-gray-600 mb-8">最初の問題を作成しましょう</p>
      <NuxtLink to="/problems/create" class="btn-primary inline-block">
        ➕ 問題を作成する
      </NuxtLink>
    </div>

    <!-- 削除確認モーダル -->
    <div
      v-if="deleteTarget"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in"
      @click.self="deleteTarget = null"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-bounce-in">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">⚠️ 削除の確認</h3>
        <p class="text-gray-600 mb-6">
          この問題を削除してもよろしいですか？<br />
          この操作は取り消せません。
        </p>
        <div class="flex space-x-4">
          <button
            @click="deleteTarget = null"
            class="btn-secondary flex-1"
          >
            キャンセル
          </button>
          <button
            @click="deleteProblem"
            class="btn-primary flex-1 bg-red-600 hover:bg-red-700"
          >
            削除する
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const problems = ref<any[]>([])
const languages = ref<any[]>([])
const genres = ref<any[]>([])
const deleteTarget = ref<any>(null)

const filters = ref({
  questionType: '',
  languageId: '',
  genreId: '',
  difficulty: ''
})

// 問題タイプのテキスト
const questionTypeText = (type: string) => {
  const map: Record<string, string> = {
    choice: '選択式',
    text: '記述式',
    code: 'プログラミング'
  }
  return map[type] || type
}

// 難易度のテキスト
const difficultyText = (difficulty: string) => {
  const map: Record<string, string> = {
    easy: '初級',
    medium: '中級',
    hard: '上級'
  }
  return map[difficulty] || difficulty
}

// テキストを切り詰める
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// 日付フォーマット
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 問題を取得
const fetchProblems = async () => {
  try {
    const query = new URLSearchParams()
    if (filters.value.questionType) query.append('questionType', filters.value.questionType)
    if (filters.value.languageId) query.append('languageId', filters.value.languageId.toString())
    if (filters.value.genreId) query.append('genreId', filters.value.genreId.toString())
    if (filters.value.difficulty) query.append('difficulty', filters.value.difficulty)

    const url = query.toString() ? `/api/problems?${query}` : '/api/problems'
    problems.value = await $fetch(url)
  } catch (error) {
    console.error('Failed to fetch problems:', error)
  }
}

// フィルターを適用
const applyFilters = () => {
  fetchProblems()
}

// フィルターをクリア
const clearFilters = () => {
  filters.value = {
    questionType: '',
    languageId: '',
    genreId: '',
    difficulty: ''
  }
  fetchProblems()
}

// 削除確認
const confirmDelete = (problem: any) => {
  deleteTarget.value = problem
}

// 問題を削除
const deleteProblem = async () => {
  if (!deleteTarget.value) return

  try {
    await $fetch(`/api/problems/${deleteTarget.value.id}`, {
      method: 'DELETE'
    })
    deleteTarget.value = null
    fetchProblems()
  } catch (error) {
    console.error('Failed to delete problem:', error)
    alert('問題の削除に失敗しました')
  }
}

// 初期化
onMounted(async () => {
  // 言語とジャンルを取得
  try {
    languages.value = await $fetch('/api/languages')
    genres.value = await $fetch('/api/genres')
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }

  // 問題を取得
  fetchProblems()
})
</script>
