import * as vueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../view/Home.vue')
  }
]

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes
})

export default router
