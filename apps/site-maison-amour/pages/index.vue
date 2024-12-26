<template>
    <div v-if="error">
        <div class="min-h-screen flex items-center justify-center">
            <p class="text-xl text-red-600">{{ t('errors.contentLoadError') }}</p>
        </div>
    </div>
    
    <div class="space-y-32" v-else-if="pageData">
        <HeroSection
            :image-url="heroImageUrl"
            :image-alt="pageData.heroImg?.fields?.title || 'Hero image'"
        />

        <div class="w-full">
            <div class="max-w-3xl mx-auto px-6 md:px-8">
                <div class="relative text-center space-y-12">
                    <h2 class="font-heading text-[2.5rem] md:text-6xl font-light text-zinc-900 tracking-tight leading-[1.1]">
                        {{ pageData.title }}
                    </h2>
                    
                    <div class="space-y-8">
                        <!-- Introduction -->
                        <p v-if="description.intro" class="text-lg md:text-xl text-zinc-600 font-light leading-relaxed">
                            {{ description.intro }}
                        </p>

                        <!-- Restaurants Grid -->
                        <div v-if="description.restaurants.length" class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <div v-for="(paragraph, index) in description.restaurants" 
                                 :key="index"
                                 class="p-6 border border-zinc-200 rounded-lg">
                                <p class="text-base md:text-lg text-zinc-600 font-light">
                                    {{ paragraph }}
                                </p>
                            </div>
                        </div>

                        <!-- Traiteur Section -->
                        <div v-if="description.traiteur" class="mt-12 p-6 border border-zinc-200 rounded-lg bg-zinc-50">
                            <p class="text-base md:text-lg text-zinc-600 font-light">
                                {{ description.traiteur }}
                            </p>
                        </div>

                        <!-- Conclusion -->
                        <p v-if="description.conclusion" class="text-base md:text-lg text-zinc-600 font-light italic mt-8">
                            {{ description.conclusion }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 w-full mt-32">
                <NuxtLink to="/restaurant" class="relative group aspect-[9/16] overflow-hidden">
                    <NuxtImg v-if="leftImageUrl"
                        :src="leftImageUrl"
                        :alt="pageData.leftImg?.fields?.fileName || 'Restaurant image'"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity group-hover:bg-black/60">
                        <h2 class="text-3xl font-light text-white tracking-wide">{{ pageData.leftText }}</h2>
                    </div>
                </NuxtLink>

                <NuxtLink to="/traiteur" class="relative group aspect-[9/16] overflow-hidden">
                    <NuxtImg v-if="rightImageUrl"
                        :src="rightImageUrl"
                        :alt="pageData.rightImg?.fields?.fileName || 'Traiteur image'"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity group-hover:bg-black/60">
                        <h2 class="text-3xl font-light text-white tracking-wide">{{ pageData.rightText }}</h2>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>

    <div v-else class="min-h-screen flex items-center justify-center">
        <div class="animate-pulse">
            <NuxtImg src="/images/logo.png" alt="Maison Amour" class="w-48 h-48 object-contain opacity-50" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { HomePageData } from '~/types/contentful'

const { $contentful } = useNuxtApp()
const { t, locale } = useI18n()

const { data: pageData, error } = await useAsyncData('homePage', async () => {
    try {
        const entries = await $contentful.getEntries({
            content_type: 'homePage',
            locale: locale.value,
            include: 1
        })

        if (!entries?.items?.length) {
            throw new Error('No content found')
        }

        return entries.items[0].fields as HomePageData
    } catch (err) {
        console.error('Error fetching home page data:', err)
        return null
    }
})

// Computed properties for safe data access
const description = computed(() => {
    const content = pageData.value?.description?.content || []
    return {
        intro: content[0]?.content?.[0]?.value || '',
        restaurants: content.slice(1, 5).map(p => p?.content?.[0]?.value || ''),
        traiteur: content[5]?.content?.[0]?.value || '',
        conclusion: content[6]?.content?.[0]?.value || ''
    }
})

const heroImageUrl = computed(() => 
    pageData.value?.heroImg?.fields?.file?.url ? 'https:' + pageData.value.heroImg.fields.file.url : null
)

const leftImageUrl = computed(() => 
    pageData.value?.leftImg?.fields?.file?.url ? 'https:' + pageData.value.leftImg.fields.file.url : null
)

const rightImageUrl = computed(() => 
    pageData.value?.rightImg?.fields?.file?.url ? 'https:' + pageData.value.rightImg.fields.file.url : null
)

useSeoMeta({
    title: () => t('meta.home.title'),
    description: () => t('meta.home.description')
})
</script>