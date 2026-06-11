<script setup lang="ts">
import { formatPrice, type MenuItem } from '~/data/menu'

defineProps<{ item: MenuItem }>()
</script>

<template>
  <article class="card menu-card">
    <div v-if="item.image" class="menu-card__media">
      <EmberImage :name="item.image" :alt="item.name" sizes="(max-width: 720px) 100vw, 33vw" />
    </div>
    <div class="menu-card__body">
      <header class="menu-card__head">
        <h3 class="menu-card__name">{{ item.name }}</h3>
        <span class="menu-card__price">{{ formatPrice(item.price) }}</span>
      </header>
      <p class="menu-card__desc">{{ item.description }}</p>
      <p v-if="item.badges?.length" class="menu-card__badges">
        <span
          v-for="b in item.badges"
          :key="b"
          class="badge"
          :class="b === 'sauce verte' ? 'badge--sauce' : 'badge--glow'"
        >{{ b }}</span>
      </p>
      <p v-if="item.allergens" class="menu-card__allergens">{{ item.allergens }}</p>
    </div>
  </article>
</template>

<style scoped>
.menu-card {
  display: flex;
  flex-direction: column;
}

.menu-card__media {
  aspect-ratio: 3 / 2;
}

.menu-card__media :deep(picture),
.menu-card__media :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.menu-card__body {
  padding: 1.4rem 1.5rem 1.5rem;
  display: grid;
  gap: 0.6rem;
}

.menu-card__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.menu-card__name {
  font-size: 1.35rem;
  letter-spacing: 0.02em;
}

.menu-card__price {
  font-weight: 600;
  color: var(--glow);
  white-space: nowrap;
}

.menu-card__desc {
  color: var(--smoke);
  font-size: 0.9375rem;
  margin: 0;
}

.menu-card__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
}

.menu-card__allergens {
  font-size: 0.78rem;
  color: color-mix(in srgb, var(--smoke) 80%, transparent);
  margin: 0;
}
</style>
