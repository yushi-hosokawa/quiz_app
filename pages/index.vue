<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <div class="text-center mb-16 animate-slide-up">
      <div class="inline-block mb-4">
        <span class="badge-primary text-sm px-4 py-2">🚀 Modern Learning Platform</span>
      </div>
      <h1 class="text-6xl font-extrabold mb-6">
        <span class="gradient-text">プログラミング学習</span>
        <br />
        <span class="text-gray-800">復習アプリ</span>
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        フラッシュカード形式で効率的に学習<br />
        あなたのスキルを次のレベルへ
      </p>
    </div>

    <!-- Main Action Cards -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      <!-- 学習開始カード -->
      <div class="card-gradient group relative overflow-hidden animate-bounce-in">
        <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
        <div class="relative z-10">
          <div class="text-5xl mb-4">📚</div>
          <h2 class="text-xl font-bold text-gray-900 mb-3">学習を開始</h2>
          <p class="text-gray-600 mb-6 text-sm">
            条件を設定して学習開始
          </p>
          <NuxtLink to="/study/settings" class="btn-primary block text-center group-hover:shadow-glow text-sm py-3">
            今すぐ学習 →
          </NuxtLink>
        </div>
      </div>

      <!-- 復習モードカード -->
      <div class="card-gradient group relative overflow-hidden animate-bounce-in" style="animation-delay: 0.1s">
        <div class="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
        <div class="relative z-10">
          <div class="text-5xl mb-4">🔄</div>
          <h2 class="text-xl font-bold text-gray-900 mb-3">復習モード</h2>
          <p class="text-gray-600 mb-6 text-sm">
            間違えた問題を復習
          </p>
          <NuxtLink to="/review" class="btn-primary block text-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-sm py-3">
            復習する →
          </NuxtLink>
        </div>
      </div>

      <!-- 問題管理カード -->
      <div class="card-gradient group relative overflow-hidden animate-bounce-in" style="animation-delay: 0.2s">
        <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
        <div class="relative z-10">
          <div class="text-5xl mb-4">📝</div>
          <h2 class="text-xl font-bold text-gray-900 mb-3">問題管理</h2>
          <p class="text-gray-600 mb-6 text-sm">
            問題を追加・編集
          </p>
          <NuxtLink to="/problems" class="btn-secondary block text-center text-sm py-3">
            問題一覧 →
          </NuxtLink>
        </div>
      </div>

      <!-- 統計カード -->
      <div class="card-gradient group relative overflow-hidden animate-bounce-in" style="animation-delay: 0.3s">
        <div class="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
        <div class="relative z-10">
          <div class="text-5xl mb-4">📊</div>
          <h2 class="text-xl font-bold text-gray-900 mb-3">学習統計</h2>
          <p class="text-gray-600 mb-6 text-sm">
            学習履歴と進捗
          </p>
          <NuxtLink to="/stats" class="btn-secondary block text-center text-sm py-3">
            統計を見る →
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Data Management Section -->
    <div class="card mb-16 animate-slide-up">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold gradient-text mb-2">データ管理</h2>
        <p class="text-gray-600">問題とカテゴリを効率的に管理</p>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <NuxtLink to="/problems/import" class="card-gradient group relative overflow-hidden hover:shadow-xl transition-all duration-300">
          <div class="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div class="relative z-10 flex items-center space-x-6">
            <div class="text-6xl">📥</div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900 mb-2">CSVインポート</h3>
              <p class="text-gray-600 text-sm mb-4">
                CSVファイルから問題を一括登録<br />
                NotionやExcelから簡単に取り込み可能
              </p>
              <span class="text-blue-600 font-semibold group-hover:underline">
                インポート画面へ →
              </span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/categories" class="card-gradient group relative overflow-hidden hover:shadow-xl transition-all duration-300">
          <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div class="relative z-10 flex items-center space-x-6">
            <div class="text-6xl">🗂️</div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900 mb-2">カテゴリ管理</h3>
              <p class="text-gray-600 text-sm mb-4">
                プログラミング言語とジャンルを管理<br />
                追加・編集・削除が簡単にできる
              </p>
              <span class="text-blue-600 font-semibold group-hover:underline">
                管理画面へ →
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Features Section -->
    <div class="card mb-16 animate-slide-up">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold gradient-text mb-2">主な機能</h2>
        <p class="text-gray-600">パワフルで使いやすい学習ツール</p>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50/50 transition-colors duration-300">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
              ✓
            </div>
          </div>
          <div>
            <h3 class="font-bold text-gray-900 mb-1">3種類の問題形式</h3>
            <p class="text-gray-600 text-sm">選択式・記述式・プログラミング問題に対応</p>
          </div>
        </div>

        <div class="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50/50 transition-colors duration-300">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
              ✓
            </div>
          </div>
          <div>
            <h3 class="font-bold text-gray-900 mb-1">カテゴリ分類</h3>
            <p class="text-gray-600 text-sm">言語やジャンルで効率的に整理</p>
          </div>
        </div>

        <div class="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50/50 transition-colors duration-300">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
              ✓
            </div>
          </div>
          <div>
            <h3 class="font-bold text-gray-900 mb-1">復習モード</h3>
            <p class="text-gray-600 text-sm">間違えた問題を繰り返し出題、完全に理解するまでサポート</p>
          </div>
        </div>

        <div class="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50/50 transition-colors duration-300">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
              ✓
            </div>
          </div>
          <div>
            <h3 class="font-bold text-gray-900 mb-1">学習履歴の記録</h3>
            <p class="text-gray-600 text-sm">進捗を自動記録、統計でモチベーション維持</p>
          </div>
        </div>

        <div class="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50/50 transition-colors duration-300">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
              ✓
            </div>
          </div>
          <div>
            <h3 class="font-bold text-gray-900 mb-1">答えを見る機能</h3>
            <p class="text-gray-600 text-sm">わからない時は答えを確認して学習効率アップ</p>
          </div>
        </div>

        <div class="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50/50 transition-colors duration-300">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
              ✓
            </div>
          </div>
          <div>
            <h3 class="font-bold text-gray-900 mb-1">CSVインポート</h3>
            <p class="text-gray-600 text-sm">大量の問題を一括登録、NotionやExcelから簡単に取り込み</p>
          </div>
        </div>

        <div class="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50/50 transition-colors duration-300">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
              ✓
            </div>
          </div>
          <div>
            <h3 class="font-bold text-gray-900 mb-1">カテゴリ管理</h3>
            <p class="text-gray-600 text-sm">言語やジャンルを自由に管理、効率的な学習をサポート</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="text-center card-gradient animate-slide-up">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">さあ、始めましょう！</h2>
      <p class="text-gray-600 mb-8">今すぐ学習を開始して、スキルアップを実感してください</p>
      <NuxtLink to="/study/settings" class="btn-primary inline-block text-lg px-12 py-4">
        学習を開始する 🚀
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
