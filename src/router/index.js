import { createRouter, createWebHistory } from 'vue-router'
import Start from '../components/Start.vue'
import AddGuests from '../components/AddGuests.vue'
import AddFood from '../components/AddFood.vue'
import Result from '../components/AppResult.vue'
import E404 from '../components/E404.vue'

const routes = [
  {
    path: '/',
    name: 'start',
    component: Start
  },
  {
    path: '/guests',
    name: 'addGuests',
    component: AddGuests
  },
  {
    path: '/food',
    name: 'addFood',
    component: AddFood
  },
  {
    path: '/result',
    name: 'result',
    component: Result
  },
  {
    path: '/:catchAll(.*)',
    name: 'E404',
    component: E404
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
