<script setup lang="ts">
import meta from '~/assets/img-meta.json'

const props = withDefaults(
  defineProps<{
    name: keyof typeof meta | string
    alt: string
    /** hero/LCP images: eager + high priority */
    eager?: boolean
    sizes?: string
  }>(),
  { eager: false, sizes: '100vw' },
)

const m = computed(() => (meta as Record<string, { width: number; height: number; lqip: string }>)[props.name])
const hasMobile = computed(() => m.value && m.value.width > 1500)

const avifSrcset = computed(() =>
  hasMobile.value ? `/img/${props.name}-900.avif 900w, /img/${props.name}.avif ${m.value.width}w` : `/img/${props.name}.avif`,
)
const webpSrcset = computed(() =>
  hasMobile.value ? `/img/${props.name}-900.webp 900w, /img/${props.name}.webp ${m.value.width}w` : `/img/${props.name}.webp`,
)
</script>

<template>
  <picture v-if="m" class="lazy-img" :style="{ backgroundImage: `url(${m.lqip})` }">
    <source type="image/avif" :srcset="avifSrcset" :sizes="sizes" />
    <source type="image/webp" :srcset="webpSrcset" :sizes="sizes" />
    <img
      :src="`/img/${name}.webp`"
      :alt="alt"
      :width="m.width"
      :height="m.height"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      decoding="async"
    />
  </picture>
</template>

<style scoped>
.lazy-img {
  display: block;
  background-size: cover;
  background-position: center;
  overflow: clip;
}

.lazy-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
