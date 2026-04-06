<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'
import DesktopNavbarComponent from './DesktopNavbar.vue'
import MobileNavbarComponent from './MobileNavbar.vue'
import { useSearch } from '@/composables/useSearch'

const { searchQuery } = useSearch()
const route = useRoute()

const authStore = useAuthStore()
const router = useRouter()
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

function handleSearch(value) {
  searchQuery.value = value
  if (value.length >= 3 && route.path !== '/') {
    router.push('/')
  }
}
</script>

<template>
  <nav class="rounded-2xl text-white shadow-sm p-4" aria-label="Main navigation">
    <DesktopNavbarComponent
      :search-query="searchQuery"
      :open-profile="openProfile"
      :open-search="openSearch"
      @search="handleSearch($event)"
      @toggle-search="openSearch = !openSearch"
      @toggle-profile="openProfile = !openProfile"
      @close-profile="openProfile = false"
      @logout="logoutUser"
    />

    <MobileNavbarComponent
      :search-query="searchQuery"
      :open="open"
      :open-profile="openProfile"
      @search="handleSearch($event)"
      @toggle-menu="open = !open"
      @close-menu="open = false"
      @toggle-profile="openProfile = !openProfile"
      @logout="logoutUser"
    />
  </nav>
</template>

<style scoped></style>
