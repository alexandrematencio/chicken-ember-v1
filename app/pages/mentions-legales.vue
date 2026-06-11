<script setup lang="ts">
import { business } from '~/data/business'

useSeoMeta({
  title: 'Mentions légales',
  description: 'Mentions légales du site chickenember.fr.',
  robots: 'noindex, follow',
})
useHead({ link: [{ rel: 'canonical', href: `${business.url}/mentions-legales` }] })
</script>

<template>
  <div class="legal-page">
    <section class="section legal">
      <div class="wrap legal__in">
        <h1 class="h-lg">Mentions légales</h1>

        <h2 class="h-md">Éditeur du site</h2>
        <p>
          {{ business.legalName }} — nom commercial « {{ business.name }} »<br />
          {{ business.address.street }}, {{ business.address.postalCode }} {{ business.address.city }}<br />
          SIRET : {{ business.siret }}<br />
          Téléphone : <a :href="`tel:${business.phone}`" class="link-draw">{{ business.phoneDisplay }}</a>
        </p>

        <h2 class="h-md">Directeur de la publication</h2>
        <p>Le représentant légal de {{ business.legalName }}.</p>

        <h2 class="h-md">Hébergement</h2>
        <p>
          <!-- TODO(client): compléter selon l'hébergeur retenu (ex. Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA) -->
          À compléter lors de la mise en production.
        </p>

        <h2 class="h-md">Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus de ce site (textes, visuels, logo) est la propriété de
          {{ business.legalName }} ou de ses concédants et ne peut être reproduit sans autorisation.
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
