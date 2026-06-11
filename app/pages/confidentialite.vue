<script setup lang="ts">
import { business } from '~/data/business'

useSeoMeta({
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité du site chickenember.fr.',
  robots: 'noindex, follow',
})
useHead({ link: [{ rel: 'canonical', href: `${business.url}/confidentialite` }] })
</script>

<template>
  <div class="legal-page">
    <section class="section legal">
      <div class="wrap legal__in">
        <h1 class="h-lg">Confidentialité</h1>

        <h2 class="h-md">Pas de cookies, pas de traceurs</h2>
        <p>
          Ce site ne dépose <strong>aucun cookie</strong> et n'utilise aucun traceur publicitaire.
          La mesure d'audience, si elle est activée, est réalisée avec un outil sans cookie
          et sans donnée personnelle (statistiques agrégées uniquement), exempté de consentement
          au sens des recommandations de la CNIL.
        </p>

        <h2 class="h-md">Données personnelles</h2>
        <p>
          Aucune donnée personnelle n'est collectée via ce site. Si vous nous appelez ou commandez
          via une plateforme de livraison (Uber Eats, Deliveroo), leurs politiques de confidentialité
          respectives s'appliquent.
        </p>

        <h2 class="h-md">Contact</h2>
        <p>
          Pour toute question : {{ business.name }}, {{ business.address.street }},
          {{ business.address.postalCode }} {{ business.address.city }} —
          <a :href="`tel:${business.phone}`" class="link-draw">{{ business.phoneDisplay }}</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.legal {
  padding-top: 9rem;
}

.legal__in {
  max-width: 46em;
  display: grid;
  gap: 1rem;
}

.legal__in .h-md {
  margin-top: 1.5rem;
}

.legal__in p {
  color: var(--smoke);
}
</style>
