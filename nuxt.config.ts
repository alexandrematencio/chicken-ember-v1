// base path: '/' en prod (chickenember.fr), '/chicken-ember-v1/' sur GitHub Pages (env du workflow)
const base = process.env.NUXT_APP_BASE_URL || '/'

const fontFaces = ['anton-latin-400', 'archivo-latin-400', 'archivo-latin-600']
  .map((f) => {
    const [family, , weight] = f.split('-')
    return `@font-face{font-family:'${family!.charAt(0).toUpperCase() + family!.slice(1)}';font-style:normal;font-weight:${weight};font-display:swap;src:url('${base}fonts/${f}-normal.woff2') format('woff2')}`
  })
  .join('')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  app: {
    baseURL: base,
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'fr' },
      titleTemplate: (title?: string) =>
        title ? `${title} · Chicken Ember Villejuif` : 'Chicken Ember · Poulet braisé halal à Villejuif',
      style: [{ innerHTML: fontFaces }],
      meta: [
        { name: 'theme-color', content: '#0D0A08' },
        { property: 'og:site_name', content: 'Chicken Ember' },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://chickenember.fr/og.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` },
        { rel: 'apple-touch-icon', href: `${base}apple-touch-icon.png` },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: `${base}fonts/anton-latin-400-normal.woff2`, crossorigin: '' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: `${base}fonts/archivo-latin-400-normal.woff2`, crossorigin: '' },
      ],
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/menu',
        '/commander',
        '/avis',
        '/contact',
        '/mentions-legales',
        '/confidentialite',
      ],
    },
  },
})
