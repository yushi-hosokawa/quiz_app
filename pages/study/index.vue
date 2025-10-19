<template>
  <div class="max-w-4xl mx-auto animate-fade-in">
    <h1 class="text-4xl font-bold gradient-text mb-8 text-center">✨ フラッシュカード学習</h1>

    <!-- 学習中 -->
    <div v-if="currentProblem && !showingAnswer" class="card animate-bounce-in">
      <!-- プログレスバー -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-semibold text-gray-600">問題 {{ currentIndex + 1 }} / {{ problems.length }}</span>
          <span class="text-sm font-semibold text-blue-600">{{ Math.round(((currentIndex) / problems.length) * 100) }}% 完了</span>
        </div>
        <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out rounded-full"
            :style="{ width: `${((currentIndex) / problems.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- タグ -->
      <div class="mb-6 flex flex-wrap gap-2">
        <span v-if="currentProblem.language" class="badge-primary">
          💻 {{ currentProblem.language.name }}
        </span>
        <span v-if="currentProblem.genre" class="badge-success">
          📚 {{ currentProblem.genre.name }}
        </span>
        <span v-if="currentProblem.difficulty" class="badge-warning">
          ⭐ {{ difficultyText(currentProblem.difficulty) }}
        </span>
      </div>

      <!-- 問題文 -->
      <div class="mb-8">
        <div
          class="text-2xl font-bold text-gray-900 mb-6 leading-relaxed markdown-content"
          v-html="renderMarkdown(currentProblem.questionText)"
        ></div>

        <!-- 選択式の場合 -->
        <div v-if="currentProblem.questionType === 'choice' && currentProblem.choices" class="space-y-3">
          <button
            v-for="(choice, index) in currentProblem.choices"
            :key="choice.id"
            @click="selectChoice(choice)"
            class="w-full text-left p-5 border-2 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
            :class="selectedChoice?.id === choice.id
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-500 shadow-lg shadow-blue-200'
              : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300"
                :class="selectedChoice?.id === choice.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-600'"
              >
                {{ String.fromCharCode(65 + index) }}
              </div>
              <span class="font-medium text-gray-800">{{ choice.choiceText }}</span>
            </div>
          </button>
        </div>

        <!-- 記述式・プログラミングの場合 -->
        <div v-else>
          <!-- プログラミング問題の場合は行番号付きエディタ -->
          <CodeEditor
            v-if="currentProblem.questionType === 'code'"
            v-model="userAnswer"
            placeholder="コードを入力してください..."
          />
          <!-- 記述式問題の場合は通常のテキストエリア -->
          <div v-else class="relative">
            <textarea
              v-model="userAnswer"
              class="input-field h-40 font-mono text-sm"
              placeholder="回答を入力してください..."
            ></textarea>
            <div class="absolute bottom-4 right-4 text-xs text-gray-400">
              {{ userAnswer.length }} 文字
            </div>
          </div>
        </div>
      </div>

      <div class="flex space-x-4">
        <button
          @click="showAnswer"
          class="btn-primary flex-1 text-lg py-4"
          :disabled="currentProblem.questionType === 'choice' && !selectedChoice"
          :class="{ 'opacity-50 cursor-not-allowed': currentProblem.questionType === 'choice' && !selectedChoice }"
        >
          解答を見る 👀
        </button>
        <button
          @click="showAnswerDirectly"
          class="btn-secondary text-lg py-4 px-8"
          title="答えを見る"
        >
          💡 答えを見る
        </button>
      </div>
    </div>

    <!-- 解答表示 -->
    <div v-else-if="currentProblem && showingAnswer" class="space-y-6 animate-slide-up">
      <!-- あなたの回答 -->
      <div class="card">
        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <span class="text-2xl mr-2">📝</span>
          あなたの回答
        </h3>
        <div class="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
          <p v-if="currentProblem.questionType === 'choice'" class="text-gray-800 font-medium">
            {{ selectedChoice?.choiceText }}
          </p>
          <pre v-else class="whitespace-pre-wrap text-gray-800 font-mono text-sm overflow-x-auto">{{ userAnswer || '（未回答）' }}</pre>
        </div>
      </div>

      <!-- 正解 -->
      <div class="card">
        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <span class="text-2xl mr-2">✅</span>
          正解
        </h3>
        <div class="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
          <p v-if="currentProblem.questionType === 'choice'" class="text-gray-800 font-medium">
            {{ currentProblem.choices?.find(c => c.isCorrect)?.choiceText }}
          </p>
          <div
            v-else
            class="text-gray-800 markdown-content"
            v-html="renderMarkdown(currentProblem.answerText)"
          ></div>
        </div>
      </div>

      <!-- 解説 -->
      <div v-if="currentProblem.explanation" class="card">
        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <span class="text-2xl mr-2">💡</span>
          解説
        </h3>
        <div class="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
          <div
            class="text-gray-700 leading-relaxed markdown-content"
            v-html="renderMarkdown(currentProblem.explanation)"
          ></div>
        </div>
      </div>

      <!-- ボタン -->
      <div class="flex space-x-4">
        <button @click="recordAnswer(false)" class="btn-secondary flex-1 text-lg py-4 hover:border-red-300 hover:text-red-600">
          ❌ 不正解
        </button>
        <button @click="recordAnswer(true)" class="btn-primary flex-1 text-lg py-4">
          ✅ 正解
        </button>
      </div>
    </div>

    <!-- 学習完了 -->
    <div v-else-if="completed" class="card text-center animate-bounce-in">
      <div class="text-6xl mb-6">🎉</div>
      <h2 class="text-4xl font-bold gradient-text mb-4">学習完了！</h2>
      <p class="text-xl text-gray-600 mb-8">
        お疲れさまでした
      </p>

      <!-- 結果カード -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border-2 border-blue-100">
        <div class="grid grid-cols-3 gap-6">
          <div>
            <div class="text-3xl font-bold text-blue-600">{{ problems.length }}</div>
            <div class="text-sm text-gray-600 mt-1">総問題数</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-green-600">{{ correctCount }}</div>
            <div class="text-sm text-gray-600 mt-1">正解数</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-indigo-600">{{ Math.round((correctCount / problems.length) * 100) }}%</div>
            <div class="text-sm text-gray-600 mt-1">正答率</div>
          </div>
        </div>
      </div>

      <div class="flex space-x-4 justify-center">
        <button @click="restart" class="btn-primary text-lg px-8 py-4">
          🔄 もう一度学習する
        </button>
        <NuxtLink to="/" class="btn-secondary text-lg px-8 py-4">
          🏠 ホームに戻る
        </NuxtLink>
      </div>
    </div>

    <!-- ローディング -->
    <div v-else class="card text-center animate-pulse">
      <div class="text-6xl mb-4">⏳</div>
      <p class="text-xl text-gray-600">問題を読み込み中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const { error } = useToast()
