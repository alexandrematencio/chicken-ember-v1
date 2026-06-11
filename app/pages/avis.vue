<script setup lang="ts">
import { business, reviewThemes } from '~/data/business'

useSeoMeta({
  title: 'Laisser un avis',
  description:
    'Vous avez goûté le poulet braisé Chicken Ember à Villejuif ? Laissez un avis Google — deux phrases suffisent, et ça compte énormément pour un commerce indépendant.',
  robots: 'noindex, follow', // page funnel (cible des QR codes), pas une page de ranking
})
useHead({ link: [{ rel: 'canonical', href: `${business.url}/avis` }] })
</script>

<template>
  <div class="avis-page">
    <section class="section avis-hero">
      <div class="wrap avis-hero__in stack">
        <p class="kicker">Votre avis</p>
        <SplitLines>
          <h1 class="h-xl">Deux phrases.<br />C'est tout.</h1>
        </SplitLines>
        <p class="lead">
          Chicken Ember est un commerce indépendant : chaque avis Google
          aide les voisins à nous trouver. Si le poulet braisé ou la sauce verte
          vous ont plu — dites-le. Et si quelque chose n'allait pas,
          dites-le aussi : on lit tout, on répond à tout.
        </p>
        <a :href="business.links.googleReview" target="_blank" rel="noopener" class="btn btn--ember btn--lg">
          Laisser un avis Google
        </a>
        <p class="avis-hero__count"><strong>4,9★</strong> · déjà {{ business.rating.count }} avis — merci.</p>

        <ul class="avis-themes" aria-label="Ce que disent les avis">
          <li v-for="t in reviewThemes" :key="t">« {{ t }} »</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.avis-hero {
  padding-top: 9rem;
  min-height: 80svh;
}

.avis-hero__in {
  display: grid;
  gap: 1.7rem;
  justify-items: start;
}

.avis-hero__count {
  color: var(--smoke);
}

.avis-hero__count strong {
  color: var(--glow);
}

.avis-themes {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.avis-themes li {
  border: 1px solid color-mix(in srgb, var(--creme) 12%, transparent);
  border-radius: 999px;
  padding: 0.5rem 1.1rem;
  font-size: 0.9rem;
  color: var(--smoke);
}
</style>
