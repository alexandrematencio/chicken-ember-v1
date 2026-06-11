# chickenember.fr — site vitrine Chicken Ember

Nuxt 4 SSG · GSAP + ScrollTrigger · Lenis (desktop) · canvas embers maison (~3 KB, lazy).
Voir `creative-brief.md` (direction créative) et `../WEBSITE-BUILD-ASSESSMENT.md` (stratégie complète).

## Commandes

```bash
npm run dev        # dev server
npm run generate   # build statique → .output/public
npx serve .output/public   # préview du build
npm run deploy    # déploie sur GitHub Pages (gh-pages branch, méthode SALUTE)
```

## Architecture

- `app/data/menu.ts` — **menu canonique** (source unique : cartes visibles + JSON-LD Menu)
- `app/data/business.ts` — NAP, horaires, liens plateformes, thèmes d'avis
- `app/utils/jsonld.ts` — schémas Restaurant + Menu (PAS d'aggregateRating : politique Google)
- `app/utils/emberEngine.ts` — champ de braises canvas 2D, chargé post-LCP sur idle
- `app/composables/useIgnite.ts` — interaction signature « souffler sur la braise » (press-and-hold)
- `app/composables/useSectionHeat.ts` — narration thermique (fond qui chauffe en scrollant)
- Motion : contenu visible par défaut ; états cachés `.reveal` uniquement sous `html.js-anim`
  (posé avant le premier paint, jamais si `prefers-reduced-motion`)

## Budget perf (vérifié au build)

- JS critique ≈ 132 KB gz (GSAP inclus) — budget 150 KB
- Images AVIF/WebP + variantes 900w + LQIP inline (`scripts/optimize-images.mjs`)
- Fonts woff2 self-hosted préchargées (Anton 400, Archivo 400/600)
- Tout le contenu (menu, NAP, schémas) présent dans le HTML prérendu sans JS

## ⚠️ TODO avant mise en production (inputs client)

1. **Photos** : stock provisoire (crédits : `public/img/CREDITS.md`) → remplacer par le shooting pro
2. **Prix** : items `provisional: true` dans `app/data/menu.ts` à confirmer
3. **Lien avis Google** : remplacer par `https://search.google.com/local/writereview?placeid=<PLACE_ID>` dans `business.ts`
4. **Géolocalisation** : vérifier lat/lng exactes dans `business.ts`
5. **Hébergeur** : compléter `mentions-legales.vue`
6. **Réseaux sociaux** : renseigner `links.instagram` / `links.tiktok` à la création des comptes
7. **Analytics** : brancher Plausible ou Matomo exempté CNIL (pas de GA4 → pas de bandeau cookies)
8. **Domaines** : réserver chickenember.fr + chicken-ember.fr (redirection 301)
9. **GBP** : renseigner le site + lien menu sur la fiche Google (`?utm_source=gbp`)
