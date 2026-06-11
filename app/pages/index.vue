<script setup lang="ts">
import { business, reviewThemes } from '~/data/business'
import { menuSections } from '~/data/menu'
import { restaurantJsonLd, useJsonLd } from '~/utils/jsonld'

useSeoMeta({
  title: null,
  ogTitle: 'Chicken Ember · Poulet braisé halal à Villejuif',
  description:
    'Le poulet braisé halal le mieux noté de Villejuif (4,9★). Pilons, blancs, poulets entiers braisés à la commande, sauce verte maison. Sur place, à emporter, livraison.',
  ogDescription: 'Poulet braisé halal à Villejuif — 4,9★ sur plus de 220 avis. Sur place, à emporter, livraison.',
  ogUrl: business.url,
})

useHead({ link: [{ rel: 'canonical', href: `${business.url}/` }] })
useJsonLd(restaurantJsonLd)

const featured = menuSections
  .flatMap((s) => s.items)
  .filter((i) => ['poulet-entier', 'pilons', 'sandwich-braise', 'blanc'].includes(i.id))

// ——— motion ———
const page = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)
const braiseSection = ref<HTMLElement | null>(null)
const menuSection = ref<HTMLElement | null>(null)
const sauceSection = ref<HTMLElement | null>(null)
const commanderSection = ref<HTMLElement | null>(null)

useIgnite(heroTitle)
useSectionHeat(braiseSection, 'coal')
useSectionHeat(menuSection, 'ember', 'coal')
useSectionHeat(sauceSection, 'sauce', 'ember')
useSectionHeat(commanderSection, 'ember', 'char')

useGsapContext(page, (gsap) => {
  // hero entrance (gsap.to over CSS-hidden .reveal — content is visible-by-default without JS)
  gsap.to('.hero .reveal', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.09,
    ease: 'power3.out',
    delay: 0.2,
  })

  // hero backdrop parallax (scrub)
  gsap.to('.hero__bg', {
    yPercent: 14,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  })

  // generic reveals (everything outside the hero)
  gsap.utils
    .toArray<HTMLElement>('.reveal')
    .filter((el) => !el.closest('.hero'))
    .forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
    })

  // braise image parallax
  gsap.to('.braise__img picture, .braise__img img', {
    yPercent: -12,
    ease: 'none',
    scrollTrigger: { trigger: '.braise', start: 'top bottom', end: 'bottom top', scrub: true },
  })
})
</script>

