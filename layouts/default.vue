<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- ヘッダー -->
    <header class="glass-effect sticky top-0 z-50 backdrop-blur-lg">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-3 group">
              <div class="text-4xl group-hover:scale-110 transition-transform duration-300">
                📚
              </div>
              <div>
                <span class="text-2xl font-extrabold gradient-text">Quiz App</span>
                <p class="text-xs text-gray-500 -mt-1">Learning Platform</p>
              </div>
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-2">
            <NuxtLink
              to="/"
              class="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-white/50 hover:text-blue-600 transition-all duration-300 hover:scale-105 transform"
            >
              🏠 ホーム
            </NuxtLink>
            <NuxtLink
              to="/study"
              class="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
            >
              ✨ 学習開始
            </NuxtLink>
            <NuxtLink
              to="/problems"
              class="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-white/50 hover:text-blue-600 transition-all duration-300 hover:scale-105 transform"
            >
              📝 問題一覧
            </NuxtLink>
            <NuxtLink
              to="/stats"
              class="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-white/50 hover:text-blue-600 transition-all duration-300 hover:scale-105 transform"
            >
              📊 統計
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <!-- メインコンテンツ -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <slot />
    </main>

    <!-- フッター -->
    <footer class="glass-effect mt-16 border-t border-white/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <p class="text-gray-600 font-medium mb-2">
            📚 Quiz App - プログラミング学習復習アプリ
          </p>
          <p class="text-sm text-gray-500">
            &copy; 2025 All rights reserved. Made with ❤️ by developers, for developers
          </p>
        </div>
      </div>
    </footer>

    <!-- Toast通知 -->
    <Toast />
  </div>
</template>
