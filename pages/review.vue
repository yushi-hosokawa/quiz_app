<template>
  <div class="max-w-4xl mx-auto animate-fade-in">
    <h1 class="text-4xl font-bold gradient-text mb-8 text-center">🔄 復習モード</h1>

    <!-- 復習対象なし -->
    <div v-if="!loading && problems.length === 0" class="card text-center py-16 animate-bounce-in">
      <div class="text-6xl mb-4">🎉</div>
      <h2 class="text-2xl font-bold text-gray-900 mb-4">素晴らしい！</h2>
      <p class="text-gray-600 mb-8">
        現在、復習が必要な問題はありません<br />
        すべての問題に正解しています！
      </p>
      <div class="flex space-x-4 justify-center">
        <NuxtLink to="/study" class="btn-primary inline-block">
          📚 通常学習に戻る
        </NuxtLink>
        <NuxtLink to="/" class="btn-secondary inline-block">
          🏠 ホームに戻る
        </NuxtLink>
      </div>
    </div>

    <!-- 学習中 -->
    <div v-else-if="currentProblem && !showingAnswer" class="card animate-bounce-in">
      <!-- プログレスバー -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-semibold text-gray-600">問題 {{ currentIndex + 1 }} / {{ problems.length }}</span>
          <span class="text-sm font-semibold text-orange-600">🔄 復習モード</span>
        </div>
        <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500 ease-out rounded-full"
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
              <div class="font-medium text-gray-800 markdown-content flex-1" v-html="renderMarkdown(choice.choiceText)"></div>
            </div>
          </button>
        </div>

        <!-- 記述式・プログラミングの場合 -->
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
          <div v-if="currentProblem.questionType === 'choice'" class="text-gray-800 font-medium markdown-content" v-html="renderMarkdown(selectedChoice?.choiceText || '（未選択）')"></div>
          <p v-else class="whitespace-pre-wrap text-gray-800 font-mono text-sm">{{ userAnswer || '（未回答）' }}</p>
        </div>
      </div>

      <!-- 正解 -->
      <div class="card">
        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <span class="text-2xl mr-2">✅</span>
          正解
        </h3>
        <div class="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
          <div v-if="currentProblem.questionType === 'choice'" class="text-gray-800 font-medium markdown-content" v-html="renderMarkdown(currentProblem.choices?.find(c => c.isCorrect)?.choiceText)"></div>
          <div v-else class="text-gray-800 markdown-content" v-html="renderMarkdown(currentProblem.answerText)"></div>
        </div>
      </div>

      <!-- 解説 -->
      <div v-if="currentProblem.explanation" class="card">
        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <span class="text-2xl mr-2">💡</span>
          解説
        </h3>
        <div class="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
          <div class="text-gray-700 leading-relaxed markdown-content" v-html="renderMarkdown(currentProblem.explanation)"></div>
        </div>
      </div>

      <!-- ボタン -->
      <div class="flex space-x-4">
        <button @click="recordAnswer(false)" class="btn-secondary flex-1 text-lg py-4 hover:border-red-300 hover:text-red-600">
          ❌ まだ不正解
        </button>
        <button @click="recordAnswer(true)" class="btn-primary flex-1 text-lg py-4">
          ✅ 正解できた！
        </button>
      </div>
      <p class="text-center text-sm text-gray-600">
        ※ 正解を選択すると、この問題は復習リストから削除されます
      </p>
    </div>

    <!-- 学習完了 -->
    <div v-else-if="completed" class="card text-center animate-bounce-in">
      <div class="text-6xl mb-6">🎉</div>
      <h2 class="text-4xl font-bold gradient-text mb-4">復習完了！</h2>
      <p class="text-xl text-gray-600 mb-8">
        お疲れさまでした
      </p>

      <!-- 結果カード -->
      <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 mb-8 border-2 border-orange-100">
        <div class="grid grid-cols-3 gap-6">
          <div>
            <div class="text-3xl font-bold text-orange-600">{{ problems.length }}</div>
            <div class="text-sm text-gray-600 mt-1">復習問題数</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-green-600">{{ correctCount }}</div>
            <div class="text-sm text-gray-600 mt-1">正解数</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-red-600">{{ problems.length - correctCount }}</div>
            <div class="text-sm text-gray-600 mt-1">要復習</div>
          </div>
        </div>
      </div>

      <div class="flex space-x-4 justify-center">
        <button @click="restart" class="btn-primary text-lg px-8 py-4">
          🔄 もう一度復習する
        </button>
        <NuxtLink to="/" class="btn-secondary text-lg px-8 py-4">
          🏠 ホームに戻る
        </NuxtLink>
      </div>
    </div>

    <!-- ローディング -->
    <div v-else class="card text-center animate-pulse">
      <div class="text-6xl mb-4">⏳</div>
      <p class="text-xl text-gray-600">復習問題を読み込み中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const { renderMarkdown } = useMarkdown()

const problems = ref<any[]>([])
const currentIndex = ref(0)
const showingAnswer = ref(false)
const selectedChoice = ref<any>(null)
const userAnswer = ref('')
const correctCount = ref(0)
const completed = ref(false)
const sessionId = ref<number | null>(null)
const loading = ref(true)

const currentProblem = computed(() => problems.value[currentIndex.value])

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
    // セッションを開始
    const session = await $fetch('/api/sessions', { method: 'POST' })
    sessionId.value = session.id

    // 復習問題を取得
    const data = await $fetch('/api/problems/review')
    problems.value = data as any[]
    loading.value = false
  } catch (error) {
    console.error('Failed to load review problems:', error)
    loading.value = false
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
            ? selectedChoice.value?.choiceText || ''
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
  loading.value = true

  // 新しいセッションを開始
  try {
    const session = await $fetch('/api/sessions', { method: 'POST' })
    sessionId.value = session.id
    const data = await $fetch('/api/problems/review')
    problems.value = data as any[]
    loading.value = false
  } catch (error) {
    console.error('Failed to restart:', error)
    loading.value = false
  }
}
</script>
