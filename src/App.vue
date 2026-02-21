<script setup>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import Home from './components/Home.vue'
</script>

<template>
  <div class="mx-auto min-h-screen bg-linear-to-br from-indigo-950 to-gray-950 text-indigo-900 p-4">
    <div class="grid grid-cols-1 sm:grid-cols-6 gap-6">
      <div class="sm:col-span-2 xl:col-span-1"><Sidebar /></div>
      <div class="sm:col-span-4 xl:col-span-5"><Header /><Home /></div>
    </div>
  </div>
</template>

<style scoped></style>
