// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: false
  },
  modules: [
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/strapi'
  ],
  runtimeConfig: {
    public: {
      strapi: {
        url: process.env.STRAPI_URL || 'http://localhost:1337',
        prefix: '/api',
        version: 'v4',
      }
    }
  },
  app: {
    head: {
      title: 'Banquet Traiteur - Maison Amour',
      meta: [
        { name: 'description', content: 'Service traiteur et banquet du groupe Maison Amour' }
      ]
    }
  }
})