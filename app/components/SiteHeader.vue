<script setup lang="ts">
import { business } from '~/data/business'

const links = [
  { to: '/menu', label: 'Menu', hint: 'La carte braisée' },
  { to: '/commander', label: 'Commander', hint: 'À emporter ou livré' },
  { to: '/avis', label: 'Avis', hint: '4,9★ — laissez le vôtre' },
  { to: '/contact', label: 'Contact', hint: 'Adresse, horaires, accès' },
]

const open = ref(false)
const burger = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)
const firstLink = ref<HTMLElement | null>(null)
const route = useRoute()

const close = () => (open.value = false)
const toggle = () => (open.value = !open.value)

// close on backdrop click (only the empty area, not the links/buttons)
const onPanelClick = (e: MouseEvent) => {
  if (e.target === panel.value) close()
}

// body scroll lock + focus management
watch(open, async (isOpen) => {
  if (import.meta.server) return
  document.documentElement.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) {
    await nextTick()
    firstLink.value?.focus()
  } else {
    burger.value?.focus()
  }
})

// close on route change
watch(() => route.fullPath, () => { if (open.value) close() })

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open.value) close()
  }
  const mq = window.matchMedia('(min-width: 801px)')
  const onDesktop = (e: MediaQueryListEvent) => {
    if (e.matches && open.value) close()
  }
  window.addEventListener('keydown', onKey)
  mq.addEventListener('change', onDesktop)
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKey)
    mq.removeEventListener('change', onDesktop)
    document.documentElement.style.overflow = ''
  })
})
</script>

<template>
  <header class="header" :class="{ 'is-open': open }">
    <div class="header__in wrap">
      <NuxtLink to="/" class="header__logo" aria-label="Chicken Ember — accueil" @click="close">
        <LogoEmber />
      </NuxtLink>

      <!-- desktop nav -->
      <nav class="header__nav" aria-label="Navigation principale">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="link-draw header__link">
          {{ l.label }}
        </NuxtLink>
      </nav>

      <a :href="`tel:${business.phone}`" class="btn btn--ember header__call">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>
        <span class="header__call-label">{{ business.phoneDisplay }}</span>
      </a>

      <!-- mobile burger -->
      <button
        ref="burger"
        class="burger"
        :class="{ 'is-active': open }"
        :aria-expanded="open"
        aria-controls="nav-panel"
        :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'"
        @click="toggle"
      >
        <span class="burger__box" aria-hidden="true">
          <span class="burger__line" />
          <span class="burger__line" />
          <span class="burger__line" />
          <span class="burger__spark" />
        </span>
      </button>
    </div>
  </header>

  <!-- full-screen ignition panel (sibling of header bar to escape its mask clipping) -->
  <div
    id="nav-panel"
    ref="panel"
    class="nav-panel"
    :class="{ 'is-open': open }"
    :aria-hidden="!open"
    :inert="!open || null"
    @click="onPanelClick"
  >
    <div class="nav-panel__inner wrap">
      <p class="nav-panel__kicker">Chicken Ember · Villejuif</p>

      <nav class="nav-panel__nav" aria-label="Navigation mobile">
        <NuxtLink
          v-for="(l, i) in links"
          :key="l.to"
          :ref="(el) => { if (i === 0) firstLink = (el as any)?.$el ?? (el as HTMLElement) }"
          :to="l.to"
          class="nav-link"
          :style="{ '--i': i }"
        >
          <span class="nav-link__index">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="nav-link__mask"><span class="nav-link__label">{{ l.label }}</span></span>
          <span class="nav-link__hint">{{ l.hint }}</span>
        </NuxtLink>
      </nav>

      <div class="nav-panel__foot">
        <p class="nav-panel__status"><StatusChip /></p>
        <a :href="`tel:${business.phone}`" class="btn btn--ember btn--lg nav-panel__call">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>
          Appeler · {{ business.phoneDisplay }}
        </a>
        <p class="nav-panel__delivery">
          <span>Livraison</span>
          <a :href="business.links.uberEats" target="_blank" rel="noopener" class="link-draw">Uber Eats</a>
          <a :href="business.links.deliveroo" target="_blank" rel="noopener" class="link-draw">Deliveroo</a>
        </p>
      </div>
    </div>
  </div>
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

/* when menu open, the bar becomes solid so the burger/logo stay legible over the panel */
.header.is-open {
  background: var(--char);
  mask-image: none;
}

.header__in {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-block: 1rem;
}

.header__logo {
  margin-right: auto;
  position: relative;
  z-index: 2;
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

/* ————— burger ————— */
.burger {
  display: none;
  position: relative;
  z-index: 2;
  width: 46px;
  height: 46px;
  margin: -6px -8px -6px 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  color: var(--creme);
}

.burger__box {
  position: relative;
  display: block;
  width: 26px;
  height: 14px;
  margin: 0 auto;
}

.burger__line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.4s var(--ease-heat), opacity 0.25s, background-color 0.4s;
}

