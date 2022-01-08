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
    path:'/talkroom',
    name:'talkroom',
    component: () => import('../view/TalkRoomPage.vue')
  }
]

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes
})

export default router
