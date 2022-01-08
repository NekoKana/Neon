import * as vueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../view/Home.vue')
  },
  {
    path:'/mypage',
    name:'mypage',
    component: () => import('../view/myPage.vue')
  }
]

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes
})

export default router
