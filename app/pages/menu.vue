<script setup lang="ts">
import { business } from '~/data/business'
import { menuSections } from '~/data/menu'
import { menuJsonLd, useJsonLd } from '~/utils/jsonld'

useSeoMeta({
  title: 'Menu — poulet braisé, sandwichs, sauces maison',
  description:
    'La carte Chicken Ember à Villejuif : poulet entier braisé (10,30 €), pilons, blanc de poulet, sandwich poulet braisé (7,50 €), menu solo (7,00 €), sauces maison et desserts. 100 % halal.',
  ogTitle: 'Le menu Chicken Ember · Poulet braisé halal à Villejuif',
})
useHead({ link: [{ rel: 'canonical', href: `${business.url}/menu` }] })
useJsonLd(menuJsonLd)

const page = ref<HTMLElement | null>(null)
useGsapContext(page, (gsap) => {
  gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    })
  })
})
</script>

<template>
  <div ref="page" class="menu-page">
    <header class="section menu-hero">
      <div class="wrap">
        <p class="kicker">La carte</p>
        <SplitLines>
          <h1 class="h-xl">Tout vient<br />de la braise</h1>
        </SplitLines>
        <p class="lead">
          100 % halal, braisé à la commande, jamais frit. Titres-restaurant acceptés
          (Ticket Restaurant, Swile, Pluxee) — sur place, à emporter et en livraison.
        </p>
        <p class="menu-hero__badges">
          <span class="badge badge--glow">100 % halal</span>
          <span class="badge badge--glow">Titres-resto OK</span>
          <span class="badge badge--sauce">Sauces maison</span>
        </p>
      </div>
    </header>

    <section
      v-for="section in menuSections"
      :key="section.id"
      :id="section.id"
      class="section menu-section"
      :aria-labelledby="`h-${section.id}`"
    >
      <div class="wrap">
        <h2 :id="`h-${section.id}`" class="h-lg menu-section__title">{{ section.title }}</h2>
        <p v-if="section.intro" class="lead menu-section__intro">{{ section.intro }}</p>
        <div class="menu-grid">
          <MenuCard v-for="item in section.items" :key="item.id" :item="item" class="reveal" />
        </div>
      </div>
    </section>

    <footer class="section menu-page__note">
      <div class="wrap">
        <p>
          Carte et prix susceptibles d'évoluer — la référence reste l'affichage en boutique.
          Allergènes : la liste détaillée par produit est disponible au comptoir et sur demande au
          <a :href="`tel:${business.phone}`" class="link-draw">{{ business.phoneDisplay }}</a>.
        </p>
        <NuxtLink to="/commander" class="btn btn--ember btn--lg">Commander maintenant</NuxtLink>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.menu-hero {
  padding-top: 9rem;
}

.menu-hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.4rem;
}

.menu-section__title {
  margin-bottom: 0.8rem;
}

.menu-section__intro {
  margin-bottom: 2.2rem;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
  gap: 1.4rem;
  margin-top: 1.8rem;
}

.menu-page__note {
  text-align: center;
}

.menu-page__note p {
  color: var(--smoke);
  font-size: 0.9375rem;
  max-width: 46em;
  margin: 0 auto 2rem;
}
</style>
