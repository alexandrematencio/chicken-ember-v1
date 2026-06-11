<script setup lang="ts">
import { business } from '~/data/business'

useSeoMeta({
  title: 'Commander — à emporter ou en livraison',
  description:
    'Commandez Chicken Ember à Villejuif : à emporter en 15 minutes au 01 43 90 96 91, ou en livraison via Uber Eats et Deliveroo. Poulet braisé halal, titres-restaurant acceptés.',
})
useHead({ link: [{ rel: 'canonical', href: `${business.url}/commander` }] })

const channels = [
  {
    title: 'À emporter — direct',
    desc: 'Appelez, c’est prêt en ~15 minutes. Le meilleur prix : aucune commission, et vous nous aidez à rester indépendants.',
    cta: `Appeler · ${business.phoneDisplay}`,
    href: `tel:${business.phone}`,
    primary: true,
  },
  {
    title: 'Uber Eats',
    desc: 'Livraison sur Villejuif et alentours. 4,8★ sur 85 notes.',
    cta: 'Commander sur Uber Eats',
    href: business.links.uberEats,
    primary: false,
  },
  {
    title: 'Deliveroo',
    desc: 'Livraison en ~30 minutes depuis Villejuif centre.',
    cta: 'Commander sur Deliveroo',
    href: business.links.deliveroo,
    primary: false,
  },
]
</script>

<template>
  <div class="commander-page">
    <header class="section commander-hero">
      <div class="wrap">
        <p class="kicker">Commander</p>
        <SplitLines>
          <h1 class="h-xl">Trois façons<br />d'y goûter</h1>
        </SplitLines>
        <p class="lead">
          Sur place au 93 rue Jean Jaurès, à emporter en direct, ou livré chez vous.
          <strong>Titres-restaurant acceptés</strong> à emporter et sur Uber Eats.
        </p>
      </div>
    </header>

    <section class="section" aria-label="Canaux de commande">
      <div class="wrap commander-grid">
        <article v-for="c in channels" :key="c.title" class="card commander-card" :data-primary="c.primary">
          <h2 class="h-md">{{ c.title }}</h2>
          <p>{{ c.desc }}</p>
          <a
            :href="c.href"
            :target="c.href.startsWith('tel:') ? undefined : '_blank'"
            :rel="c.href.startsWith('tel:') ? undefined : 'noopener'"
            class="btn"
            :class="c.primary ? 'btn--ember' : 'btn--ghost'"
          >{{ c.cta }}</a>
        </article>
      </div>
    </section>

    <section class="section commander-loyalty" aria-labelledby="fidelite-title">
      <div class="wrap card commander-loyalty__card">
        <h2 id="fidelite-title" class="h-md">La commande en ligne directe & la fidélité arrivent</h2>
        <p class="lead">
          Click &amp; collect sans commission, récompenses pour les habitués —
          c'est en préparation. Laissez votre numéro ou votre email en boutique
          pour être prévenus en premier.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.commander-hero {
  padding-top: 9rem;
}

.commander-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 1.4rem;
}

.commander-card {
  padding: 2rem;
  display: grid;
  gap: 1rem;
  align-content: start;
}

.commander-card p {
  color: var(--smoke);
  margin: 0;
}

.commander-card[data-primary='true'] {
  border-color: color-mix(in srgb, var(--ember) 45%, transparent);
  box-shadow: 0 0 60px -20px color-mix(in srgb, var(--ember) 35%, transparent);
}

.commander-card .btn {
  justify-self: start;
}

.commander-loyalty__card {
  padding: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
  display: grid;
  justify-items: center;
  gap: 1rem;
}
</style>
