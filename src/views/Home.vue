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
    <div
      class="relative flex flex-col lg:flex-row items-center justify-between w-full lg:p-10 bg-[#460748] rounded-2xl pt-16 pb-10 px-12"
      v-else
    >
      <div class="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
        <p class="text-3xl xl:text-4xl font-bold mb-4 lg:mb-6">
          Hi {{ authStore.user?.first_name }}!
        </p>
        <p class="text-xl xl:text-3xl">Welcome to Flippet - your learning companion</p>
      </div>
      <div
        class="absolute left-1/2 -top-15 -translate-x-1/2 lg:static lg:translate-x-0 lg:translate-y-0 flex justify-center order-1 lg:order-2 lg:w-1/2"
      >
        <img src="@/assets/images/flippet_banner_image.png" class="w-40 lg:w-1/2 lg:-my-16" />
      </div>
    </div>
  </div>
</template>
