import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import LandingPage from './components/landing/LandingPage.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LandingPage', LandingPage)
  },
} satisfies Theme
