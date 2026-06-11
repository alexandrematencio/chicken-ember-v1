import { emberBus } from '~/utils/emberBus'

let started = false

/**
 * Smooth scroll: Lenis on fine-pointer desktop only, lazy-loaded after idle.
 * Touch devices keep native scroll (INP first). Also writes --app-scroll and ember velocity.
 */
export function useSmoothScroll() {
  if (import.meta.server || started) return
  started = true

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const finePointer = window.matchMedia('(pointer: fine)').matches

  // progress var + velocity from native scroll (works in every tier)
  let lastY = window.scrollY
  let raf = 0
  const onScroll = () => {
    if (raf) return
    raf = requestAnimationFrame(() => {
      raf = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      document.documentElement.style.setProperty('--app-scroll', String(max > 0 ? y / max : 0))
      emberBus.velocity = emberBus.velocity * 0.8 + (y - lastY) * 0.2
      lastY = y
    })
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  if (reduced || !finePointer) return

  const start = async () => {
    const [{ default: Lenis }, { ScrollTrigger }] = await Promise.all([
      import('lenis'),
      import('gsap/ScrollTrigger'),
    ])
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 })
    lenis.on('scroll', ScrollTrigger.update)
    const loop = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
  }

  if ('requestIdleCallback' in window) requestIdleCallback(() => start(), { timeout: 2500 })
  else setTimeout(start, 1200)
}
