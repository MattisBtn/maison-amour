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
  ],
  i18n: {
    langDir: 'locales',
    defaultLocale: 'fr',
    locales: [
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Français',
        file: 'fr.json'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'fr'
    }
  },
  runtimeConfig: {
    public: {
      contentful: {
        spaceId: 'szyb7cjet3d1',
        accessToken: 'bO7nlwfEy-NpCJOExhmsEajhy4Cxj17Tg7oppr1bp88'
      }
    }
  },
  googleFonts: {
    families: {
      Poppins: {
        wght: [300, 400, 500],
        ital: [400]
      },
      Inter: {
        wght: [300, 400],
        ital: [400]
      }
    },
    display: 'swap',
    prefetch: true,
    preload: true,
    preconnect: true,
    useStylesheet: true,
    download: false,
    base64: false,
  },
  app: {
    head: {
      title: 'Maison Amour',
      meta: [
        { name: 'description', content: 'Groupe de restauration bordelais' }
      ]
    }
  }
})