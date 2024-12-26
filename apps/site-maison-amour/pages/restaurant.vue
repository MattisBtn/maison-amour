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
        >
            <h1 class="font-heading text-4xl sm:text-5xl md:text-7xl font-light mb-6">
                {{ pageData.title }}
            </h1>
            <p class="text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90">
                {{ pageData.subtitle }}
            </p>
        </HeroSection>

        <!-- Introduction Section -->
        <div class="max-w-3xl mx-auto px-6 md:px-8 text-center">
            <p class="text-lg md:text-xl text-zinc-600 font-light leading-relaxed">
                {{ pageData.description }}
            </p>
        </div>

        <!-- Restaurants Grid -->
        <div class="max-w-7xl mx-auto px-6 md:px-8 space-y-32">
            <!-- Brutus -->
            <div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="order-2 lg:order-1 space-y-8">
                        <h2 class="font-heading text-4xl md:text-5xl font-light text-zinc-900">
                            {{ pageData.brutusTitle }}
                        </h2>
                        <div class="prose prose-zinc max-w-none text-lg font-light" v-html="renderRichText(pageData.brutusDescription)" />
                        <ButtonCta 
                            to="/restaurant/brutus" 
                            variant="outline"
                            icon="heroicons:arrow-right"
                        >
                            {{ pageData.brutusCtaText }}
                        </ButtonCta>
                    </div>
                    <div class="order-1 lg:order-2 aspect-[3/4] overflow-hidden rounded-lg group">
                        <NuxtImg v-if="brutusImageUrl"
                            :src="brutusImageUrl"
                            :alt="pageData.brutusImg?.fields?.title || 'Brutus'"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                </div>
            </div>

            <!-- Maillard -->
            <div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="aspect-[3/4] overflow-hidden rounded-lg group">
                        <NuxtImg v-if="maillardImageUrl"
                            :src="maillardImageUrl"
                            :alt="pageData.maillardImg?.fields?.title || 'Maillard'"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div class="space-y-8">
                        <h2 class="font-heading text-4xl md:text-5xl font-light text-zinc-900">
                            {{ pageData.maillardTitle }}
                        </h2>
                        <div class="prose prose-zinc max-w-none text-lg font-light" v-html="renderRichText(pageData.maillardDescription)" />
                        <ButtonCta 
                            to="/restaurant/maillard" 
                            variant="outline"
                            icon="heroicons:arrow-right"
                        >
                            {{ pageData.maillardCtaText }}
                        </ButtonCta>
                    </div>
                </div>
            </div>

            <!-- Gramma -->
            <div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="order-2 lg:order-1 space-y-8">
                        <h2 class="font-heading text-4xl md:text-5xl font-light text-zinc-900">
                            {{ pageData.grammaTitle }}
                        </h2>
                        <div class="prose prose-zinc max-w-none text-lg font-light" v-html="renderRichText(pageData.grammaDescription)" />
                        <ButtonCta 
                            to="/restaurant/gramma" 
                            variant="outline"
                            icon="heroicons:arrow-right"
                        >
                            {{ pageData.grammaCtaText }}
                        </ButtonCta>
                    </div>
                    <div class="order-1 lg:order-2 aspect-[3/4] overflow-hidden rounded-lg group">
                        <NuxtImg v-if="grammaImageUrl"
                            :src="grammaImageUrl"
                            :alt="pageData.grammaImg?.fields?.title || 'Gramma'"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                </div>
            </div>

            <!-- Bacchus -->
            <div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="aspect-[3/4] overflow-hidden rounded-lg group">
                        <NuxtImg v-if="bacchusImageUrl"
                            :src="bacchusImageUrl"
                            :alt="pageData.bacchusImg?.fields?.title || 'Bacchus'"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div class="space-y-8">
                        <h2 class="font-heading text-4xl md:text-5xl font-light text-zinc-900">
                            {{ pageData.bacchusTitle }}
                        </h2>
                        <div class="prose prose-zinc max-w-none text-lg font-light" v-html="renderRichText(pageData.bacchusDescription)" />
                        <ButtonCta 
                            to="/restaurant/bacchus" 
                            variant="outline"
                            icon="heroicons:arrow-right"
                        >
                            {{ pageData.bacchusCtaText }}
                        </ButtonCta>
                    </div>
                </div>
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
import type { RestaurantPageData } from '~/types/contentful'

const { $contentful } = useNuxtApp()
const { t, locale } = useI18n()

const { data: pageData, error } = await useAsyncData('restaurantPage', async () => {
    try {
        const entries = await $contentful.getEntries({
            content_type: 'maisonAmourRestaurantsPage',
            locale: locale.value,
            include: 1
        })

        if (!entries?.items?.length) {
            throw new Error('No content found')
        }

        return entries.items[0].fields as RestaurantPageData
    } catch (err) {
        console.error('Error fetching restaurant page data:', err)
        return null
    }
})

// Computed properties for image URLs
const heroImageUrl = computed(() => 
    pageData.value?.heroImg?.fields?.file?.url ? 'https:' + pageData.value.heroImg.fields.file.url : null
)

const brutusImageUrl = computed(() => 
    pageData.value?.brutusImg?.fields?.file?.url ? 'https:' + pageData.value.brutusImg.fields.file.url : null
)

const maillardImageUrl = computed(() => 
    pageData.value?.maillardImg?.fields?.file?.url ? 'https:' + pageData.value.maillardImg.fields.file.url : null
)

const grammaImageUrl = computed(() => 
    pageData.value?.grammaImg?.fields?.file?.url ? 'https:' + pageData.value.grammaImg.fields.file.url : null
)

const bacchusImageUrl = computed(() => 
    pageData.value?.bacchusImg?.fields?.file?.url ? 'https:' + pageData.value.bacchusImg.fields.file.url : null
)

// Rich text renderer helper
const renderRichText = (content: any) => {
    if (!content?.content) return ''
    return content.content
        .map((block: any) => {
            if (block.nodeType === 'paragraph') {
                return `<p>${block.content.map((text: any) => text.value).join('')}</p>`
            }
            return ''
        })
        .join('')
}

useSeoMeta({
    title: () => t('meta.restaurant.title'),
    description: () => t('meta.restaurant.description')
})
</script> 