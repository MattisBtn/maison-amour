<template>
  <div>
    Hello World
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.catering.title'),
  description: () => t('meta.catering.description')
})
</script> 