<template>
  <div ref="page">
    <!-- ——— LE FEU ——— -->
    <section class="hero" aria-label="Chicken Ember — poulet braisé halal à Villejuif">
      <div class="hero__bg" aria-hidden="true">
        <EmberImage name="embers-red" alt="" eager sizes="100vw" />
      </div>

      <div class="wrap hero__in stack">
        <p class="hero__chip reveal"><StatusChip /></p>

        <h1 ref="heroTitle" class="hero__title ignite h-xl" tabindex="0" title="Maintenez pour souffler sur la braise">
          <span class="ignite-fill">Poulet braisé<br />sur la braise.<br />Halal. À Villejuif.</span>
        </h1>

        <p class="hero__lead lead reveal">
          Pilons, blancs et poulets entiers <strong>braisés à la commande</strong> — jamais frits —
          et la <strong>sauce verte maison</strong> qui fait revenir tout le quartier.
        </p>

        <div class="hero__actions reveal">
          <NuxtLink to="/commander" class="btn btn--ember btn--lg">Commander</NuxtLink>
          <NuxtLink to="/menu" class="btn btn--ghost btn--lg">Voir le menu</NuxtLink>
        </div>

        <p class="hero__rating reveal">
          <strong>4,9★</strong> · {{ business.rating.count }} avis Google &amp; Uber Eats —
          le poulet le mieux noté de Villejuif.
        </p>
      </div>

      <p class="hero__hint" aria-hidden="true">Maintenez le titre pour souffler sur la braise</p>
    </section>

    <!-- ——— LA BRAISE (histoire) ——— -->
    <section ref="braiseSection" class="section braise" aria-labelledby="braise-title">
      <div class="wrap braise__grid">
        <div>
          <p class="kicker">La braise</p>
          <SplitLines>
            <h2 id="braise-title" class="h-lg">Mariné la veille. Braisé à la minute.</h2>
          </SplitLines>
          <p class="lead reveal">
            Depuis 2020, au 93 rue Jean Jaurès, on fait une seule chose et on la fait bien :
            du <strong>poulet halal braisé sur la braise</strong>, mariné maison, caramélisé à la commande.
            Pas de friteuse, pas de réchauffé — la peau dorée et la chair fondante, c'est le feu qui s'en charge.
          </p>
          <p class="lead reveal">
            C'est plus long qu'un fast-food classique. C'est aussi pour ça que c'est meilleur.
          </p>
        </div>
        <div class="braise__img reveal">
          <EmberImage name="brochettes" alt="Poulet mariné en cuisson sur la braise, fumée et flammes" sizes="(max-width: 900px) 100vw, 46vw" />
        </div>
      </div>
    </section>

    <!-- ——— LE MENU (aperçu) ——— -->
    <section ref="menuSection" class="section home-menu" aria-labelledby="menu-title">
      <div class="wrap">
        <p class="kicker">Le menu</p>
        <div class="home-menu__head">
          <SplitLines>
            <h2 id="menu-title" class="h-lg">Ce qui sort de la braise</h2>
          </SplitLines>
          <NuxtLink to="/menu" class="btn btn--ghost">Toute la carte</NuxtLink>
        </div>

        <div class="home-menu__grid">
          <MenuCard v-for="item in featured" :key="item.id" :item="item" class="reveal" />
        </div>
      </div>
    </section>

    <!-- ——— LA SAUCE VERTE (set piece typographique) ——— -->
    <section ref="sauceSection" class="section sauce" aria-labelledby="sauce-title">
      <div class="wrap sauce__in stack">
        <p class="kicker sauce__kicker">La signature</p>
        <!-- pas de SplitLines ici : les enfants transformés cassent background-clip:text (Chromium) -->
        <h2 id="sauce-title" class="sauce__title h-xl reveal">La sauce verte. On ne donne pas la recette.</h2>
        <p class="lead reveal sauce__lead">
          Herbes fraîches, ail, piment doux — montée chaque matin sur place. C'est l'ingrédient
          que les avis citent le plus, et le seul dont on ne parlera pas davantage.
        </p>
      </div>
    </section>

    <!-- ——— LES AVIS ——— -->
    <section class="section avis-band" aria-labelledby="avis-title">
      <div class="wrap">
        <p class="kicker">Les avis</p>
        <h2 id="avis-title" class="h-lg">4,9★ — et on compte<br />sur vous pour la suite</h2>
      </div>
      <MarqueeBand class="avis-band__marquee" :speed="34">
        <span v-for="t in reviewThemes" :key="t" class="avis-band__item">{{ t }} <em aria-hidden="true">★</em> </span>
      </MarqueeBand>
      <div class="wrap avis-band__cta">
        <p class="lead">
          Plus de <strong>{{ business.rating.count }} avis</strong> entre Google et Uber Eats,
          sans une seule fausse note. Vous êtes déjà venus ? Deux phrases suffisent.
        </p>
        <NuxtLink to="/avis" class="btn btn--ember">Laisser un avis Google</NuxtLink>
      </div>
    </section>

    <!-- ——— LE QUARTIER ——— -->
    <section class="section quartier" aria-labelledby="quartier-title">
      <div class="wrap quartier__grid">
        <div>
          <p class="kicker">Le quartier</p>
          <SplitLines>
            <h2 id="quartier-title" class="h-lg">À Villejuif, entre Gustave-Roussy et la mairie</h2>
          </SplitLines>
          <p class="lead reveal">
            Au <strong>93 rue Jean Jaurès</strong>, à quelques minutes de l'Institut Gustave-Roussy,
            du métro 7 Louis-Aragon et de la ligne 14 Villejuif – Gustave-Roussy.
            Sur place, à emporter ou livré — et les <strong>titres-restaurant sont acceptés</strong>
            (Ticket Restaurant, Swile, Pluxee).
          </p>
          <div class="quartier__actions reveal">
            <a :href="business.links.googleMaps" target="_blank" rel="noopener" class="btn btn--ghost">Itinéraire</a>
            <a :href="`tel:${business.phone}`" class="btn btn--ghost">{{ business.phoneDisplay }}</a>
          </div>
        </div>
        <div class="quartier__img reveal">
          <EmberImage name="poulet-entier" alt="Poulets entiers dorés en rôtissoire sur la braise" sizes="(max-width: 900px) 100vw, 46vw" />
        </div>
      </div>
    </section>

    <!-- ——— COMMANDER ——— -->
    <section ref="commanderSection" class="section commander-cta" aria-labelledby="commander-title">
      <div class="wrap commander-cta__in stack">
        <SplitLines>
          <h2 id="commander-title" class="h-xl">On allume<br />la braise ?</h2>
        </SplitLines>
        <p class="lead reveal">
          Appelez pour le à-emporter — c'est prêt en 15 minutes — ou faites-vous livrer.
        </p>
        <div class="commander-cta__actions reveal">
          <a :href="`tel:${business.phone}`" class="btn btn--ember btn--lg">Appeler · {{ business.phoneDisplay }}</a>
          <NuxtLink to="/commander" class="btn btn--ghost btn--lg">Livraison &amp; click&nbsp;&amp;&nbsp;collect</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ——— hero ——— */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: clip;
}

