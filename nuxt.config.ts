export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'fr' },
      titleTemplate: (title?: string) =>
        title ? `${title} · Chicken Ember Villejuif` : 'Chicken Ember · Poulet braisé halal à Villejuif',
      meta: [
        { name: 'theme-color', content: '#0D0A08' },
        { property: 'og:site_name', content: 'Chicken Ember' },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://chickenember.fr/og.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/anton-latin-400-normal.woff2', crossorigin: '' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/archivo-latin-400-normal.woff2', crossorigin: '' },
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
