<template>
  <div class="max-w-5xl mx-auto animate-fade-in">
    <!-- ヘッダー -->
    <div class="mb-6">
      <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 mb-3 inline-block text-sm">
        ← ホームに戻る
      </NuxtLink>
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold gradient-text">⚙️ 学習設定</h1>
          <p class="text-gray-600 text-sm mt-1">学習する問題の条件を設定してください</p>
        </div>
        <!-- 該当問題数 -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl px-6 py-3">
          <div class="text-xs text-gray-600 mb-1">該当する問題数</div>
          <div class="text-2xl font-bold text-blue-600">
            <span v-if="isLoadingCount">...</span>
            <span v-else>{{ availableProblemsCount }}</span>
            <span class="text-sm text-gray-500 ml-1">問</span>
          </div>
        </div>
      </div>
      <div v-if="availableProblemsCount === 0 && !isLoadingCount" class="text-sm text-red-600 font-medium mt-2">
        ⚠️ 条件に一致する問題がありません
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-4 mb-4">
      <!-- 問題タイプ -->
      <div class="card p-4">
        <h2 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
          <span class="text-xl mr-2">📋</span>
          問題タイプ
        </h2>
        <div class="flex flex-col gap-2">
          <label
            v-for="type in questionTypes"
            :key="type.value"
            class="flex items-center space-x-2 p-2 border-2 rounded-lg cursor-pointer transition-all"
            :class="settings.questionTypes.includes(type.value)
              ? 'bg-blue-50 border-blue-500'
              : 'border-gray-200 hover:border-blue-300'"
          >
            <input
              type="checkbox"
              :value="type.value"
              v-model="settings.questionTypes"
              class="w-4 h-4"
            />
            <span class="text-lg">{{ type.icon }}</span>
            <span class="text-sm font-medium">{{ type.label }}</span>
          </label>
        </div>
      </div>

      <!-- プログラミング言語 -->
      <div class="card p-4">
        <h2 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
          <span class="text-xl mr-2">💻</span>
          プログラミング言語
        </h2>
        <div class="mb-2">
          <label class="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              v-model="allLanguages"
              @change="toggleAllLanguages"
              class="w-4 h-4"
            />
            <span class="text-sm font-medium text-gray-700">すべて選択</span>
          </label>
        </div>
        <div v-if="languages.length > 0" class="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          <label
            v-for="lang in languages"
            :key="lang.id"
            class="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer transition-all text-sm"
            :class="settings.languageIds.includes(lang.id)
              ? 'bg-blue-50 border-blue-500'
              : 'border-gray-200 hover:border-blue-300'"
          >
            <input
              type="checkbox"
              :value="lang.id"
              v-model="settings.languageIds"
              class="w-3 h-3"
            />
            <span class="text-xs">{{ lang.name }}</span>
          </label>
        </div>
        <div v-else class="text-gray-500 text-xs">言語が登録されていません</div>
      </div>

      <!-- ジャンル -->
      <div class="card p-4">
        <h2 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
          <span class="text-xl mr-2">📚</span>
          ジャンル
        </h2>
        <div class="mb-2">
          <label class="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              v-model="allGenres"
              @change="toggleAllGenres"
              class="w-4 h-4"
            />
            <span class="text-sm font-medium text-gray-700">すべて選択</span>
          </label>
        </div>
        <div v-if="genres.length > 0" class="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          <label
            v-for="genre in genres"
            :key="genre.id"
            class="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer transition-all text-sm"
            :class="settings.genreIds.includes(genre.id)
              ? 'bg-blue-50 border-blue-500'
              : 'border-gray-200 hover:border-blue-300'"
          >
            <input
              type="checkbox"
              :value="genre.id"
              v-model="settings.genreIds"
              class="w-3 h-3"
            />
            <span class="text-xs">{{ genre.name }}</span>
          </label>
        </div>
        <div v-else class="text-gray-500 text-xs">ジャンルが登録されていません</div>
      </div>

      <!-- 詳細設定 -->
      <div class="card p-4">
        <div class="flex items-center space-x-2 mb-3">
          <span class="text-xl">⚙️</span>
          <h2 class="text-lg font-bold text-gray-900">詳細設定</h2>
        </div>

        <div class="space-y-3">
          <!-- 出題数とランダム出題 -->
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-gray-900 flex items-center">
                <span class="mr-1">🔢</span>
                出題数
              </span>
              <input
                v-model.number="settings.count"
                type="number"
                min="1"
                max="100"
                class="input-field w-20 text-sm"
                placeholder="全て"
              />
              <span class="text-sm text-gray-700">問</span>
            </div>

            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                v-model="settings.randomOrder"
                class="w-4 h-4"
              />
              <span class="text-sm font-medium text-gray-900 flex items-center">
                <span class="mr-1">🔀</span>
                ランダムに出題
              </span>
            </label>
          </div>

          <!-- 難易度 -->
          <div>
            <h3 class="text-sm font-bold text-gray-900 mb-2 flex items-center">
              <span class="mr-1">⭐</span>
              難易度
            </h3>
            <div class="flex gap-2">
              <label
                v-for="diff in difficulties"
                :key="diff.value"
                class="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer transition-all text-sm flex-1"
                :class="settings.difficulties.includes(diff.value)
                  ? 'bg-blue-50 border-blue-500'
                  : 'border-gray-200 hover:border-blue-300'"
              >
                <input
                  type="checkbox"
                  :value="diff.value"
                  v-model="settings.difficulties"
                  class="w-3 h-3"
                />
                <span class="text-xs font-medium">{{ diff.label }}</span>
              </label>
            </div>
          </div>

          <!-- タグ -->
          <div>
            <h3 class="text-sm font-bold text-gray-900 mb-2 flex items-center">
              <span class="mr-1">🏷️</span>
              タグ
            </h3>
            <div class="flex items-center space-x-2 mb-2">
              <input
                v-model="tagInput"
                type="text"
                class="input-field flex-1 text-sm"
                placeholder="タグを入力してEnter"
                @keypress.enter.prevent="addTag"
              />
              <button @click="addTag" class="btn-secondary text-xs px-3 py-1">
                追加
              </button>
            </div>
            <div v-if="settings.tags.length > 0" class="flex flex-wrap gap-1">
              <span
                v-for="(tag, index) in settings.tags"
                :key="index"
                class="badge-primary text-xs"
              >
                {{ tag }}
                <button
                  @click="removeTag(index)"
                  class="ml-1 hover:text-red-600"
                >
                  ✕
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 開始ボタン -->
    <div class="flex space-x-3 mt-4">
      <button
        type="button"
        @click="startStudy"
        :disabled="availableProblemsCount === 0"
        class="btn-primary flex-1 text-base py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        📚 学習を開始する
      </button>
      <NuxtLink to="/" class="btn-secondary text-base py-3 px-6">
        キャンセル
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const router = useRouter()
const { error } = useToast()
const { setSettings } = useStudySettings()

