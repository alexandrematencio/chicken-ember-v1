import type { gsap as Gsap } from 'gsap'
import type { ScrollTrigger as ST } from 'gsap/ScrollTrigger'

export function useGsap() {
  const { $gsap, $ScrollTrigger } = useNuxtApp()
  return {
    gsap: $gsap as typeof Gsap,
    ScrollTrigger: $ScrollTrigger as typeof ST,
  }
}

/** Runs `fn` inside a gsap.context bound to `scope` on mount; reverts on unmount. */
export function useGsapContext(scope: Ref<HTMLElement | null | undefined>, fn: (gsap: typeof Gsap) => void) {
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let ctx: ReturnType<typeof Gsap.context> | undefined
  onMounted(() => {
    if (reduced() || !scope.value) return
    const { gsap } = useGsap()
    ctx = gsap.context(() => fn(gsap), scope.value)
  })
  onBeforeUnmount(() => ctx?.revert())
}
