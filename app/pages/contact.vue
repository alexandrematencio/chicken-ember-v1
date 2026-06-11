<script setup lang="ts">
import { business } from '~/data/business'

useSeoMeta({
  title: 'Contact, horaires & accès',
  description:
    'Chicken Ember — 93 Rue Jean Jaurès, 94800 Villejuif. Ouvert 7j/7 de 11h00 à 22h30. Tél : 01 43 90 96 91. Métro 7 Louis-Aragon, ligne 14 Villejuif – Gustave-Roussy.',
})
useHead({ link: [{ rel: 'canonical', href: `${business.url}/contact` }] })
</script>

<template>
  <div class="contact-page">
    <section class="section contact-hero">
      <div class="wrap">
        <p class="kicker">Contact &amp; accès</p>
        <SplitLines>
          <h1 class="h-xl">Venez voir<br />la braise</h1>
        </SplitLines>

        <div class="contact-grid">
          <div class="card contact-card">
            <h2 class="h-md">Adresse</h2>
            <address>
              {{ business.address.street }}<br />
              {{ business.address.postalCode }} {{ business.address.city }}
            </address>
            <a :href="business.links.googleMaps" target="_blank" rel="noopener" class="btn btn--ghost">Itinéraire Google Maps</a>
          </div>

          <div class="card contact-card">
            <h2 class="h-md">Horaires</h2>
            <p><StatusChip /></p>
            <p class="contact-card__muted">Ouvert 7 jours sur 7<br />11h00 – 22h30, service continu.</p>
          </div>

          <div class="card contact-card">
            <h2 class="h-md">Téléphone</h2>
            <p class="contact-card__muted">Commandes à emporter, questions allergènes, grosses commandes :</p>
            <a :href="`tel:${business.phone}`" class="btn btn--ember">{{ business.phoneDisplay }}</a>
          </div>

          <div class="card contact-card">
            <h2 class="h-md">Y aller</h2>
            <ul class="contact-card__list">
              <li>Métro 7 — Louis-Aragon, puis bus/10 min à pied</li>
              <li>Métro 14 — Villejuif – Gustave-Roussy</li>
              <li>À 5 minutes de l'Institut Gustave-Roussy</li>
              <li>Paiement : CB, espèces, titres-restaurant</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-hero {
  padding-top: 9rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(255px, 1fr));
  gap: 1.4rem;
  margin-top: 2.6rem;
}

.contact-card {
  padding: 1.8rem;
  display: grid;
  gap: 1rem;
  align-content: start;
}

.contact-card address {
  font-style: normal;
  line-height: 1.7;
}

.contact-card__muted {
  color: var(--smoke);
  margin: 0;
}

.contact-card__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
  color: var(--smoke);
}

.contact-card .btn {
  justify-self: start;
}
</style>