const languages = ref<any[]>([])
const genres = ref<any[]>([])
const allLanguages = ref(false)
const allGenres = ref(false)
const tagInput = ref('')
const availableProblemsCount = ref(0) // 該当問題数
const isLoadingCount = ref(false) // カウント取得中フラグ

const settings = ref({
  count: null as number | null,
  questionTypes: ['choice', 'text', 'code'] as string[],
  languageIds: [] as number[],
  genreIds: [] as number[],
  difficulties: ['easy', 'medium', 'hard'] as string[],
  tags: [] as string[],
  randomOrder: true
})

const questionTypes = [
  { value: 'choice', label: '選択式', icon: '☑️' },
  { value: 'text', label: '記述式', icon: '✍️' },
  { value: 'code', label: 'プログラミング', icon: '💻' }
]

const difficulties = [
  { value: 'easy', label: '初級' },
  { value: 'medium', label: '中級' },
  { value: 'hard', label: '上級' }
]

// 該当する問題数を取得
const fetchProblemCount = async () => {
  isLoadingCount.value = true
  try {
    const queryParams = new URLSearchParams()

    if (settings.value.questionTypes.length > 0) {
      settings.value.questionTypes.forEach(type => {
        queryParams.append('questionType', type)
      })
    }

    if (settings.value.languageIds.length > 0) {
      settings.value.languageIds.forEach(id => {
        queryParams.append('languageId', id.toString())
      })
    }

    if (settings.value.genreIds.length > 0) {
      settings.value.genreIds.forEach(id => {
        queryParams.append('genreId', id.toString())
      })
    }

    if (settings.value.difficulties.length > 0) {
      settings.value.difficulties.forEach(diff => {
        queryParams.append('difficulty', diff)
      })
    }

    if (settings.value.tags.length > 0) {
      settings.value.tags.forEach(tag => {
        queryParams.append('tag', tag)
      })
    }

    const url = `/api/problems/count?${queryParams.toString()}`
    const data = await $fetch<{ count: number }>(url)
    availableProblemsCount.value = data.count
  } catch (err) {
    console.error('Failed to fetch problem count:', err)
    availableProblemsCount.value = 0
  } finally {
    isLoadingCount.value = false
  }
}

// 設定変更時にカウントを更新（デバウンス付き）
let countUpdateTimer: ReturnType<typeof setTimeout> | null = null
const updateCountDebounced = () => {
  if (countUpdateTimer) {
    clearTimeout(countUpdateTimer)
  }
  countUpdateTimer = setTimeout(() => {
    fetchProblemCount()
  }, 300) // 300ms後に実行
}

// すべての言語を選択/解除
const toggleAllLanguages = () => {
  if (allLanguages.value) {
    settings.value.languageIds = languages.value.map(l => l.id)
  } else {
    settings.value.languageIds = []
  }
}

// すべてのジャンルを選択/解除
const toggleAllGenres = () => {
  if (allGenres.value) {
    settings.value.genreIds = genres.value.map(g => g.id)
  } else {
    settings.value.genreIds = []
  }
}

// タグを追加
const addTag = () => {
  if (tagInput.value.trim() && !settings.value.tags.includes(tagInput.value.trim())) {
    settings.value.tags.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

// タグを削除
const removeTag = (index: number) => {
  settings.value.tags.splice(index, 1)
}

// 学習を開始
const startStudy = () => {
  // バリデーション
  if (settings.value.questionTypes.length === 0) {
    error('少なくとも1つの問題タイプを選択してください')
    return
  }

  if (settings.value.difficulties.length === 0) {
    error('少なくとも1つの難易度を選択してください')
    return
  }

  if (availableProblemsCount.value === 0) {
    error('条件に一致する問題がありません。条件を変更してください。')
    return
  }

  // グローバルステートに保存
  setSettings(settings.value)

  // 学習ページへ遷移
  navigateTo('/study')
}

// 設定の変更を監視してカウントを更新
watch(
  () => [
    settings.value.questionTypes,
    settings.value.languageIds,
    settings.value.genreIds,
    settings.value.difficulties,
    settings.value.tags
  ],
  () => {
    updateCountDebounced()
  },
  { deep: true }
)

// 初期化
onMounted(async () => {
  try {
    const [languagesData, genresData] = await Promise.all([
      $fetch('/api/languages'),
      $fetch('/api/genres')
    ])

    languages.value = languagesData as any[]
    genres.value = genresData as any[]

    // 初回の問題数を取得
    await fetchProblemCount()
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
})
</script>
