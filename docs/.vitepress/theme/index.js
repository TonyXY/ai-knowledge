import DefaultTheme from 'vitepress/theme'
import DifficultyBadge from './components/DifficultyBadge.vue'
import TermGraph from './components/TermGraph.vue'
import ProgressTracker from './components/ProgressTracker.vue'
import LearningDashboard from './components/LearningDashboard.vue'
import ArchTransformer from './components/ArchTransformer.vue'
import ArchRAG from './components/ArchRAG.vue'
import ArchMCP from './components/ArchMCP.vue'
import Layout from './Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('DifficultyBadge', DifficultyBadge)
    app.component('TermGraph', TermGraph)
    app.component('ProgressTracker', ProgressTracker)
    app.component('LearningDashboard', LearningDashboard)
    app.component('ArchTransformer', ArchTransformer)
    app.component('ArchRAG', ArchRAG)
    app.component('ArchMCP', ArchMCP)
  }
}
