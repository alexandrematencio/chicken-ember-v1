<script setup lang="ts">
/**
 * Fixed full-viewport ember field behind all content.
 * Tiered: canvas engine (capable devices) → static CSS glow (always present underneath).
 * Loaded after idle, skipped on reduced-motion / save-data.
 */
const canvas = ref<HTMLCanvasElement | null>(null)
let engine: { destroy: () => void } | undefined

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // @ts-expect-error non-standard
  const saveData = navigator.connection?.saveData === true
  if (reduced || saveData) return

  const boot = async () => {
    if (!canvas.value) return
    const { createEmberEngine } = await import('~/utils/emberEngine')
    engine = createEmberEngine(canvas.value)
    canvas.value.classList.add('is-live')
  }
  if ('requestIdleCallback' in window) requestIdleCallback(() => boot(), { timeout: 3000 })
  else setTimeout(boot, 1500)
})

onBeforeUnmount(() => engine?.destroy())
</script>

<template>
  <div class="ember-layer" aria-hidden="true">
    <canvas ref="canvas" class="ember-layer__canvas" />
  </div>
</template>

<style scoped>
.ember-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  /* static glow tier — present in every tier, intensifies via --app-scroll */
  background:
    radial-gradient(120% 60% at 50% 108%, color-mix(in srgb, var(--ember) calc(7% + var(--app-scroll, 0) * 9%), transparent), transparent 70%);
}

.ember-layer__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1.2s ease;
}

.ember-layer__canvas.is-live {
  opacity: 1;
}
</style>