.burger__line:nth-child(1) { top: 0; }
.burger__line:nth-child(2) { top: 6px; width: 70%; }
.burger__line:nth-child(3) { top: 12px; }

.burger__spark {
  position: absolute;
  top: 5px;
  right: -2px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--glow);
  box-shadow: 0 0 8px var(--glow);
  opacity: 0;
  transition: opacity 0.3s;
}

.burger:hover .burger__spark { opacity: 1; }

.burger.is-active .burger__line { background: var(--ember); }
.burger.is-active .burger__line:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.burger.is-active .burger__line:nth-child(2) { opacity: 0; transform: scaleX(0); }
.burger.is-active .burger__line:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
.burger.is-active .burger__spark { opacity: 1; }

/* ————— ignition panel ————— */
.nav-panel {
  position: fixed;
  inset: 0;
  z-index: 45;
  background:
    radial-gradient(120% 70% at 92% -4%, color-mix(in srgb, var(--ember) 22%, transparent), transparent 55%),
    radial-gradient(120% 60% at 50% 112%, color-mix(in srgb, var(--ember) 18%, transparent), transparent 60%),
    var(--char);
  /* ignition: circle wipe from the burger corner */
  clip-path: circle(0% at 92% 34px);
  opacity: 0;
  visibility: hidden;
  transition: clip-path 0.62s var(--ease-heat), opacity 0.3s ease, visibility 0s linear 0.62s;
}

.nav-panel.is-open {
  clip-path: circle(150% at 92% 34px);
  opacity: 1;
  visibility: visible;
  transition: clip-path 0.62s var(--ease-heat), opacity 0.25s ease, visibility 0s;
}

.nav-panel__inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  padding-block: 6.5rem 2.5rem;
  width: min(var(--w-max), 100% - var(--gutter) * 2);
}

.nav-panel__kicker {
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ember);
  margin: 0;
}

.nav-panel__nav {
  display: flex;
  flex-direction: column;
}

.nav-link {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: baseline;
  column-gap: 1rem;
  padding-block: clamp(0.5rem, 2.4vw, 1rem);
  border-top: 1px solid color-mix(in srgb, var(--creme) 9%, transparent);
  text-decoration: none;
  color: var(--creme);
}

.nav-link:last-child {
  border-bottom: 1px solid color-mix(in srgb, var(--creme) 9%, transparent);
}

.nav-link__index {
  font-family: var(--font-text);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--smoke);
  transition: color 0.3s;
}

.nav-link__mask {
  display: block;
  overflow: clip;
  grid-column: 2;
}

.nav-link__label {
  display: block;
  font-family: var(--font-display);
  text-transform: uppercase;
  line-height: 0.94;
  font-size: clamp(2.4rem, 13vw, 4.5rem);
  /* masked slide-up reveal, staggered per item */
  transform: translateY(110%);
  transition: transform 0.6s var(--ease-heat);
  transition-delay: calc(0.12s + var(--i) * 0.07s);
}

.nav-link__hint {
  grid-column: 2;
  font-size: 0.875rem;
  color: var(--smoke);
  opacity: 0;
  transition: opacity 0.4s ease;
  transition-delay: calc(0.22s + var(--i) * 0.07s);
}

.nav-panel.is-open .nav-link__label { transform: translateY(0); }
.nav-panel.is-open .nav-link__hint { opacity: 1; }

/* ignite on hover / current page */
.nav-link:hover .nav-link__label,
.nav-link:focus-visible .nav-link__label,
.nav-link[aria-current='page'] .nav-link__label {
  background-image: linear-gradient(100deg, var(--glow), var(--ember) 55%, var(--creme));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-link:hover .nav-link__index,
.nav-link[aria-current='page'] .nav-link__index {
  color: var(--ember);
}

/* foot hub */
.nav-panel__foot {
  display: grid;
  gap: 1.1rem;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease 0.4s, transform 0.5s var(--ease-heat) 0.4s;
}

.nav-panel.is-open .nav-panel__foot {
  opacity: 1;
  transform: none;
}

.nav-panel__status { margin: 0; }

.nav-panel__call { justify-self: start; }

.nav-panel__delivery {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin: 0;
  font-size: 0.9375rem;
  color: var(--smoke);
}

.nav-panel__delivery span {
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: var(--ember);
}

/* ————— breakpoint ————— */
@media (max-width: 800px) {
  .header__nav,
  .header__call {
    display: none;
  }
  .burger {
    display: block;
  }
}

@media (min-width: 801px) {
  .nav-panel {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-panel,
  .nav-panel.is-open {
    transition: opacity 0.2s ease, visibility 0s;
    clip-path: none;
  }
  .nav-link__label,
  .nav-link__hint,
  .nav-panel__foot {
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
  .burger__line {
    transition: opacity 0.2s, background-color 0.2s;
  }
}
</style>