.hero__bg {
  position: absolute;
  inset: -8% 0;
  z-index: 0;
}

.hero__bg :deep(picture),
.hero__bg :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--char) 45%, transparent), color-mix(in srgb, var(--char) 12%, transparent) 45%, var(--char) 98%),
    radial-gradient(80% 55% at 28% 72%, color-mix(in srgb, var(--char) 42%, transparent), transparent);
}

.hero__in {
  position: relative;
  z-index: 1;
  padding-block: 8rem 5rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.9rem;
  justify-items: start;
}

.hero__chip {
  margin: 0;
}

.hero__title {
  cursor: pointer;
  touch-action: manipulation;
}

.hero__lead {
  max-width: min(30em, 100%);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
}

.hero__rating {
  color: var(--smoke);
  font-size: 0.9375rem;
  margin: 0;
}

.hero__rating strong {
  color: var(--glow);
  font-size: 1.1rem;
}

.hero__hint {
  position: absolute;
  bottom: 1.2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--smoke) 75%, transparent);
  white-space: nowrap;
}

@media (pointer: coarse) {
  .hero__hint { display: none; }
}

/* ——— braise ——— */
.braise__grid,
.quartier__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.braise__img,
.quartier__img {
  border-radius: 1.5rem;
  overflow: clip;
  aspect-ratio: 4 / 5;
}

.braise__img :deep(picture),
.braise__img :deep(img),
.quartier__img :deep(picture),
.quartier__img :deep(img) {
  width: 100%;
  height: 112%;
  object-fit: cover;
}

@media (max-width: 900px) {
  .braise__grid,
  .quartier__grid {
    grid-template-columns: 1fr;
  }
  .braise__img,
  .quartier__img {
    aspect-ratio: 3 / 2;
    order: -1;
  }
}

/* ——— menu preview ——— */
.home-menu__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.6rem;
}

.home-menu__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.4rem;
}

/* ——— sauce verte ——— */
.sauce {
  text-align: center;
}

.sauce__in {
  display: grid;
  justify-items: center;
  gap: 1.6rem;
}

.sauce__kicker {
  color: var(--sauce-bright);
}

.sauce__kicker::before {
  background: var(--sauce-bright);
}

.sauce__title {
  background-image: linear-gradient(120deg, var(--sauce-bright), var(--creme) 60%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  max-width: min(11em, 100%);
}

.sauce__lead {
  margin-inline: auto;
  max-width: min(34em, 100%);
}

/* ——— avis ——— */
.avis-band__marquee {
  margin-block: 2.8rem;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 3rem);
  text-transform: uppercase;
  color: color-mix(in srgb, var(--creme) 88%, transparent);
}

.avis-band__item {
  padding-inline: 1.2rem;
}

.avis-band__item em {
  color: var(--ember);
  font-style: normal;
  padding-left: 1.2rem;
}

.avis-band__cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

/* ——— quartier ——— */
.quartier__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 1.6rem;
}

/* ——— commander ——— */
.commander-cta {
  text-align: center;
  padding-block: clamp(6rem, 14vw, 11rem);
}

.commander-cta__in {
  display: grid;
  justify-items: center;
  gap: 1.8rem;
}

.commander-cta__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.9rem;
}
</style>
