<script setup lang="ts">
defineProps<{ error: { statusCode?: number } }>()
useSeoMeta({ title: 'Page introuvable', robots: 'noindex' })
</script>

<template>
  <div class="err">
    <SiteHeader />
    <main class="err__main wrap">
      <h1 class="h-xl">{{ error?.statusCode === 404 ? 'Cette page a fini sur la braise' : 'Petit raté de cuisson' }}</h1>
      <p class="lead">Le poulet, lui, est toujours là.</p>
      <NuxtLink to="/" class="btn btn--ember btn--lg" @click="clearError({ redirect: '/' })">Retour à l'accueil</NuxtLink>
    </main>
  </div>
</template>

<style scoped>
.err__main {
  min-height: 100svh;
  display: grid;
  place-content: center;
  justify-items: start;
  gap: 1.6rem;
}
</style>
