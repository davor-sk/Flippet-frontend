<script setup>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import Home from './components/Home.vue'
import LogIn from './components/LogIn.vue'
</script>

<template>
  <div class="mx-auto min-h-screen bg-[#2c2f33] text-neutral-800">
    <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
      <div class="md:col-span-2 xl:col-span-1"><Sidebar /></div>
      <div class="md:col-span-4 xl:col-span-5">
        <Header />
        <Home class="hidden" />
        <LogIn />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
