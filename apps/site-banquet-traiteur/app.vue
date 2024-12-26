<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

const config = useRuntimeConfig()

// Composable pour gérer les appels à Strapi
const useStrapi = () => {
  const fetch = async <T>(endpoint: string): Promise<T | null> => {
    try {
      const { data } = await useFetch<StrapiResponse<T>>(`${config.public.strapi.url}${config.public.strapi.prefix}${endpoint}`)
      return data.value?.data ?? null
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error)
      return null
    }
  }

  return {
    fetch
  }
}

// Exemple d'utilisation
const { fetch: fetchFromStrapi } = useStrapi()
const { data: pageData } = await useAsyncData('home', () => 
  fetchFromStrapi<any>('/banquet-home')
)
</script> 