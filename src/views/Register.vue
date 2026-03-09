<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()

const first_name = ref('')
const username = ref('')
const last_name = ref('')
const email = ref('')
const password = ref('')
const confirm_password = ref('')

const isFirstNameValid = computed(() => first_name.value.length >= 3)
const isLastNameValid = computed(() => last_name.value.length >= 3)
const isUsernameValid = computed(() => username.value.length >= 3)
const passwordError = computed(() => {
  if (password.value.length < 8) return 'Password requires at least 8 characters.'
  if (!/[A-Z]/.test(password.value)) return 'Password must contain an uppercase letter.'
  if (!/[a-z]/.test(password.value)) return 'Password must contain a lowercase letter.'
  if (!/[0-9]/.test(password.value)) return 'Password must contain a number.'

  return ''
})
const checkPassword = computed(() => password.value === confirm_password.value)

const handleSubmit = async () => {
  try {
    if (
      !isFirstNameValid.value ||
      !isLastNameValid.value ||
      !isUsernameValid.value ||
      passwordError.value ||
      !checkPassword.value
    ) {
      return
    }
    await authStore.register(
      first_name.value,
      last_name.value,
      username.value,
      email.value,
      password.value,
    )
  } catch (error) {
    console.error('Neuspješna registracija!')
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
      <h4 class="text-3xl font-semibold text-center mx-auto mb-8">Create an account!</h4>
      <img src="@/assets/images/avatar_boy_circle.png" class="w-1/3 mb-4" />
      <div class="w-2/3 p-2">
        <form @submit.prevent="handleSubmit">
          <div class="relative w-full" :class="first_name && !isFirstNameValid ? 'mb-2' : 'mb-6'">
            <input
              type="text"
              v-model="first_name"
              name="first_name"
              class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
              placeholder="First name"
              required
            />
            <img
              src="@/assets/images/person.png"
              class="w-8 absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
          <span
            :class="first_name && !isFirstNameValid ? 'block text-red-400 text-sm mb-4' : 'hidden'"
            >First name has to be at least 3 characters long!</span
          >
          <div class="relative w-full" :class="last_name && !isLastNameValid ? 'mb-2' : 'mb-6'">
            <input
              type="text"
              v-model="last_name"
              name="last_name"
              class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
              placeholder="Last name"
              required
            />
            <img
              src="@/assets/images/person.png"
              class="w-8 absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
          <span
            :class="last_name && !isLastNameValid ? 'block text-red-400 text-sm mb-4' : 'hidden'"
            >Last name has to be at least 3 characters long!</span
          >
          <div class="relative w-full" :class="username && !isUsernameValid ? 'mb-2' : 'mb-6'">
            <input
              type="text"
              v-model="username"
              name="username"
              class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
              placeholder="Username"
              required
            />
            <img
              src="@/assets/images/person.png"
              class="w-8 absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
          <span :class="username && !isUsernameValid ? 'block text-red-400 text-sm mb-4' : 'hidden'"
            >Username has to be at least 3 characters long!</span
          >
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
              src="@/assets/images/email.png"
              class="w-8 absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
          <div class="relative w-full" :class="password && passwordError ? 'mb-2' : 'mb-6'">
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
          <span :class="password && passwordError ? 'block text-red-400 text-sm mb-4' : 'hidden'">{{
            passwordError
          }}</span>
          <div
            class="relative w-full"
            :class="confirm_password && !checkPassword ? 'mb-2' : 'mb-6'"
          >
            <input
              type="password"
              v-model="confirm_password"
              class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
              placeholder="Confirm password"
              required
            />
            <img
              src="@/assets/images/lock.png"
              class="w-8 absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
          <span
            :class="
              confirm_password && !checkPassword ? 'block text-red-400 text-sm mb-4' : 'hidden'
            "
            >Passwords have to match!</span
          >
          <button
            type="submit"
            class="cursor-pointer me-2 bg-[#780c7b] hover:bg-[#3ecad8] hover:text-slate-200 px-5 py-2 font-bold rounded-2xl w-full mb-3"
          >
            Sign up
          </button>
          Already have an account?
          <RouterLink to="/login" class="text-[#02a5f1]">Log in</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>
