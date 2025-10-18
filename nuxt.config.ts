// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Quiz App - プログラミング学習復習アプリ',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'プログラミング学習復習のためのフラッシュカードアプリ' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  }
})
