import { business } from '~/data/business'

/**
 * Live open/closed status. SSR renders the neutral form (« 7j/7 · 11h–22h30 »)
 * and the live form replaces it after hydration — no mismatch, no CLS.
 */
export function useOpenStatus() {
  const label = ref('Ouvert 7j/7 · 11h00 – 22h30')
  const open = ref<boolean | null>(null)

  const compute = () => {
    const now = new Date()
    const [oh, om] = business.hours.opens.split(':').map(Number)
    const [ch, cm] = business.hours.closes.split(':').map(Number)
    const mins = now.getHours() * 60 + now.getMinutes()
    const isOpen = mins >= oh! * 60 + om! && mins < ch! * 60 + cm!
    open.value = isOpen
    label.value = isOpen ? 'Ouvert · jusqu’à 22h30' : 'Fermé · ouvre à 11h00'
  }

  onMounted(() => {
    compute()
    const id = setInterval(compute, 60_000)
    onBeforeUnmount(() => clearInterval(id))
  })

  return { label, open }
}
