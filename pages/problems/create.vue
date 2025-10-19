<template>
  <div class="max-w-4xl mx-auto animate-fade-in">
    <div class="mb-8">
      <NuxtLink to="/problems" class="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← 問題一覧に戻る
      </NuxtLink>
      <h1 class="text-4xl font-bold gradient-text">➕ 問題を作成</h1>
    </div>

    <form @submit.prevent="submitProblem" class="space-y-6">
      <!-- 問題タイプ -->
      <div class="card">
        <label class="block text-sm font-bold text-gray-900 mb-3">
          問題タイプ <span class="text-red-500">*</span>
        </label>
        <div class="grid md:grid-cols-3 gap-4">
          <button
            type="button"
            @click="form.questionType = 'choice'"
            class="p-6 border-2 rounded-xl transition-all duration-300"
            :class="form.questionType === 'choice'
              ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-500 shadow-lg'
              : 'bg-white border-gray-200 hover:border-blue-300'"
          >
            <div class="text-4xl mb-2">☑️</div>
            <div class="font-bold text-gray-900">選択式</div>
            <div class="text-xs text-gray-600 mt-1">複数の選択肢から選ぶ</div>
          </button>

          <button
            type="button"
            @click="form.questionType = 'text'"
            class="p-6 border-2 rounded-xl transition-all duration-300"
            :class="form.questionType === 'text'
              ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-500 shadow-lg'
              : 'bg-white border-gray-200 hover:border-blue-300'"
          >
            <div class="text-4xl mb-2">✍️</div>
            <div class="font-bold text-gray-900">記述式</div>
            <div class="text-xs text-gray-600 mt-1">テキストで回答</div>
          </button>

          <button
            type="button"
            @click="form.questionType = 'code'"
            class="p-6 border-2 rounded-xl transition-all duration-300"
            :class="form.questionType === 'code'
              ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-500 shadow-lg'
              : 'bg-white border-gray-200 hover:border-blue-300'"
          >
            <div class="text-4xl mb-2">💻</div>
            <div class="font-bold text-gray-900">プログラミング</div>
            <div class="text-xs text-gray-600 mt-1">コードで回答</div>
          </button>
        </div>
      </div>

      <!-- 問題文 -->
      <div class="card">
        <label class="block text-sm font-bold text-gray-900 mb-3">
          問題文 <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="form.questionText"
          class="input-field h-32"
          placeholder="問題文を入力してください"
          required
        ></textarea>
      </div>

      <!-- 選択肢（選択式の場合のみ） -->
      <div v-if="form.questionType === 'choice'" class="card">
        <label class="block text-sm font-bold text-gray-900 mb-3">
          選択肢 <span class="text-red-500">*</span>
        </label>
        <div class="space-y-3">
          <div
            v-for="(choice, index) in form.choices"
            :key="index"
            class="flex items-center space-x-3"
          >
            <input
              type="radio"
              :name="'correct-choice'"
              :checked="choice.isCorrect"
              @change="setCorrectChoice(index)"
              class="w-5 h-5 text-blue-600"
            />
            <input
              v-model="choice.choiceText"
              type="text"
              class="input-field flex-1"
              :placeholder="`選択肢 ${index + 1}`"
              required
            />
            <button
              v-if="form.choices.length > 2"
              type="button"
              @click="removeChoice(index)"
              class="btn-secondary py-2 px-4 text-sm hover:bg-red-50 hover:text-red-600"
            >
              削除
            </button>
          </div>
        </div>
        <button
          v-if="form.choices.length < 6"
          type="button"
          @click="addChoice"
          class="btn-secondary mt-4"
        >
          ➕ 選択肢を追加
        </button>
        <p class="text-xs text-gray-500 mt-2">
          正解の選択肢にチェックを入れてください
        </p>
      </div>

      <!-- 正解（記述式・プログラミングの場合） -->
      <div v-if="form.questionType !== 'choice'" class="card">
        <label class="block text-sm font-bold text-gray-900 mb-3">
          正解 <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="form.answerText"
          class="input-field h-32 font-mono text-sm"
          placeholder="正解を入力してください"
          required
        ></textarea>
      </div>

      <!-- 解説 -->
      <div class="card">
        <label class="block text-sm font-bold text-gray-900 mb-3">
          解説
        </label>
        <textarea
          v-model="form.explanation"
          class="input-field h-32"
          placeholder="解説を入力してください（任意）"
        ></textarea>
      </div>

      <!-- カテゴリ・難易度 -->
      <div class="card overflow-visible relative z-40">
        <div class="grid md:grid-cols-3 gap-4">
          <div class="relative z-30">
            <label class="block text-sm font-bold text-gray-900 mb-3">
              プログラミング言語
            </label>
            <ComboBox
              v-model="form.languageId"
              :options="languages"
              placeholder="選択または新規作成"
              @create="createLanguage"
            />
          </div>

          <div class="relative z-20">
            <label class="block text-sm font-bold text-gray-900 mb-3">
              ジャンル
            </label>
            <ComboBox
              v-model="form.genreId"
              :options="genres"
              placeholder="選択または新規作成"
              @create="createGenre"
            />
          </div>

          <div class="relative z-10">
            <label class="block text-sm font-bold text-gray-900 mb-3">
              難易度
            </label>
            <select v-model="form.difficulty" class="input-field">
              <option :value="null">選択しない</option>
              <option value="easy">初級</option>
              <option value="medium">中級</option>
              <option value="hard">上級</option>
            </select>
          </div>
        </div>
      </div>

      <!-- タグ -->
      <div class="card relative z-0">
        <label class="block text-sm font-bold text-gray-900 mb-3">
          タグ
        </label>
        <div class="flex items-center space-x-2 mb-3">
          <input
            v-model="tagInput"
            type="text"
            class="input-field flex-1"
            placeholder="タグを入力してEnterキー"
            @keypress.enter.prevent="addTag"
          />
          <button type="button" @click="addTag" class="btn-secondary">
            追加
          </button>
        </div>
        <div v-if="form.tags.length > 0" class="flex flex-wrap gap-2">
          <span
            v-for="(tag, index) in form.tags"
            :key="index"
            class="badge-primary"
          >
            {{ tag }}
            <button
              type="button"
              @click="removeTag(index)"
              class="ml-2 hover:text-red-600"
            >
              ✕
            </button>
          </span>
        </div>
      </div>

      <!-- 送信ボタン -->
      <div class="flex space-x-4">
        <button
          type="submit"
          :disabled="submitting"
          class="btn-primary flex-1 text-lg py-4"
          :class="{ 'opacity-50 cursor-not-allowed': submitting }"
        >
          {{ submitting ? '作成中...' : '✅ 問題を作成' }}
        </button>
        <NuxtLink to="/problems" class="btn-secondary flex-1 text-lg py-4 text-center">
          キャンセル
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const router = useRouter()
const { success, error } = useToast()

