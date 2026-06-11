<script setup lang="ts">
const { label, open } = useOpenStatus()
</script>

<template>
  <span class="chip" :data-open="open === null ? 'unknown' : open">
    <span class="chip__dot" aria-hidden="true" />
    {{ label }}
  </span>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--creme) 16%, transparent);
  background: color-mix(in srgb, var(--char) 55%, transparent);
  backdrop-filter: blur(8px);
}

.chip__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--glow);
  box-shadow: 0 0 10px var(--glow);
}

.chip[data-open='true'] .chip__dot {
  background: var(--sauce-bright);
  box-shadow: 0 0 10px var(--sauce-bright);
}

.chip[data-open='false'] .chip__dot {
  background: var(--smoke);
  box-shadow: none;
}
</style>
