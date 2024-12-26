<template>
    <div class="relative h-[100vh] w-full">
        <NuxtImg v-if="imageUrl" 
            :src="imageUrl"
            :alt="imageAlt"
            class="w-full h-full object-cover" 
            loading="eager" />
        <div class="absolute inset-0 bg-black/30">
            <div class="h-full flex flex-col">
                <!-- Logo Section -->
                <div class="flex-1 flex items-center justify-center pt-20 sm:pt-24 md:pt-32">
                    <NuxtImg 
                        src="/images/logo.png" 
                        alt="Maison Amour" 
                        class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain transition-all duration-300" 
                    />
                </div>
                <!-- Text Section -->
                <div v-if="$slots.default" class="flex-1 flex items-center pb-20 sm:pb-24">
                    <div class="w-full">
                        <div class="container mx-auto px-6 text-center text-white">
                            <slot />
                        </div>
                    </div>
                </div>
                <!-- Scroll Indicator -->
                <div class="absolute bottom-8 sm:bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-white">
                    <span class="text-xs sm:text-sm font-light tracking-wider uppercase mb-2 sm:mb-3 opacity-80">Découvrir</span>
                    <div class="w-px h-8 sm:h-10 md:h-12 bg-white/30 relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-full h-full bg-white animate-scroll-down" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    imageUrl?: string | null
    imageAlt?: string
}>()
</script>

<style>
@keyframes scroll-down {
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }
    15% {
        transform: translateY(0);
        opacity: 1;
    }
    85% {
        transform: translateY(0);
        opacity: 1;
    }
    100% {
        transform: translateY(100%);
        opacity: 0;
    }
}

.animate-scroll-down {
    animation: scroll-down 2s ease-in-out infinite;
}
</style> 