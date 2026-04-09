import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import LogInView from '@/views/LogIn.vue'
import RegisterView from '@/views/Register.vue'
import SettingsView from '@/views/Settings.vue'
import CreateCollectionView from '@/views/CreateCollectionView.vue'
import CollectionsView from '@/views/Collections.vue'
import SelectedCollectionView from '@/views/SelectedCollectionView.vue'
import MyCollections from '@/views/MyCollections.vue'
import { useAuthStore } from '@/stores/authStore'
import { isTokenExpired } from '@/utils/tokenUtils'

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
      path: '/create/:id?',
      name: 'create',
      component: CreateCollectionView,
    },
    {
      path: '/study',
      name: 'study',
      component: CollectionsView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
    {
      path: '/study/:id',
      name: 'selectedCollection',
      component: SelectedCollectionView,
    },
    {
      path: '/mycollections',
      name: 'mycollections',
      component: MyCollections,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.token && isTokenExpired(authStore.token)) {
    authStore.logout()
    next('/login')
    return
  }

  const protectedRoutes = ['create', 'mycollections', 'settings']
  if (protectedRoutes.includes(to.name) && !authStore.user) {
    next('/login')
    return
  }

  next()
})

export default router
