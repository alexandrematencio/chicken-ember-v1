<script setup lang="ts">
withDefaults(defineProps<{ speed?: number }>(), { speed: 26 })
</script>

<template>
  <div class="marquee" :style="{ '--marquee-speed': `${speed}s` }">
    <div class="marquee__track" aria-hidden="false"><slot /></div>
    <div class="marquee__track" aria-hidden="true"><slot /></div>
  </div>
</template>
