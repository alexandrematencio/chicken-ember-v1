import { emberBus } from '~/utils/emberBus'

/**
 * « Souffler sur la braise » — press-and-hold fans the coals.
 * Drives the element's --ignite custom property 0→1 while held; the ember
 * canvas flares with it. Keyboard accessible (Enter/Space pulse).
 */
export function useIgnite(el: Ref<HTMLElement | null | undefined>) {
  let tween: { kill: () => void } | undefined

  const ramp = (to: number, dur: number) => {
    const { gsap } = useGsap()
    const node = el.value
    if (!node) return
    tween?.kill()
    const state = { v: Number(getComputedStyle(node).getPropertyValue('--ignite')) || 0 }
    tween = gsap.to(state, {
      v: to,
      duration: dur,
      ease: to > 0 ? 'power2.out' : 'power2.inOut',
      onUpdate: () => {
        node.style.setProperty('--ignite', state.v.toFixed(3))
        emberBus.flare = state.v
      },
    })
  }

  const down = (e: PointerEvent) => {
    if (e.button !== undefined && e.button !== 0) return
    ramp(1, 1.1)
  }
  const up = () => ramp(0, 1.6)
  const key = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      ramp(1, 0.9)
      setTimeout(up, 1200)
    }
  }

  onMounted(() => {
    const node = el.value
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.style.setProperty('--ignite', '1')
      return
    }
    node.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    node.addEventListener('keydown', key)
  })

  onBeforeUnmount(() => {
    const node = el.value
    window.removeEventListener('pointerup', up)
    window.removeEventListener('pointercancel', up)
    node?.removeEventListener('pointerdown', down)
    node?.removeEventListener('keydown', key)
    tween?.kill()
  })
}
