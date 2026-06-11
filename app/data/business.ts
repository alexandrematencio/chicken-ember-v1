export const business = {
  name: 'Chicken Ember',
  legalName: 'WAIL (SAS)',
  siret: '891 370 595 00011',
  description:
    'Poulet braisé halal à Villejuif : pilons, blancs, poulets entiers braisés à la commande, sauces maison et desserts. Sur place, à emporter et en livraison.',
  address: {
    street: '93 Rue Jean Jaurès',
    postalCode: '94800',
    city: 'Villejuif',
    country: 'FR',
  },
  phone: '+33143909691',
  phoneDisplay: '01 43 90 96 91',
  url: 'https://chickenember.fr',
  // 7j/7
  hours: { opens: '11:00', closes: '22:30' },
  geo: { lat: 48.7944, lng: 2.3636 }, // 93 rue Jean Jaurès, Villejuif (approx — verify before prod)
  rating: { value: 4.9, count: 226, note: '141 avis Google + 85 notes Uber Eats' },
  links: {
    uberEats: 'https://www.ubereats.com/fr/store/chicken-ember/kqDGpYDqXSaM_vAS3XXF0g',
    deliveroo: 'https://deliveroo.fr/fr/menu/paris/villejuif-centre/chicken-ember',
    googleMaps: 'https://www.google.com/maps/search/?api=1&query=Chicken+Ember+93+Rue+Jean+Jaur%C3%A8s+94800+Villejuif',
    // TODO(client): remplacer par le lien direct "writereview" avec le place_id GBP
    googleReview: 'https://www.google.com/maps/search/?api=1&query=Chicken+Ember+Villejuif',
    instagram: null as string | null, // TODO: lier dès la création du compte
    tiktok: null as string | null,
  },
  mealVouchers: ['Ticket Restaurant', 'Swile', 'Pluxee'],
}

/** Thèmes récurrents des avis (paraphrases de l'audit — pas de faux témoignages nominatifs). */
export const reviewThemes = [
  'Le poulet braisé est tendre, fondant, jamais sec',
  'La sauce verte maison fait revenir les clients',
  'Des sandwichs généreusement garnis',
  'Un accueil chaleureux, un service efficace',
  'Un rapport qualité-prix qui défie la concurrence',
  'Une qualité constante depuis 2020',
]