const { getSettings } = useStudySettings()
const { renderMarkdown } = useMarkdown()

const problems = ref<any[]>([])
const currentIndex = ref(0)
const showingAnswer = ref(false)
const selectedChoice = ref<any>(null)
const userAnswer = ref('')
const correctCount = ref(0)
const completed = ref(false)
const sessionId = ref<number | null>(null)

const currentProblem = computed(() => {
  return problems.value[currentIndex.value]
})

const difficultyText = (difficulty: string) => {
  const map: Record<string, string> = {
    easy: '初級',
    medium: '中級',
    hard: '上級'
  }
  return map[difficulty] || difficulty
}

// 初期化
onMounted(async () => {
  try {
    // 学習設定を取得
    const studySettings = getSettings()
    console.log('[Study] Study settings:', studySettings)

    // セッションを開始
    const session = await $fetch('/api/sessions', { method: 'POST' })
    sessionId.value = session.id

    // クエリパラメータを構築
    const queryParams = new URLSearchParams()
    if (studySettings.count !== null) {
      queryParams.append('count', studySettings.count.toString())
    }

    // 問題タイプ
    if (studySettings.questionTypes.length > 0) {
      studySettings.questionTypes.forEach(type => {
        queryParams.append('questionType', type)
      })
    }

    // 言語
    if (studySettings.languageIds.length > 0) {
      studySettings.languageIds.forEach(id => {
        queryParams.append('languageId', id.toString())
      })
    }

    // ジャンル
    if (studySettings.genreIds.length > 0) {
      studySettings.genreIds.forEach(id => {
        queryParams.append('genreId', id.toString())
      })
    }

    // 難易度
    if (studySettings.difficulties.length > 0) {
      studySettings.difficulties.forEach(diff => {
        queryParams.append('difficulty', diff)
      })
    }

    // タグ
    if (studySettings.tags.length > 0) {
      studySettings.tags.forEach(tag => {
        queryParams.append('tag', tag)
      })
    }

    // ランダム順序
    queryParams.append('random', studySettings.randomOrder.toString())

    // 問題を取得
    const url = `/api/problems/random?${queryParams.toString()}`
    console.log('[Study] Fetching problems from:', url)
    const data = await $fetch(url)
    problems.value = data as any[]

    if (problems.value.length === 0) {
      error('条件に一致する問題が見つかりませんでした。設定を変更してください。')
    }
  } catch (err) {
    console.error('Failed to load problems:', err)
    error('問題の読み込みに失敗しました')
  }
})

