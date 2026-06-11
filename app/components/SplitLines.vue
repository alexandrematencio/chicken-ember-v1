<script setup lang="ts">
/**
 * Splits the slotted block's text into masked lines and reveals them on scroll.
 * SSR renders plain text (SEO-complete); splitting happens after mount;
 * reverts to original markup on resize and on reduced-motion.
 */
const props = withDefaults(defineProps<{ delay?: number; stagger?: number; duration?: number }>(), {
  delay: 0,
  stagger: 0.08,
  duration: 0.8,
})

const root = ref<HTMLElement | null>(null)
let original = ''
let reverted = false

onMounted(() => {
  const host = root.value?.firstElementChild as HTMLElement | null
  if (!host) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  original = host.innerHTML
  const { gsap } = useGsap()

  // wrap words, group into lines by offsetTop (<br> counts as whitespace)
  const text = host.innerHTML.replace(/<br[^>]*>/gi, ' ').replace(/<[^>]+>/g, ' ')
  const words = text.split(/\s+/).filter(Boolean)
  host.innerHTML = words.map((wd) => `<span class="sw" style="display:inline-block">${wd}</span>`).join(' ')
  const spans = Array.from(host.querySelectorAll<HTMLElement>('.sw'))
  const lines: HTMLElement[][] = []
  let top: number | null = null
  for (const s of spans) {
    if (s.offsetTop !== top) {
      lines.push([])
      top = s.offsetTop
    }
    lines[lines.length - 1]!.push(s)
  }
  host.innerHTML = ''
  const inners: HTMLElement[] = []
  for (const line of lines) {
    const mask = document.createElement('span')
    mask.className = 'split-line'
    const inner = document.createElement('span')
    inner.className = 'split-inner'
    inner.textContent = line.map((s) => s.textContent).join(' ')
    mask.appendChild(inner)
    host.appendChild(mask)
    inners.push(inner)
  }

  gsap.from(inners, {
    yPercent: 112,
    duration: props.duration,
    delay: props.delay,
    stagger: props.stagger,
    ease: 'power3.out',
    scrollTrigger: { trigger: host, start: 'top 88%' },
  })

  // restore natural reflow on resize (lines were frozen at mount layout)
  let tid: ReturnType<typeof setTimeout>
  const onResize = () => {
    clearTimeout(tid)
    tid = setTimeout(() => {
      if (reverted) return
      reverted = true
      host.innerHTML = original
    }, 200)
  }
  window.addEventListener('resize', onResize, { once: false })
  onBeforeUnmount(() => window.removeEventListener('resize', onResize))
})
</script>

<template>
  <div ref="root" class="split-root">
    <slot />
  </div>
</template>
