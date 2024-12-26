<template>
  <div>
    Hello World
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.contact.title'),
  description: () => t('meta.contact.description')
})
</script> 