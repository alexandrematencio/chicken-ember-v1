/**
 * Menu canonique — source unique de vérité (cartes visibles + JSON-LD).
 * Prix sourcés de l'audit Uber Eats (2026-06) : poulet entier 10,30 € ;
 * sandwich poulet braisé 7,50 € ; menu solo 7,00 € ; ailes 6,50 €.
 * Les prix marqués `provisional: true` sont à confirmer avec le client avant mise en ligne.
 */

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  provisional?: boolean
  image?: string
  badges?: string[]
  allergens?: string
}

export interface MenuSection {
  id: string
  title: string
  intro?: string
  items: MenuItem[]
}

export const menuSections: MenuSection[] = [
  {
    id: 'poulet-braise',
    title: 'Le poulet braisé',
    intro: 'Braisé à la commande sur la braise, mariné maison. Jamais frit, jamais réchauffé.',
    items: [
      {
        id: 'poulet-entier',
        name: 'Poulet entier braisé',
        description: 'Le poulet entier mariné et braisé, à partager (ou pas). Servi avec sauce maison au choix.',
        price: 10.3,
        image: 'poulet-entier',
        badges: ['halal'],
        allergens: 'Peut contenir : moutarde, céleri (sauces).',
      },
      {
        id: 'demi-poulet',
        name: 'Demi-poulet braisé',
        description: 'La moitié du poulet braisé, peau dorée, chair fondante, sauce maison au choix.',
        price: 6.5,
        provisional: true,
        image: 'poulet-roti',
        badges: ['halal'],
        allergens: 'Peut contenir : moutarde, céleri (sauces).',
      },
      {
        id: 'pilons',
        name: 'Pilons de poulet (x4)',
        description: 'Pilons marinés puis braisés, caramélisés sur la braise.',
        price: 6.5,
        provisional: true,
        image: 'pilons-ailes',
        badges: ['halal'],
      },
      {
        id: 'blanc',
        name: 'Blanc de poulet braisé',
        description: 'Filet entier mariné, braisé et tranché. Le plus léger de la carte.',
        price: 7.0,
        provisional: true,
        image: 'blanc-poulet',
        badges: ['halal'],
      },
      {
        id: 'ailes',
        name: 'Ailes de poulet braisées (x6)',
        description: 'Ailes braisées laquées, à la sauce poivre ou sauce verte.',
        price: 6.5,
        image: 'brochettes',
        badges: ['halal'],
      },
    ],
  },
  {
    id: 'sandwichs-menus',
    title: 'Sandwichs & menus',
    items: [
      {
        id: 'sandwich-braise',
        name: 'Sandwich poulet braisé',
        description: 'Pain frais, poulet braisé effiloché, crudités, sauce verte signature.',
        price: 7.5,
        image: 'sandwich',
        badges: ['halal', 'sauce verte'],
        allergens: 'Gluten (pain), sésame possible.',
      },
      {
        id: 'menu-solo',
        name: 'Menu solo',
        description: 'Sandwich ou pilons + frites maison + boisson 33 cl.',
        price: 7.0,
        image: 'frites',
        badges: ['halal'],
        allergens: 'Gluten (pain).',
      },
    ],
  },
  {
    id: 'accompagnements',
    title: 'Accompagnements',
    items: [
      {
        id: 'frites',
        name: 'Frites',
        description: 'Dorées, salées comme il faut.',
        price: 2.5,
        provisional: true,
        image: 'frites',
      },
      {
        id: 'sauce-verte',
        name: 'Sauce verte signature',
        description: 'La recette maison que les avis réclament. Herbes fraîches, ail, piment doux.',
        price: 1.0,
        provisional: true,
        badges: ['sauce verte'],
      },
      {
        id: 'sauce-poivre',
        name: 'Sauce poivre maison',
        description: 'Crémeuse, relevée, faite sur place.',
        price: 1.0,
        provisional: true,
      },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts maison',
    items: [
      {
        id: 'tiramisu',
        name: 'Tiramisu maison',
        description: 'Préparé sur place, cacao au moment de servir.',
        price: 3.0,
        provisional: true,
        image: 'tiramisu',
        allergens: 'Œufs, lait, gluten.',
      },
    ],
  },
]

export const formatPrice = (p: number) =>
  p.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'
