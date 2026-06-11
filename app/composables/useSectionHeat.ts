/**
 * Heat narrative: when `el` crosses the viewport center, the body takes its
 * heat theme (char → coal → ember → sauce), shifting the page background.
 */
export function useSectionHeat(el: Ref<HTMLElement | null | undefined>, heat: string, fallback = 'char') {
  onMounted(() => {
    if (!el.value) return
    const { ScrollTrigger } = useGsap()
    const set = (h: string) => {
      document.body.dataset.heat = h
    }
    const st = ScrollTrigger.create({
      trigger: el.value,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => set(heat),
      onEnterBack: () => set(heat),
      onLeaveBack: () => set(fallback),
    })
    onBeforeUnmount(() => st.kill())
  })
}
