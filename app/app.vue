<script setup lang="ts">
import { business } from '~/data/business'

useHead({
  script: [
    {
      // gate hidden .reveal states behind .js-anim before first paint;
      // crawlers / no-JS / reduced-motion get fully visible content
      innerHTML:
        "(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-anim')}catch(e){}})()",
      tagPosition: 'head',
    },
  ],
  meta: [
    {
      name: 'description',
      content: business.description,
    },
  ],
})

onMounted(() => {
  useSmoothScroll()
})
</script>

<template>
  <div class="app">
    <NuxtRouteAnnouncer />
    <SiteHeader />
    <EmberLayer />
    <main class="app__main">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>

<style>
.app__main {
  position: relative;
  z-index: 1;
}
</style>
