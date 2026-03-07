<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'

const route = useRoute()
const hideSidebar = computed(() => {
  return route.path === '/login' || route.path === '/register'
})
</script>

<template>
  <div class="mx-auto min-h-screen bg-[#0f121c] text-[#d2d2d3]">
    <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
      <div v-if="!hideSidebar" class="md:col-span-2 xl:col-span-1">
        <Sidebar />
      </div>

      <div :class="hideSidebar ? 'md:col-span-6 xl:col-span-6' : 'md:col-span-4 xl:col-span-5'">
        <Header v-if="!hideSidebar" />
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
