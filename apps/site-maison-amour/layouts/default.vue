<template>
  <div class="min-h-screen flex flex-col">
    <header class="fixed top-0 w-full transition-all duration-500" 
      :class="[
        { 'header-scrolled shadow-[0_8px_32px_rgba(0,0,0,0.08)]': isScrolled },
        { 'z-50': true }
      ]">
      <div class="container flex h-20 items-center justify-between md:justify-center relative">
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex gap-12">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to" 
            class="relative py-2 text-sm uppercase tracking-widest transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full" 
            :class="{ 'text-white after:bg-white': !isScrolled, 'text-zinc-800 after:bg-zinc-800': isScrolled }">
            {{ t(link.label) }}
          </NuxtLink>
        </nav>

        <!-- Mobile Navigation -->
        <nav class="md:hidden flex items-center justify-between w-full px-2">
          <button
            class="relative text-sm uppercase tracking-widest transition-colors px-2 py-1.5"
            :class="{ 'text-white hover:text-white/80': !isScrolled, 'text-zinc-800 hover:text-zinc-600': isScrolled }"
            @click="switchLocale(locale === 'fr' ? 'en' : 'fr')">
            {{ locale === 'fr' ? 'EN' : 'FR' }}
          </button>

          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <NuxtImg
              v-if="isScrolled && route.path === '/'"
              src="/images/logo-black.png"
              alt="Maison Amour"
              class="h-10 w-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </Transition>
          
          <button
            class="relative z-50 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
            :class="{ 
              'text-white hover:text-white/80': !isScrolled && !isMenuOpen, 
              'text-zinc-800 hover:text-zinc-600 hover:bg-zinc-50': isScrolled || isMenuOpen 
            }"
            @click="isMenuOpen = !isMenuOpen">
            <UIcon v-if="!isMenuOpen" name="i-heroicons-bars-3" class="w-6 h-6" />
            <UIcon v-else name="i-heroicons-x-mark" class="w-6 h-6" />
          </button>
        </nav>

        <!-- Desktop Language Selector -->
        <div class="hidden md:block md:absolute md:right-6">
          <button
            class="relative text-sm uppercase tracking-widest transition-colors px-2 py-1.5 -mx-2"
            :class="{ 'text-white hover:text-white/80': !isScrolled, 'text-zinc-800 hover:text-zinc-600': isScrolled }"
            @click="switchLocale(locale === 'fr' ? 'en' : 'fr')">
            {{ locale === 'fr' ? 'EN' : 'FR' }}
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile menu (moved outside header) -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-show="isMenuOpen" 
        class="fixed inset-0 md:hidden z-[9999]"
        @click="isMenuOpen = false">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div class="fixed right-0 top-0 bottom-0 w-64 bg-[#F8F4E0] shadow-2xl"
          @click.stop>
          <div class="flex flex-col h-full">
            <div class="h-20 flex items-center justify-end px-2">
              <button
                class="w-10 h-10 flex items-center justify-center rounded-full text-zinc-800 hover:text-zinc-600 hover:bg-zinc-50 transition-colors"
                @click="isMenuOpen = false">
                <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
              </button>
            </div>
            <nav class="flex-1 flex flex-col justify-center px-8">
              <NuxtLink 
                v-for="link in links" 
                :key="link.to" 
                :to="link.to"
                @click="isMenuOpen = false"
                class="relative py-4 text-sm uppercase tracking-widest text-zinc-800 transition-colors border-b border-zinc-100 first:border-t hover:text-zinc-600">
                {{ t(link.label) }}
              </NuxtLink>
            </nav>
            <div class="p-8 border-t border-zinc-100">
              <p class="text-xs text-zinc-500 text-center">
                © {{ new Date().getFullYear() }} Maison Amour
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t py-12 md:py-16">
      <div class="container px-6 md:px-8">
        <div class="flex flex-col items-center space-y-12">
          <NuxtImg src="/images/logo-black.png" alt="Maison Amour" class="h-10 md:h-12 w-auto" />
          
          <nav class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-x-8 w-full">
            <NuxtLink 
              v-for="link in links" 
              :key="link.to" 
              :to="link.to"
              class="text-sm uppercase tracking-widest text-zinc-600 hover:text-zinc-900 transition-colors py-2 md:py-0">
              {{ t(link.label) }}
            </NuxtLink>
          </nav>

          <div class="flex flex-col items-center space-y-6 md:space-y-4 text-center w-full">
            <a href="tel:+33671052301" 
              class="text-lg font-heading text-zinc-800 hover:text-zinc-600 transition-colors py-2">
              +33 6 71 05 23 01
            </a>
            <div class="text-sm text-zinc-500 space-y-2 md:space-y-1">
              <p>© {{ new Date().getFullYear() }} Maison Amour</p>
              <p>{{ t('footer.rights') }}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { t, locale, setLocale } = useI18n({
  useScope: 'global'
})
const route = useRoute()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const links = [
  { to: '/', label: 'nav.home' },
  { to: '/restaurant', label: 'nav.restaurant' },
  { to: '/traiteur', label: 'nav.catering' },
  { to: '/contact', label: 'nav.contact' }
]

const switchLocale = (newLocale: 'fr' | 'en') => {
  setLocale(newLocale)
}

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
  }
  window.addEventListener('scroll', handleScroll)
  handleScroll()

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
})

// Prevent scroll when menu is open
watch(isMenuOpen, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style>
.header-scrolled {
  background: #F8F4E0;
  border-bottom: 1px solid rgba(228, 228, 231, 0.6);
}

/* Separate backdrop-filter to avoid stacking context issues */
@supports (backdrop-filter: blur(12px)) {
  .header-scrolled {
    backdrop-filter: blur(12px) saturate(180%);
  }
}
</style> 