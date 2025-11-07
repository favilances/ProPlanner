import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from './views/WelcomeView.vue'
import CalendarEditor from './views/CalendarEditor.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomeView
  },
  {
    path: '/app',
    name: 'CalendarEditor',
    component: CalendarEditor
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
