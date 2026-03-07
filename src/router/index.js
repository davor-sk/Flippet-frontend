import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import LogInView from '@/views/LogIn.vue'
import RegisterView from '@/views/Register.vue'

import SidebarView from '@/components/Sidebar.vue'
import HeaderView from '@/components/Header.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/home',
      redirect: '/',
    },
    {
      path: '/login',
      name: 'login',
      component: LogInView,
      meta: { hideSidebar: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { hideSidebar: true },
    },
    {
      path: '/create',
      name: 'create',
      component: SidebarView,
    },
    {
      path: '/study',
      name: 'study',
      component: HeaderView,
    },
  ],
})

export default router
