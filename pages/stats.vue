<template>
  <div class="animate-fade-in">
    <div class="mb-8 flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-4xl font-bold gradient-text mb-2">📊 学習統計</h1>
        <p class="text-gray-600">あなたの学習の進捗を確認しましょう</p>
      </div>
      <button
        @click="exportData"
        class="btn-secondary flex items-center gap-2"
        :disabled="isExporting"
      >
        <span v-if="!isExporting">📥 データをエクスポート</span>
        <span v-else>エクスポート中...</span>
      </button>
    </div>

    <!-- タブナビゲーション -->
    <div class="mb-8 flex gap-2 overflow-x-auto pb-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap"
        :class="activeTab === tab.id
          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        {{ tab.icon }} {{ tab.name }}
      </button>
    </div>

    <!-- 概要タブ -->
    <div v-show="activeTab === 'overview'">
      <!-- 統計カード -->
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="card-gradient group hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div class="text-4xl mb-2">📚</div>
          <div class="text-3xl font-bold text-gray-900 mb-1">{{ stats.totalProblems }}</div>
          <div class="text-sm text-gray-600">総問題数</div>
        </div>

        <div class="card-gradient group hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div class="text-4xl mb-2">🎯</div>
          <div class="text-3xl font-bold text-gray-900 mb-1">{{ stats.totalSessions }}</div>
          <div class="text-sm text-gray-600">学習セッション数</div>
        </div>

        <div class="card-gradient group hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div class="text-4xl mb-2">✍️</div>
          <div class="text-3xl font-bold text-gray-900 mb-1">{{ stats.totalAnswers }}</div>
          <div class="text-sm text-gray-600">総解答数</div>
        </div>

        <div class="card-gradient group hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div class="text-4xl mb-2">✅</div>
          <div class="text-3xl font-bold text-green-600 mb-1">{{ stats.correctRate }}%</div>
          <div class="text-sm text-gray-600">全体正答率</div>
        </div>
      </div>

      <!-- カテゴリ別統計 -->
      <div class="grid md:grid-cols-2 gap-8 mb-8">
        <div class="card">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span class="text-3xl mr-3">💻</span>
            言語別問題数
          </h2>
          <div v-if="stats.byLanguage.length > 0" class="space-y-3">
            <div
              v-for="item in stats.byLanguage"
              :key="item.language"
              class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all duration-300"
            >
              <span class="font-semibold text-gray-900">{{ item.language }}</span>
              <span class="badge-primary">{{ item.count }} 問</span>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">データがありません</div>
        </div>

        <div class="card">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span class="text-3xl mr-3">📚</span>
            ジャンル別問題数
          </h2>
          <div v-if="stats.byGenre.length > 0" class="space-y-3">
            <div
              v-for="item in stats.byGenre"
              :key="item.genre"
              class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition-all duration-300"
            >
              <span class="font-semibold text-gray-900">{{ item.genre }}</span>
              <span class="badge-success">{{ item.count }} 問</span>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">データがありません</div>
        </div>
      </div>

      <!-- 最近の学習セッション -->
      <div class="card">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span class="text-3xl mr-3">🕐</span>
          最近の学習セッション
        </h2>
        <div v-if="recentSessions.length > 0" class="space-y-4">
          <div
            v-for="session in recentSessions"
            :key="session.id"
            class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
          >
            <div class="flex items-center justify-between mb-4">
              <div>
                <div class="text-sm font-semibold text-gray-600 mb-1">セッション #{{ session.id }}</div>
                <div class="text-xs text-gray-500">{{ formatDateTime(session.sessionStart) }}</div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-blue-600">
                  {{ session.correctCount }} / {{ session.totalProblems }}
                </div>
                <div class="text-xs text-gray-600">正解数</div>
              </div>
            </div>
            <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500 rounded-full"
                :style="{ width: `${session.correctRate}%` }"
              ></div>
            </div>
            <div class="text-right text-xs text-gray-600 mt-1">正答率: {{ session.correctRate }}%</div>
          </div>
        </div>
        <div v-else class="text-center py-12">
          <div class="text-6xl mb-4">📭</div>
          <p class="text-gray-600">まだ学習セッションがありません</p>
          <NuxtLink to="/study" class="btn-primary inline-block mt-4">学習を開始する</NuxtLink>
        </div>
      </div>
    </div>

    <!-- カレンダータブ -->
    <div v-show="activeTab === 'calendar'">
      <div class="card mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 flex items-center">
            <span class="text-3xl mr-3">📅</span>
            学習カレンダー（過去30日）
          </h2>
        </div>

        <div v-if="calendarData.length > 0">
          <!-- カレンダーグリッド（7列×5行程度でコンパクトに） -->
          <div class="grid grid-cols-7 gap-2 max-w-3xl mx-auto">
            <div v-for="day in ['日', '月', '火', '水', '木', '金', '土']" :key="day" class="text-center text-xs font-semibold text-gray-600 py-2">
              {{ day }}
            </div>
            <div
              v-for="(day, index) in calendarData"
              :key="index"
              class="relative group cursor-pointer"
            >
              <div
                class="aspect-square rounded-lg border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg flex flex-col items-center justify-center"
                :class="getHeatmapClass(day.totalProblems)"
              >
                <div class="font-bold text-xs">{{ formatShortDate(day.date) }}</div>
                <div v-if="day.totalProblems > 0" class="text-[10px] font-semibold mt-0.5">{{ day.totalProblems }}</div>
              </div>
              <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div class="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                  <div class="font-bold">{{ formatDate(day.date) }}</div>
                  <div class="mt-1">問題数: {{ day.totalProblems }}</div>
                  <div>正解: {{ day.correctCount }}</div>
                  <div>正答率: {{ day.totalProblems > 0 ? Math.round((day.correctCount / day.totalProblems) * 100) : 0 }}%</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 凡例 -->
          <div class="flex items-center justify-center gap-4 mt-6 text-xs text-gray-600">
            <span class="flex items-center gap-1"><span class="w-4 h-4 rounded bg-gray-100 border-2 border-gray-200"></span> 0問</span>
            <span class="flex items-center gap-1"><span class="w-4 h-4 rounded bg-green-100 border-2 border-green-300"></span> 1-5問</span>
            <span class="flex items-center gap-1"><span class="w-4 h-4 rounded bg-green-300 border-2 border-green-400"></span> 6-10問</span>
            <span class="flex items-center gap-1"><span class="w-4 h-4 rounded bg-green-500 border-2 border-green-600"></span> 11-20問</span>
            <span class="flex items-center gap-1"><span class="w-4 h-4 rounded bg-green-700 border-2 border-green-800"></span> 20問以上</span>
          </div>
        </div>
        <div v-else class="text-center py-12">
          <div class="text-6xl mb-4">📭</div>
          <p class="text-gray-600">まだ学習データがありません</p>
        </div>
      </div>
    </div>

    <!-- グラフタブ -->
    <div v-show="activeTab === 'graphs'">
      <!-- 日別正答率 -->
      <div class="card mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span class="text-3xl mr-3">📈</span>
          日別正答率の推移（過去14日）
        </h2>
        <div v-if="dailyStats.length > 0 && dailyStats.some(d => d.totalProblems > 0)" class="h-64 relative">
          <!-- Y軸ラベル -->
          <div class="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-xs text-gray-500 w-8 text-right pr-1">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
          <!-- グラフエリア -->
          <div class="flex items-end justify-between h-full gap-1 ml-10 pb-8">
            <div
              v-for="day in dailyStats.slice(-14)"
              :key="day.date"
              class="flex-1 flex flex-col items-center justify-end group"
            >
              <div class="text-xs font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600">
                {{ day.totalProblems > 0 ? Math.round((day.correctCount / day.totalProblems) * 100) : 0 }}%
              </div>
              <div
                class="w-full bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-600 cursor-pointer relative min-h-[2px]"
                :style="{ height: day.totalProblems > 0 ? `${Math.max((day.correctCount / day.totalProblems) * 100, 2)}%` : '2px' }"
              >
                <div v-if="day.totalProblems > 0" class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-semibold text-gray-700 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  {{ day.correctCount }}/{{ day.totalProblems }}
                </div>
              </div>
              <div class="text-[10px] text-gray-600 mt-1 whitespace-nowrap">
                {{ formatShortDate(day.date) }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-12">
          <div class="text-6xl mb-4">📊</div>
          <p class="text-gray-600">グラフを表示するにはまず学習を開始してください</p>
        </div>
      </div>

      <!-- 週別統計 -->
      <div class="card mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span class="text-3xl mr-3">📊</span>
          週別学習状況（過去12週）
        </h2>
        <div v-if="weeklyStats.length > 0 && weeklyStats.some(w => w.totalProblems > 0)" class="h-80 relative">
          <!-- Y軸ラベル -->
          <div class="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-xs text-gray-500 w-8 text-right pr-1">
            <span>{{ Math.max(...weeklyStats.map(w => w.totalProblems), 1) }}</span>
            <span>{{ Math.round(Math.max(...weeklyStats.map(w => w.totalProblems), 1) * 0.75) }}</span>
            <span>{{ Math.round(Math.max(...weeklyStats.map(w => w.totalProblems), 1) * 0.5) }}</span>
            <span>{{ Math.round(Math.max(...weeklyStats.map(w => w.totalProblems), 1) * 0.25) }}</span>
            <span>0</span>
          </div>
          <!-- グラフエリア -->
          <div class="flex items-end justify-between h-full gap-1 ml-10 pb-8">
            <div
              v-for="week in weeklyStats.slice(-12)"
              :key="week.weekStart"
              class="flex-1 flex flex-col items-center justify-end group"
            >
              <div class="text-xs font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity text-purple-600">
                {{ week.totalProblems }}問
              </div>
              <div
                class="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg transition-all duration-300 hover:from-purple-600 hover:to-pink-600 cursor-pointer min-h-[2px]"
                :style="{ height: week.totalProblems > 0 ? `${Math.max((week.totalProblems / Math.max(...weeklyStats.map(w => w.totalProblems), 1)) * 100, 2)}%` : '2px' }"
              ></div>
              <div class="text-[10px] text-gray-600 mt-1 whitespace-nowrap">
                {{ formatShortDate(week.weekStart) }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-12">
          <div class="text-6xl mb-4">📊</div>
          <p class="text-gray-600">データがありません</p>
        </div>
      </div>

      <!-- 月別統計 -->
      <div class="card">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span class="text-3xl mr-3">📆</span>
          月別学習状況（過去12ヶ月）
        </h2>
        <div v-if="monthlyStats.length > 0 && monthlyStats.some(m => m.totalProblems > 0)" class="h-80 relative">
          <!-- Y軸ラベル -->
          <div class="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-xs text-gray-500 w-8 text-right pr-1">
            <span>{{ Math.max(...monthlyStats.map(m => m.totalProblems), 1) }}</span>
            <span>{{ Math.round(Math.max(...monthlyStats.map(m => m.totalProblems), 1) * 0.75) }}</span>
            <span>{{ Math.round(Math.max(...monthlyStats.map(m => m.totalProblems), 1) * 0.5) }}</span>
            <span>{{ Math.round(Math.max(...monthlyStats.map(m => m.totalProblems), 1) * 0.25) }}</span>
            <span>0</span>
          </div>
          <!-- グラフエリア -->
          <div class="flex items-end justify-between h-full gap-1 ml-10 pb-8">
            <div
              v-for="month in monthlyStats.slice(-12)"
              :key="month.month"
              class="flex-1 flex flex-col items-center justify-end group"
            >
              <div class="text-xs font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity text-green-600">
                {{ month.totalProblems }}問
              </div>
              <div
                class="w-full bg-gradient-to-t from-green-500 to-teal-500 rounded-t-lg transition-all duration-300 hover:from-green-600 hover:to-teal-600 cursor-pointer min-h-[2px]"
                :style="{ height: month.totalProblems > 0 ? `${Math.max((month.totalProblems / Math.max(...monthlyStats.map(m => m.totalProblems), 1)) * 100, 2)}%` : '2px' }"
              ></div>
              <div class="text-xs text-gray-600 mt-1 whitespace-nowrap">
                {{ month.monthNumber }}月
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-12">
          <div class="text-6xl mb-4">📊</div>
          <p class="text-gray-600">データがありません</p>
        </div>
      </div>
    </div>

    <!-- 問題別統計タブ -->
    <div v-show="activeTab === 'problems'">
      <!-- 苦手な問題 -->
      <div class="card mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span class="text-3xl mr-3">⚠️</span>
          苦手な問題トップ10
        </h2>
        <div v-if="weakProblems.length > 0" class="space-y-3">
          <NuxtLink
            v-for="(problem, index) in weakProblems"
            :key="problem.id"
            :to="`/problems/${problem.id}/edit`"
            class="block p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200 hover:border-red-400 transition-all duration-300 hover:shadow-lg"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-2xl font-bold text-red-500">#{{ index + 1 }}</span>
                  <span class="badge-danger">正答率 {{ problem.correctRate }}%</span>
                  <span v-if="problem.language" class="badge-primary">{{ problem.language }}</span>
                  <span v-if="problem.genre" class="badge-success">{{ problem.genre }}</span>
                </div>
                <div class="text-gray-900 font-medium mb-1 line-clamp-2">{{ problem.questionText }}</div>
                <div class="text-sm text-gray-600">
                  解答回数: {{ problem.totalAttempts }}回 | 正解: {{ problem.correctAttempts }}回 | 不正解: {{ problem.incorrectAttempts }}回
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="text-center py-12">
          <div class="text-6xl mb-4">🎉</div>
          <p class="text-gray-600">苦手な問題はありません。素晴らしいです！</p>
        </div>
      </div>

      <!-- 全問題統計 -->
      <div class="card">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span class="text-3xl mr-3">📋</span>
          問題別詳細統計
        </h2>
        <div v-if="problemStats.length > 0">
          <div class="mb-4">
            <input
              v-model="problemSearchQuery"
              type="text"
              placeholder="問題を検索..."
              class="input-field"
            />
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-100">
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">問題</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">タイプ</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">言語</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">ジャンル</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">解答回数</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">正答率</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">最終学習日</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="problem in filteredProblemStats"
                  :key="problem.id"
                  class="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  @click="navigateTo(`/problems/${problem.id}/edit`)"
                >
                  <td class="px-4 py-3 text-sm text-gray-900">{{ problem.questionText }}</td>
                  <td class="px-4 py-3 text-sm">
                    <span class="badge-secondary">{{ getQuestionTypeLabel(problem.questionType) }}</span>
                  </td>
                  <td class="px-4 py-3 text-sm">{{ problem.language || '-' }}</td>
                  <td class="px-4 py-3 text-sm">{{ problem.genre || '-' }}</td>
                  <td class="px-4 py-3 text-sm text-center">{{ problem.totalAttempts }}</td>
                  <td class="px-4 py-3 text-sm text-center">
                    <span
                      v-if="problem.correctRate !== null"
                      class="font-bold"
                      :class="{
                        'text-green-600': problem.correctRate >= 80,
                        'text-yellow-600': problem.correctRate >= 50 && problem.correctRate < 80,
                        'text-red-600': problem.correctRate < 50
                      }"
                    >
                      {{ problem.correctRate }}%
                    </span>
                    <span v-else class="text-gray-400">-</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600">
                    {{ problem.lastStudied ? formatDate(problem.lastStudied) : '未学習' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else class="text-center py-12">
          <p class="text-gray-600">まだ統計データがありません</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

// タブ定義
const tabs = [
  { id: 'overview', name: '概要', icon: '📊' },
  { id: 'calendar', name: 'カレンダー', icon: '📅' },
  { id: 'graphs', name: 'グラフ', icon: '📈' },
  { id: 'problems', name: '問題別統計', icon: '📋' }
]

const activeTab = ref('overview')
const isExporting = ref(false)
const calendarDays = ref(30)
const problemSearchQuery = ref('')

// データ
const stats = ref({
  totalProblems: 0,
  totalSessions: 0,
  totalAnswers: 0,
  correctRate: 0,
  byLanguage: [] as any[],
  byGenre: [] as any[]
})

const dailyStats = ref<any[]>([])
const calendarData = ref<any[]>([])
const weeklyStats = ref<any[]>([])
const monthlyStats = ref<any[]>([])
const recentSessions = ref<any[]>([])
const weakProblems = ref<any[]>([])
const problemStats = ref<any[]>([])

// フィルタリングされた問題統計
const filteredProblemStats = computed(() => {
  if (!problemSearchQuery.value) return problemStats.value
  const query = problemSearchQuery.value.toLowerCase()
  return problemStats.value.filter(p =>
    p.questionText.toLowerCase().includes(query) ||
    p.language?.toLowerCase().includes(query) ||
    p.genre?.toLowerCase().includes(query)
  )
})

// ヒートマップの色を決定
const getHeatmapClass = (count: number) => {
  if (count === 0) return 'bg-gray-100 border-gray-200 text-gray-400'
  if (count <= 5) return 'bg-green-100 border-green-300 text-green-700'
  if (count <= 10) return 'bg-green-300 border-green-400 text-green-800'
  if (count <= 20) return 'bg-green-500 border-green-600 text-white'
  return 'bg-green-700 border-green-800 text-white'
}

// 問題タイプラベル
const getQuestionTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    choice: '選択式',
    text: '記述式',
    code: 'コード'
  }
  return labels[type] || type
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

const formatShortDate = (dateString: string) => {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}/${date.getDate()}`
}

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// データエクスポート
const exportData = async () => {
  isExporting.value = true
  try {
    const response = await fetch('/api/stats/export')
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `study_records_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Export failed:', error)
    alert('データのエクスポートに失敗しました')
  } finally {
    isExporting.value = false
  }
}

