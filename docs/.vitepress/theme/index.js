import DefaultTheme from 'vitepress/theme'
import DifficultyBadge from './components/DifficultyBadge.vue'
import TermGraph from './components/TermGraph.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DifficultyBadge', DifficultyBadge)
    app.component('TermGraph', TermGraph)
  }
}