// 選択肢を選択
const selectChoice = (choice: any) => {
  selectedChoice.value = choice
}

// 解答を表示
const showAnswer = () => {
  showingAnswer.value = true
}

// 答えを直接表示
const showAnswerDirectly = () => {
  showingAnswer.value = true
}

// 解答を記録して次の問題へ
const recordAnswer = async (isCorrect: boolean) => {
  if (isCorrect) correctCount.value++

  // 解答を記録
  if (sessionId.value) {
    try {
      await $fetch(`/api/sessions/${sessionId.value}/records`, {
        method: 'POST',
        body: {
          problemId: currentProblem.value.id,
          isCorrect,
          userAnswer: currentProblem.value.questionType === 'choice'
            ? selectedChoice.value?.choiceText
            : userAnswer.value
        }
      })
    } catch (error) {
      console.error('Failed to record answer:', error)
    }
  }

  // 次の問題へ
  currentIndex.value++
  showingAnswer.value = false
  selectedChoice.value = null
  userAnswer.value = ''

  // 全問題完了チェック
  if (currentIndex.value >= problems.value.length) {
    completed.value = true
    // セッション終了
    if (sessionId.value) {
      await $fetch(`/api/sessions/${sessionId.value}/end`, { method: 'POST' })
    }
  }
}

// 再スタート
const restart = async () => {
  currentIndex.value = 0
  correctCount.value = 0
  completed.value = false
  showingAnswer.value = false
  selectedChoice.value = null
  userAnswer.value = ''

  // 新しいセッションを開始
  try {
    // 学習設定を取得
    const studySettings = getSettings()

    const session = await $fetch('/api/sessions', { method: 'POST' })
    sessionId.value = session.id

    // クエリパラメータを構築
    const queryParams = new URLSearchParams()
    if (studySettings.count !== null) {
      queryParams.append('count', studySettings.count.toString())
    }

    if (studySettings.questionTypes.length > 0) {
      studySettings.questionTypes.forEach(type => queryParams.append('questionType', type))
    }
    if (studySettings.languageIds.length > 0) {
      studySettings.languageIds.forEach(id => queryParams.append('languageId', id.toString()))
    }
    if (studySettings.genreIds.length > 0) {
      studySettings.genreIds.forEach(id => queryParams.append('genreId', id.toString()))
    }
    if (studySettings.difficulties.length > 0) {
      studySettings.difficulties.forEach(diff => queryParams.append('difficulty', diff))
    }
    if (studySettings.tags.length > 0) {
      studySettings.tags.forEach(tag => queryParams.append('tag', tag))
    }
    queryParams.append('random', studySettings.randomOrder.toString())

    const data = await $fetch(`/api/problems/random?${queryParams.toString()}`)
    problems.value = data as any[]
  } catch (error) {
    console.error('Failed to restart:', error)
  }
}
</script>
