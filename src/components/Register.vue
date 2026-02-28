<script setup>
import { computed, ref } from 'vue'

const first_name = ref('')
const last_name = ref('')
const email = ref('')
const password = ref('')
const confirm_password = ref('')

const isFirstNameValid = computed(() => first_name.value.length >= 3)
const isLastNameValid = computed(() => last_name.value.length >= 3)
const passwordError = computed(() => {
  if (password.value.length < 8) return 'Password requires at least 8 characters.'
  if (!/[A-Z]/.test(password.value)) return 'Password must contain an uppercase letter.'
  if (!/[a-z]/.test(password.value)) return 'Password must contain a lowercase letter.'
  if (!/[0-9]/.test(password.value)) return 'Password must contain a number.'

  return ''
})
const checkPasword = computed(() => password.value === confirm_password.value)

function handleSubmit(e) {
  if (
    !isFirstNameValid.value ||
    !isLastNameValid.value ||
    passwordError.value ||
    !checkPasword.value
  ) {
    e.preventDefault()
    return
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="mt-6 bg-neutral-800 shadow-lg rounded-3xl w-full p-8 mx-3 lg:w-1/3 mb-9">
      <h4
        class="text-3xl font-semibold bg-linear-to-br from-gray-300 to-gray-500 bg-clip-text text-transparent text-center mx-auto mb-8"
      >
        Welcome!
      </h4>
      <div class="w-full p-2">
        <form method="POST" action="#" @submit="handleSubmit">
          <input
            type="text"
            v-model="first_name"
            name="first_name"
            class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
            :class="first_name && !isFirstNameValid ? 'mb-2' : 'mb-6'"
            placeholder="First name"
            required
          />
          <span
            :class="first_name && !isFirstNameValid ? 'block text-red-400 text-sm mb-4' : 'hidden'"
            >First name has to be at least 3 characters long!</span
          >
          <input
            type="text"
            v-model="last_name"
            name="last_name"
            class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
            :class="last_name && !isLastNameValid ? 'mb-2' : 'mb-6'"
            placeholder="Last name"
            required
          />
          <span
            :class="last_name && !isLastNameValid ? 'block text-red-400 text-sm mb-4' : 'hidden'"
            >Last name has to be at least 3 characters long!</span
          >
          <input
            type="email"
            v-model="email"
            name="email"
            class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 mb-6 border-b-4"
            placeholder="Email address"
            required
          />
          <input
            type="password"
            v-model="password"
            name="password"
            class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
            :class="password && passwordError ? 'mb-2' : 'mb-6'"
            placeholder="Password"
            required
          />
          <span :class="password && passwordError ? 'block text-red-400 text-sm mb-4' : 'hidden'">{{
            passwordError
          }}</span>
          <input
            type="password"
            v-model="confirm_password"
            class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
            :class="confirm_password && !checkPasword ? 'mb-2' : 'mb-6'"
            placeholder="Confirm password"
            required
          />
          <span
            :class="
              confirm_password && !checkPasword ? 'block text-red-400 text-sm mb-4' : 'hidden'
            "
            >Passwords have to match!</span
          >
          <button
            type="submit"
            class="cursor-pointer me-2 bg-slate-200 text-neutral-800 hover:bg-white/10 hover:text-slate-200 px-5 py-2 font-semibold rounded-2xl w-full hover:ring-1 hover:border-white/30 mb-6"
          >
            Register account
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
