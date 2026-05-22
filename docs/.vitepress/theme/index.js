import DefaultTheme from 'vitepress/theme'
import DifficultyBadge from './components/DifficultyBadge.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DifficultyBadge', DifficultyBadge)
  }
}
