import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import GamingView from '@/views/GamingView.vue'
import StatisticView from '@/views/StatisticView.vue'
import RuleView from '@/views/RuleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/battle',
      name: 'gaming',
      component: GamingView,
    },
    {
      path: '/statistic/:username',
      name: 'statistic',
      component: StatisticView,
    },
    {
      path: '/rule',
      name: 'rule',
      component: RuleView,
    },
  ],
})

export default router
