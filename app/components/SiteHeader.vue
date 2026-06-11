<script setup lang="ts">
import { business } from '~/data/business'

const links = [
  { to: '/menu', label: 'Menu' },
  { to: '/commander', label: 'Commander' },
  { to: '/avis', label: 'Avis' },
  { to: '/contact', label: 'Contact' },
]
</script>

<template>
  <header class="header">
    <div class="header__in wrap">
      <NuxtLink to="/" class="header__logo" aria-label="Chicken Ember — accueil">
        <LogoEmber />
      </NuxtLink>

      <nav class="header__nav" aria-label="Navigation principale">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="link-draw header__link">
          {{ l.label }}
        </NuxtLink>
      </nav>

      <a :href="`tel:${business.phone}`" class="btn btn--ember header__call">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>
        <span class="header__call-label">{{ business.phoneDisplay }}</span>
      </a>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: linear-gradient(color-mix(in srgb, var(--char) 88%, transparent), transparent);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  mask-image: linear-gradient(black 72%, transparent);
}

.header__in {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-block: 1rem;
}

.header__logo {
  margin-right: auto;
}

.header__nav {
  display: flex;
  gap: 1.4rem;
}

.header__link {
  font-size: 0.9375rem;
  font-weight: 600;
  opacity: 0.9;
}

.header__call {
  padding: 0.6rem 1.1rem;
  font-size: 0.875rem;
}

@media (max-width: 720px) {
  .header__nav {
    gap: 1rem;
  }
  .header__link {
    font-size: 0.875rem;
  }
  .header__call-label {
    display: none;
  }
  .header__call {
    padding: 0.6rem 0.7rem;
  }
}

@media (max-width: 460px) {
  .header__nav .header__link:nth-child(3),
  .header__nav .header__link:nth-child(4) {
    display: none;
  }
}
</style>
