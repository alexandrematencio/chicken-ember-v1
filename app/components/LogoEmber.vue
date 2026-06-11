<template>
  <svg viewBox="0 0 232 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo" role="img" aria-label="Chicken Ember">
    <text x="0" y="22" class="logo__text">CHICKEN</text>
    <text x="108" y="22" class="logo__text logo__text--ember">EMBER</text>
    <circle cx="222" cy="8" r="3.2" class="logo__spark" />
  </svg>
</template>

<style scoped>
.logo {
  height: 1.5rem;
  width: auto;
  display: block;
}

.logo__text {
  font-family: var(--font-display);
  font-size: 26px;
  letter-spacing: 0.02em;
  fill: var(--creme);
}

.logo__text--ember {
  fill: var(--ember);
}

.logo__spark {
  fill: var(--glow);
  animation: spark 2.8s ease-in-out infinite;
  transform-origin: 222px 8px;
}

@keyframes spark {
  0%, 100% { opacity: 0.55; transform: scale(0.85); }
  50% { opacity: 1; transform: scale(1.15); }
}

@media (prefers-reduced-motion: reduce) {
  .logo__spark { animation: none; }
}
</style>