// カレンダーデータ取得
const fetchCalendarData = async () => {
  try {
    const data = await $fetch(`/api/stats/calendar?days=${calendarDays.value}`)
    calendarData.value = data as any[]
  } catch (error) {
    console.error('Failed to fetch calendar data:', error)
  }
}

// カレンダー日数が変更されたら再取得
watch(calendarDays, () => {
  fetchCalendarData()
})

// 初期化
onMounted(async () => {
  try {
    const [
      statsData,
      dailyData,
      sessionsData,
      weeklyData,
      monthlyData,
      weakData,
      problemsData
    ] = await Promise.all([
      $fetch('/api/stats'),
      $fetch('/api/stats/daily'),
      $fetch('/api/stats/recent-sessions?limit=5'),
      $fetch('/api/stats/weekly'),
      $fetch('/api/stats/monthly'),
      $fetch('/api/stats/weak-problems?limit=10'),
      $fetch('/api/stats/problems')
    ])

    stats.value = statsData as any
    dailyStats.value = dailyData as any[]
    recentSessions.value = sessionsData as any[]
    weeklyStats.value = weeklyData as any[]
    monthlyStats.value = monthlyData as any[]
    weakProblems.value = weakData as any[]
    problemStats.value = problemsData as any[]

    await fetchCalendarData()
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
