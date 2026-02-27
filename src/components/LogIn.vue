<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="mt-6 bg-neutral-800 shadow-lg rounded-3xl w-full p-8 mx-3 lg:w-1/3 mb-9">
      <h4
        class="text-3xl font-semibold bg-linear-to-br from-gray-300 to-gray-500 bg-clip-text text-transparent text-center mx-auto mb-8"
      >
        Welcome Back!
      </h4>
      <div class="w-full p-2">
        <form method="POST">
          <input
            type="email"
            v-model="email"
            name="email"
            class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 mb-6 border-b-4"
            placeholder="Email address"
          />
          <input
            type="password"
            v-model="password"
            name="password"
            class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4 mb-6"
            placeholder="Password"
          />
          <button
            type="submit"
            class="cursor-pointer me-2 bg-slate-200 text-neutral-800 hover:bg-white/10 hover:text-slate-200 px-5 py-2 font-semibold rounded-2xl w-full hover:ring-1 hover:border-white/30 mb-6"
          >
            Log In
          </button>
          <button
            type="button"
            class="cursor-pointer me-2 bg-white/10 text-neutral-300 hover:bg-white/30 hover:text-slate-200 px-5 py-2 font-semibold rounded-2xl w-full hover:ring-1 hover:border-white/30"
          >
            New to Flippet? Create an account
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
