import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/tailwind.css'
import { OhVueIcon } from 'oh-vue-icons'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)

pinia.use(piniaPluginPersistedstate)

app.component('v-icon', OhVueIcon)

app.mount('#app')
