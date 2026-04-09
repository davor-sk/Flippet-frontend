import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/tailwind.css'
import { OhVueIcon } from 'oh-vue-icons'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)

pinia.use(piniaPluginPersistedstate)

app.component('v-icon', OhVueIcon)

axios.interceptors.request.use((config) => {
  const authStore = useAuthStore()

  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }

  return config
})

app.mount('#app')
