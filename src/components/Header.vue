<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'
import DesktopNavbarComponent from './DesktopNavbar.vue'
import MobileNavbarComponent from './MobileNavbar.vue'

const authStore = useAuthStore()
const router = useRouter()
const searchInput = ref('')
const open = ref(false)
const openProfile = ref(false)
const openSearch = ref(false)

function logoutUser() {
  open.value = false
  openProfile.value = false
  openSearch.value = false
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="rounded-2xl text-white shadow-sm p-4" aria-label="Main navigation">
    <DesktopNavbarComponent
      :auth-store="authStore"
      :search-input="searchInput"
      :open-profile="openProfile"
      :open-search="openSearch"
      @toggle-search="openSearch = !openSearch"
      @toggle-profile="openProfile = !openProfile"
      @close-profile="openProfile = false"
      @logout="logoutUser"
    />

    <MobileNavbarComponent
      :auth-store="authStore"
      :search-input="searchInput"
      :open="open"
      :open-profile="openProfile"
      @toggle-menu="open = !open"
      @close-menu="open = false"
      @toggle-profile="openProfile = !openProfile"
      @logout="logoutUser"
    />
  </nav>
</template>

<style scoped></style>
