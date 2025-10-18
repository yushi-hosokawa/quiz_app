<template>
  <div class="animate-fade-in">
    <h1 class="text-4xl font-bold gradient-text mb-8 text-center">🗂️ カテゴリ管理</h1>

    <div class="grid md:grid-cols-2 gap-8">
      <!-- プログラミング言語 -->
      <div class="card">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 flex items-center">
            <span class="text-3xl mr-3">💻</span>
            プログラミング言語
          </h2>
        </div>

        <!-- 追加フォーム -->
        <div class="mb-6">
          <div class="flex space-x-2">
            <input
              v-model="newLanguage"
              type="text"
              class="input-field flex-1"
              placeholder="新しい言語を追加"
              @keypress.enter="addLanguage"
            />
            <button @click="addLanguage" class="btn-primary px-6">
              ➕ 追加
            </button>
          </div>
        </div>

        <!-- 言語リスト -->
        <div v-if="languages.length > 0" class="space-y-3">
          <div
            v-for="lang in languages"
            :key="lang.id"
            class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300"
          >
            <div class="flex items-center space-x-3">
              <span class="text-2xl">💻</span>
              <div>
                <span class="font-semibold text-gray-900">{{ lang.name }}</span>
                <p class="text-xs text-gray-600 mt-1">
                  {{ lang._count?.problems || 0 }} 問
                </p>
              </div>
            </div>
            <button
              @click="confirmDelete('language', lang)"
              class="btn-secondary py-2 px-4 text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-300"
            >
              🗑️ 削除
            </button>
          </div>
        </div>
        <div v-else class="text-center py-12 text-gray-500">
          まだ言語が登録されていません
        </div>
      </div>

      <!-- ジャンル -->
      <div class="card">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 flex items-center">
            <span class="text-3xl mr-3">📚</span>
            ジャンル
          </h2>
        </div>

        <!-- 追加フォーム -->
        <div class="mb-6">
          <div class="flex space-x-2">
            <input
              v-model="newGenre"
              type="text"
              class="input-field flex-1"
              placeholder="新しいジャンルを追加"
              @keypress.enter="addGenre"
            />
            <button @click="addGenre" class="btn-primary px-6">
              ➕ 追加
            </button>
          </div>
        </div>

        <!-- ジャンルリスト -->
        <div v-if="genres.length > 0" class="space-y-3">
          <div
            v-for="genre in genres"
            :key="genre.id"
            class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-100 hover:border-green-300 transition-all duration-300"
          >
            <div class="flex items-center space-x-3">
              <span class="text-2xl">📚</span>
              <div>
                <span class="font-semibold text-gray-900">{{ genre.name }}</span>
                <p class="text-xs text-gray-600 mt-1">
                  {{ genre._count?.problems || 0 }} 問
                </p>
              </div>
            </div>
            <button
              @click="confirmDelete('genre', genre)"
              class="btn-secondary py-2 px-4 text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-300"
            >
              🗑️ 削除
            </button>
          </div>
        </div>
        <div v-else class="text-center py-12 text-gray-500">
          まだジャンルが登録されていません
        </div>
      </div>
    </div>

    <!-- 削除確認モーダル -->
    <div
      v-if="deleteTarget"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in"
      @click.self="deleteTarget = null"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-bounce-in">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">⚠️ 削除の確認</h3>
        <p class="text-gray-600 mb-2">
          「{{ deleteTarget.item.name }}」を削除してもよろしいですか？
        </p>
        <p v-if="deleteTarget.item._count?.problems > 0" class="text-red-600 text-sm mb-6">
          ⚠️ この{{ deleteTarget.type === 'language' ? '言語' : 'ジャンル' }}に関連する {{ deleteTarget.item._count.problems }} 問の問題から関連付けが解除されます。
        </p>
        <p v-else class="text-gray-500 text-sm mb-6">
          関連する問題はありません。
        </p>
        <div class="flex space-x-4">
          <button
            @click="deleteTarget = null"
            class="btn-secondary flex-1"
          >
            キャンセル
          </button>
          <button
            @click="executeDelete"
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

const { success, error } = useToast()
const languages = ref<any[]>([])
const genres = ref<any[]>([])
const newLanguage = ref('')
const newGenre = ref('')
const deleteTarget = ref<any>(null)

// データ取得
const fetchData = async () => {
  try {
    const [languagesData, genresData] = await Promise.all([
      $fetch('/api/languages'),
      $fetch('/api/genres')
    ])

    languages.value = languagesData as any[]
    genres.value = genresData as any[]
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
}

// 言語追加
const addLanguage = async () => {
  if (!newLanguage.value.trim()) return

  try {
    await $fetch('/api/languages', {
      method: 'POST',
      body: { name: newLanguage.value.trim() }
    })

    success('言語を追加しました')
    newLanguage.value = ''
    fetchData()
  } catch (err) {
    console.error('Failed to add language:', err)
    error('言語の追加に失敗しました')
  }
}

// ジャンル追加
const addGenre = async () => {
  if (!newGenre.value.trim()) return

  try {
    await $fetch('/api/genres', {
      method: 'POST',
      body: { name: newGenre.value.trim() }
    })

    success('ジャンルを追加しました')
    newGenre.value = ''
    fetchData()
  } catch (err) {
    console.error('Failed to add genre:', err)
    error('ジャンルの追加に失敗しました')
  }
}

// 削除確認
const confirmDelete = (type: string, item: any) => {
  deleteTarget.value = { type, item }
}

// 削除実行
const executeDelete = async () => {
  if (!deleteTarget.value) return

  const { type, item } = deleteTarget.value

  try {
    const endpoint = type === 'language' ? '/api/languages' : '/api/genres'

    await $fetch(`${endpoint}/${item.id}`, {
      method: 'DELETE'
    })

    success(`${type === 'language' ? '言語' : 'ジャンル'}を削除しました`)
    deleteTarget.value = null
    fetchData()
  } catch (err) {
    console.error('Failed to delete:', err)
    error('削除に失敗しました')
  }
}

// 初期化
onMounted(() => {
  fetchData()
})
</script>
