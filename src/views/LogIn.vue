<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch (error) {
    console.error('Neuspješna autentifikacija!')
  }
}
</script>

<template>
  <div class="mb-5">
    <RouterLink to="/" class="flex justify-center items-center lg:justify-start">
      <img src="../assets/images/flippet_logo.png" class="w-1/5 lg:w-[7%] ms-8 mt-4" />
    </RouterLink>
  </div>
  <div class="flex items-center justify-center">
    <div class="flex flex-col items-center w-full mx-3 lg:w-1/2 xl:w-1/3 mb-9">
      <h4 class="text-3xl font-semibold text-center mx-auto mb-8">Welcome Back!</h4>
      <img src="@/assets/images/avatar_boy_circle.png" class="w-1/3 mb-4" />
      <div class="w-2/3 p-2">
        <form @submit.prevent="handleLogin">
          <div class="relative w-full mb-6">
            <input
              type="email"
              v-model="email"
              name="email"
              class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
              placeholder="Email address"
              required
            />
            <img
              src="@/assets/images/person.png"
              class="w-8 absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
          <div class="relative w-full mb-6">
            <input
              type="password"
              v-model="password"
              name="password"
              class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
              placeholder="Password"
              required
            />
            <img
              src="@/assets/images/lock.png"
              class="w-8 absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
          <button
            type="submit"
            class="cursor-pointer me-2 bg-[#780c7b] hover:bg-[#3ecad8] hover:text-slate-200 px-5 py-2 font-semibold rounded-2xl w-full mb-6"
          >
            Log In
          </button>
        </form>
        <RouterLink
          to="/register"
          class="block cursor-pointer me-2 bg-white/10 text-center text-neutral-300 hover:bg-white/30 hover:text-slate-200 px-5 py-2 font-semibold rounded-2xl w-full hover:ring-1 hover:border-white/30"
        >
          New to Flippet? Create an account
        </RouterLink>
      </div>
    </div>
  </div>
</template>
