<template>
    <NuxtLink 
        :to="to" 
        class="inline-block group"
        :class="{ 'w-full': fullWidth }"
    >
        <span 
            class="inline-flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg font-light tracking-wider uppercase transition-all duration-500"
            :class="[
                variant === 'outline' ? [
                    'relative px-5 py-3 md:px-8 md:py-4 bg-zinc-900 text-white',
                    'shadow-[inset_0_0_0_0_#52525b] hover:shadow-[inset_260px_0_0_0_#52525b]',
                    'focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2',
                    { 'w-full': fullWidth }
                ] : [
                    'border-b-2 border-zinc-900 pb-1 hover:text-zinc-600 hover:border-zinc-600'
                ]
            ]"
        >
            <span class="relative flex items-center gap-2 md:gap-3 transition-transform duration-500 group-hover:-translate-x-1">
                <slot />
                <Icon 
                    v-if="icon" 
                    :name="icon" 
                    class="w-4 h-4 md:w-5 md:h-5 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110"
                    aria-hidden="true"
                />
            </span>
        </span>
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
    to: string
    variant?: 'underline' | 'outline'
    icon?: string
    fullWidth?: boolean
}>()
</script> 