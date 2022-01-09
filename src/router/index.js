import * as vueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/login'
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../view/Signup.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../view/Chat.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../view/Login.vue')
  },
  {
    path: '/mypage',
    name: "mypage",
    component: () => import('../view/myPage.vue')
  }
]

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes
})

export default router
