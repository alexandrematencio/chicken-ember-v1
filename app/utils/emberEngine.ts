import { emberBus } from '~/utils/emberBus'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  hue: number
}

/**
 * Hand-rolled 2D-canvas ember field (~3 KB) — rising sparks with additive glow.
 * Density adapts to viewport + device; reacts to scroll velocity and the
 * hold-to-ignite flare. Pauses when the tab is hidden. No dependencies.
 */
export function createEmberEngine(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d', { alpha: true })!
  let w = 0
  let h = 0
  let dpr = 1
  let particles: Particle[] = []
  let running = true
  let rafId = 0

  const lowEnd =
    (navigator.hardwareConcurrency || 8) <= 4 ||
    // @ts-expect-error non-standard
    (navigator.deviceMemory && navigator.deviceMemory <= 4)

  const baseCount = () => {
    const areaFactor = (w * h) / (1280 * 800)
    return Math.round(Math.min(110, Math.max(36, 80 * areaFactor)) * (lowEnd ? 0.5 : 1))
  }

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, lowEnd ? 1 : 1.5)
    w = window.innerWidth
    h = window.innerHeight
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const spawn = (p?: Particle): Particle => {
    const np: Particle = p ?? ({} as Particle)
    np.x = Math.random() * w
    np.y = h + 10 + Math.random() * 40
    np.vx = (Math.random() - 0.5) * 0.35
    np.vy = -(0.35 + Math.random() * 0.85)
    np.size = 0.7 + Math.random() * 1.9
    np.maxLife = 240 + Math.random() * 260
    np.life = np.maxLife * Math.random() * 0.3
    np.hue = 16 + Math.random() * 26 // ember orange → amber
    return np
  }

  const tick = () => {
    if (!running) return
    rafId = requestAnimationFrame(tick)

    const flare = emberBus.flare
    const wind = Math.max(-1, Math.min(1, emberBus.velocity / 40))
    emberBus.velocity *= 0.94

    const target = Math.round(baseCount() * (1 + flare * 1.6))
    while (particles.length < target) particles.push(spawn())
    if (particles.length > target + 30) particles.length = target + 30

    ctx.clearRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'

    for (const p of particles) {
      p.life += 1 + flare * 1.2
      if (p.life >= p.maxLife || p.y < -12) {
        spawn(p)
        continue
      }
      const t = p.life / p.maxLife
      p.x += p.vx + Math.sin((p.life + p.y) * 0.012) * 0.3 + wind * 1.4
      p.y += p.vy * (1 + flare * 1.8) - Math.abs(wind) * 0.4

      const flicker = 0.75 + Math.sin(p.life * 0.15 + p.x) * 0.25
      const alpha = Math.sin(Math.PI * Math.min(1, t)) * 0.5 * flicker * (0.55 + flare * 0.45)
      const size = p.size * (1 + flare * 0.5)

      ctx.beginPath()
      ctx.fillStyle = `hsla(${p.hue + flare * 8}, 100%, ${58 + flare * 10}%, ${alpha.toFixed(3)})`
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const onVisibility = () => {
    running = document.visibilityState === 'visible'
    if (running) tick()
    else cancelAnimationFrame(rafId)
  }

  resize()
  window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', onVisibility)
  tick()

  return {
    destroy() {
      running = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      particles = []
    },
  }
}
