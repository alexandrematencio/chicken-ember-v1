import { business } from '~/data/business'
import { menuSections } from '~/data/menu'

const addr = {
  '@type': 'PostalAddress',
  streetAddress: business.address.street,
  postalCode: business.address.postalCode,
  addressLocality: business.address.city,
  addressCountry: business.address.country,
}

/**
 * Restaurant entity. NOTE: no aggregateRating on purpose — self-serving review
 * markup is excluded from rich results and marking up Google-sourced ratings
 * violates the guidelines. The 4,9★ is displayed visually only.
 */
export function restaurantJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${business.url}/#restaurant`,
    name: business.name,
    description: business.description,
    url: business.url,
    image: [`${business.url}/og.jpg`],
    telephone: business.phone,
    address: addr,
    geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
    servesCuisine: ['Poulet braisé', 'Halal', 'Fast food'],
    priceRange: '€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Espèces, Carte bancaire, Titres-restaurant',
    acceptsReservations: false,
    hasMenu: `${business.url}/menu`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: business.hours.opens,
        closes: business.hours.closes,
      },
    ],
    sameAs: [business.links.uberEats, business.links.deliveroo].filter(Boolean),
  }
}

export function menuJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${business.url}/menu#menu`,
    name: 'Carte Chicken Ember',
    inLanguage: 'fr',
    hasMenuSection: menuSections.map((s) => ({
      '@type': 'MenuSection',
      name: s.title,
      hasMenuItem: s.items.map((i) => ({
        '@type': 'MenuItem',
        name: i.name,
        description: i.description,
        offers: {
          '@type': 'Offer',
          price: i.price.toFixed(2),
          priceCurrency: 'EUR',
        },
      })),
    })),
  }
}

export function useJsonLd(payload: () => Record<string, unknown>) {
  useHead({
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(payload()) }],
  })
}
