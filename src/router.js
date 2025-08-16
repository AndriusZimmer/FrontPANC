import { createRouter, createWebHistory } from 'vue-router'

import ListaPlanta from './components/ListaPlanta.vue'
import PancDetail from './components/PancDetail.vue'

const routes = [
  { path: '/', name: 'home', component: ListaPlanta },
  { path: '/panc/:id', name: 'panc', component: PancDetail, props: true },
  { path: '/:catchAll(.*)', redirect: '/' },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: { template: '<p>404 - Página não encontrada</p>' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
