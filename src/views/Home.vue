<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <div class="p-14">
    <div
      class="flex flex-col justify-center items-center text-white min-h-fit"
      v-if="!authStore.user"
    >
      <img src="../assets/images/flippet_logo.png" class="w-1/5" />
      <p class="text-xl">Flip it. Learn it. Own it.</p>
    </div>
    <div class="flex items-center justify-between w-full p-10 bg-[#460748] rounded-2xl" v-else>
      <div>
        <p class="text-4xl font-bold mb-6">Hi {{ authStore.user.first_name }}!</p>
        <p class="text-3xl">Welcome to Flippet - your learning companion</p>
      </div>
      <div class="flex justify-center">
        <img src="@/assets/images/flippet_banner_image.png" class="w-1/2 -my-16" />
      </div>
    </div>
  </div>
</template>
