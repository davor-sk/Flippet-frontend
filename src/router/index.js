import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import LogInView from '@/views/LogIn.vue'
import RegisterView from '@/views/Register.vue'
import SettingsView from '@/views/Settings.vue'
import CreateCollectionView from '@/views/CreateCollectionView.vue'

import HeaderComponent from '@/components/Header.vue'

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
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/create',
      name: 'create',
      component: CreateCollectionView,
    },
    {
      path: '/study',
      name: 'study',
      component: HeaderComponent,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
  ],
})

export default router
