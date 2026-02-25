import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '@lab2view/vue-email-editor',
  description: 'A professional, extensible drag-and-drop email editor for Vue 3, built on MJML.',
  base: '/vue-email-editor/',
  appearance: 'force-auto',

  head: [
    ['link', { rel: 'icon', href: '/vue-email-editor/logo.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap', rel: 'stylesheet' }],
    ['meta', { property: 'og:title', content: 'Vue Email Editor — Drag & drop email builder for Vue 3' }],
    ['meta', { property: 'og:description', content: 'Professional, extensible, MJML-powered email editor. Free and open-source.' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://lab2view.github.io/vue-email-editor/' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  themeConfig: {
    logo: '/logo.png',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/props' },
      {
        text: 'v0.1.0',
        items: [
          { text: 'Changelog', link: 'https://github.com/lab2view/vue-email-editor/releases' },
          { text: 'npm', link: 'https://www.npmjs.com/package/@lab2view/vue-email-editor' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Why This Editor?', link: '/guide/why' },
          ],
        },
        {
          text: 'Essentials',
          items: [
            { text: 'Theming', link: '/guide/theming' },
            { text: 'Internationalization', link: '/guide/i18n' },
            { text: 'Blocks', link: '/guide/blocks' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Plugins', link: '/guide/plugins' },
            { text: 'Events', link: '/guide/events' },
            { text: 'Imperative API', link: '/guide/imperative-api' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'Reference',
          items: [
            { text: 'Props', link: '/api/props' },
            { text: 'Events', link: '/api/events' },
            { text: 'API Methods', link: '/api/methods' },
            { text: 'Types', link: '/api/types' },
            { text: 'Exports', link: '/api/exports' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lab2view/vue-email-editor' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@lab2view/vue-email-editor' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright Lab2view',
    },

    editLink: {
      pattern: 'https://github.com/lab2view/vue-email-editor/edit/main/docs/:path',
    },
  },
})
