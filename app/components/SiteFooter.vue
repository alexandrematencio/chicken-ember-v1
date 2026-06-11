<script setup lang="ts">
import { business } from '~/data/business'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="wrap">
      <div class="footer__grid">
        <div>
          <LogoEmber />
          <p class="footer__tag">Poulet braisé halal — Villejuif, depuis 2020.</p>
          <p class="footer__vouchers">
            <span v-for="v in business.mealVouchers" :key="v" class="badge badge--glow">{{ v }}</span>
          </p>
        </div>

        <div>
          <h2 class="footer__h">Adresse</h2>
          <address class="footer__addr">
            {{ business.address.street }}<br />
            {{ business.address.postalCode }} {{ business.address.city }}<br />
            <a :href="`tel:${business.phone}`" class="link-draw">{{ business.phoneDisplay }}</a>
          </address>
          <p class="footer__hours">Ouvert 7j/7 · 11h00 – 22h30</p>
        </div>

        <div>
          <h2 class="footer__h">Le site</h2>
          <ul class="footer__list">
            <li><NuxtLink to="/menu" class="link-draw">Menu</NuxtLink></li>
            <li><NuxtLink to="/commander" class="link-draw">Commander</NuxtLink></li>
            <li><NuxtLink to="/avis" class="link-draw">Laisser un avis</NuxtLink></li>
            <li><NuxtLink to="/contact" class="link-draw">Contact & accès</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h2 class="footer__h">Suivez la braise</h2>
          <ul class="footer__list">
            <li><a :href="business.links.uberEats" rel="noopener" target="_blank" class="link-draw">Uber Eats</a></li>
            <li><a :href="business.links.deliveroo" rel="noopener" target="_blank" class="link-draw">Deliveroo</a></li>
            <li v-if="business.links.instagram"><a :href="business.links.instagram" rel="noopener" target="_blank" class="link-draw">Instagram</a></li>
            <li v-else><span class="footer__soon">Instagram — bientôt</span></li>
            <li v-if="business.links.tiktok"><a :href="business.links.tiktok" rel="noopener" target="_blank" class="link-draw">TikTok</a></li>
            <li v-else><span class="footer__soon">TikTok — bientôt</span></li>
          </ul>
        </div>
      </div>

      <div class="footer__legal">
        <span>© {{ year }} Chicken Ember · {{ business.legalName }}</span>
        <NuxtLink to="/mentions-legales" class="link-draw">Mentions légales</NuxtLink>
        <NuxtLink to="/confidentialite" class="link-draw">Confidentialité</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  z-index: 1;
  border-top: 1px solid color-mix(in srgb, var(--creme) 8%, transparent);
  padding-block: 3.5rem 2rem;
  background: color-mix(in srgb, var(--char) 70%, transparent);
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2.5rem;
}

.footer__tag {
  color: var(--smoke);
  margin-top: 1rem;
  font-size: 0.9375rem;
}

.footer__vouchers {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.footer__h {
  font-size: 1rem;
  letter-spacing: 0.06em;
  margin-bottom: 0.9rem;
  color: var(--glow);
}

.footer__addr {
  font-style: normal;
  line-height: 1.7;
}

.footer__hours {
  color: var(--smoke);
  font-size: 0.9375rem;
  margin-top: 0.6rem;
}

.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.55rem;
}

.footer__soon {
  color: var(--smoke);
}

.footer__legal {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid color-mix(in srgb, var(--creme) 6%, transparent);
  color: var(--smoke);
  font-size: 0.875rem;
}
</style>