const languages = ref<any[]>([])
const genres = ref<any[]>([])
const submitting = ref(false)
const tagInput = ref('')

const form = ref({
  questionType: 'choice',
  questionText: '',
  answerText: '',
  explanation: '',
  languageId: null as number | null,
  genreId: null as number | null,
  difficulty: null as string | null,
  choices: [
    { choiceText: '', isCorrect: true },
    { choiceText: '', isCorrect: false }
  ],
  tags: [] as string[]
})

// 選択肢を追加
const addChoice = () => {
  form.value.choices.push({ choiceText: '', isCorrect: false })
}

// 選択肢を削除
const removeChoice = (index: number) => {
  form.value.choices.splice(index, 1)
}

// 正解の選択肢を設定
const setCorrectChoice = (index: number) => {
  form.value.choices.forEach((choice, i) => {
    choice.isCorrect = i === index
  })
}

// タグを追加
const addTag = () => {
  if (tagInput.value.trim() && !form.value.tags.includes(tagInput.value.trim())) {
    form.value.tags.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

// タグを削除
const removeTag = (index: number) => {
  form.value.tags.splice(index, 1)
}

// 新しいプログラミング言語を作成
const createLanguage = async (name: string) => {
  try {
    const newLanguage = await $fetch('/api/languages', {
      method: 'POST',
      body: { name }
    })
    languages.value.push(newLanguage)
    languages.value.sort((a, b) => a.name.localeCompare(b.name))
    form.value.languageId = newLanguage.id
    success(`「${name}」を追加しました`)
  } catch (err: any) {
    console.error('Failed to create language:', err)
    if (err.statusCode === 409) {
      error('この言語はすでに登録されています')
    } else {
      error('言語の作成に失敗しました')
    }
  }
}

// 新しいジャンルを作成
const createGenre = async (name: string) => {
  try {
    const newGenre = await $fetch('/api/genres', {
      method: 'POST',
      body: { name }
    })
    genres.value.push(newGenre)
    genres.value.sort((a, b) => a.name.localeCompare(b.name))
    form.value.genreId = newGenre.id
    success(`「${name}」を追加しました`)
  } catch (err: any) {
    console.error('Failed to create genre:', err)
    if (err.statusCode === 409) {
      error('このジャンルはすでに登録されています')
    } else {
      error('ジャンルの作成に失敗しました')
    }
  }
}

// 問題を送信
const submitProblem = async () => {
  try {
    submitting.value = true

    // バリデーション
    if (form.value.questionType === 'choice') {
      if (!form.value.choices.some(c => c.isCorrect)) {
        error('正解の選択肢を選択してください')
        return
      }
      if (form.value.choices.some(c => !c.choiceText.trim())) {
        error('すべての選択肢を入力してください')
        return
      }
    }

    const body: any = {
      questionType: form.value.questionType,
      questionText: form.value.questionText,
      explanation: form.value.explanation || null,
      languageId: form.value.languageId,
      genreId: form.value.genreId,
      difficulty: form.value.difficulty,
      tags: form.value.tags
    }

    if (form.value.questionType === 'choice') {
      body.choices = form.value.choices
    } else {
      body.answerText = form.value.answerText
    }

    await $fetch('/api/problems', {
      method: 'POST',
      body
    })

    success('問題を作成しました！')
    router.push('/problems')
  } catch (err) {
    console.error('Failed to create problem:', err)
    error('問題の作成に失敗しました')
  } finally {
    submitting.value = false
  }
}

// 初期化
onMounted(async () => {
  try {
    languages.value = await $fetch('/api/languages')
    genres.value = await $fetch('/api/genres')
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
})
</script>
