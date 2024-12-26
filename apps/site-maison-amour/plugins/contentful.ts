import { createClient } from 'contentful'

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    contentful: {
      spaceId: string
      accessToken: string
    }
  }
}

declare module '#app' {
  interface NuxtApp {
    $contentful: any
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const client = createClient({
    space: config.public.contentful.spaceId,
    accessToken: config.public.contentful.accessToken,
  })

  return {
    provide: {
      contentful: client
    }
  }
})
