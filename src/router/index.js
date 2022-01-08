import * as vueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../view/Home.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../view/Signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../view/Login.vue')
  }
]

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes
})

export default router
