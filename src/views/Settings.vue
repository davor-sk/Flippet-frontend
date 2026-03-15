<script setup>
import { useAuthStore } from '@/stores/authStore'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref(authStore.user?.username || '')
const email = ref(authStore.user?.email || '')
const old_password = ref('')
const password = ref('')
const confirm_password = ref('')

const isEditingUser = ref(false)
const isEditingEmail = ref(false)
const isEditingPassword = ref(false)

const isUsernameValid = computed(() => username.value.trim().length >= 3)
const passwordError = computed(() => {
  if (password.value && password.value.length < 8) return 'Password requires at least 8 characters.'
  if (!/[A-Z]/.test(password.value)) return 'Password must contain an uppercase letter.'
  if (!/[a-z]/.test(password.value)) return 'Password must contain a lowercase letter.'
  if (!/[0-9]/.test(password.value)) return 'Password must contain a number.'

  return ''
})

const toggleUsernameEdit = () => {
  if (isEditingUser.value) {
    username.value = authStore.user?.username || ''
  }
  isEditingUser.value = !isEditingUser.value
}

const toggleEmailEdit = () => {
  if (isEditingEmail.value) {
    email.value = authStore.user?.email || ''
  }
  isEditingEmail.value = !isEditingEmail.value
}

const togglePasswordEdit = () => {
  if (isEditingPassword.value) {
    old_password.value = ''
    password.value = ''
    confirm_password.value = ''
  }
  isEditingPassword.value = !isEditingPassword.value
}

const checkPassword = computed(() => password.value === confirm_password.value)
const isChangingPassword = computed(() => isEditingPassword.value)

const handleSubmit = async () => {
  try {
    if (isEditingUser.value && !isUsernameValid.value) {
      isEditingUser.value = false
      return
    }
    if (isChangingPassword.value) {
      if (!old_password.value || passwordError.value || !checkPassword.value) return
    }

    const userId = authStore.user?.id

    if (!userId) return
    await authStore.patchUser(
      userId,
      username.value,
      email.value,
      old_password.value,
      password.value,
    )
    isEditingUser.value = false
    isEditingEmail.value = false
    isEditingPassword.value = false

    old_password.value = ''
    password.value = ''
    confirm_password.value = ''
  } catch (error) {
    console.error('Neuspješna promjena podataka!')
  }
}

const handleDeleteUser = async () => {
  const confirmed = window.confirm(
    'Jesi siguran da želiš obrisati račun? Ova radnja se ne može poništiti.',
  )
  if (!confirmed) return
  try {
    const userId = authStore.user?.id

    if (!userId) return
    await authStore.deleteUser(userId)
    authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Neuspješna promjena podataka!')
  }
}
</script>

<template>
  <div class="mb-5">
    <RouterLink to="/" class="flex justify-center items-center lg:justify-start">
      <img src="../assets/images/flippet_logo.png" class="w-1/5 lg:w-[7%] ms-8 mt-4" />
    </RouterLink>
  </div>
  <form @submit.prevent="handleSubmit">
    <div class="flex justify-center">
      <div class="flex flex-col w-full xl:w-3/4 p-3 xl:p-6">
        <p class="text-2xl font-semibold mb-4 text-white">Settings</p>
        <p class="text-[#ce61fe] text-lg mb-4">Personal information</p>
        <div class="bg-[#171b29] rounded-2xl p-6 flex justify-between mb-2">
          <div>
            <p class="text-[#02a5f1] text-lg mb-2">Username</p>
            <p v-if="!isEditingUser">{{ authStore.user?.username }}</p>
            <input
              v-else
              type="text"
              name="username"
              required=""
              v-model="username"
              class="bg-[#171b29] text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-9 focus-visible:ring-2 ring-white/10 border-b-4"
            />
            <span
              :class="username && !isUsernameValid ? 'block text-red-400 text-sm mt-2' : 'hidden'"
              >Username has to be at least 3 characters long!</span
            >
          </div>
          <div class="flex items-center cursor-pointer" @click="toggleUsernameEdit">
            <img src="@/assets/images/edit.png" class="w-8" />
            <p class="text-[#ce61fe] m-2 text-xl">Edit</p>
          </div>
        </div>
        <div class="bg-[#171b29] rounded-2xl p-6 flex justify-between mb-4">
          <div>
            <p class="text-[#02a5f1] text-lg mb-2">Email</p>
            <p v-if="!isEditingEmail">{{ authStore.user?.email }}</p>
            <input
              v-else
              type="text"
              name="email"
              required
              v-model="email"
              class="bg-[#171b29] text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-9 focus-visible:ring-2 ring-white/10 border-b-4"
            />
          </div>
          <div class="flex items-center cursor-pointer" @click="toggleEmailEdit">
            <img src="@/assets/images/edit.png" class="w-8" />
            <p class="text-[#ce61fe] m-2 text-xl">Edit</p>
          </div>
        </div>
        <p class="text-[#ce61fe] text-lg mb-4">Account information</p>
        <div class="bg-[#171b29] rounded-2xl p-6 flex justify-between mb-4">
          <div>
            <p class="text-[#02a5f1] text-lg mb-2">Change password</p>
            <div v-if="isEditingPassword" class="flex flex-col gap-2">
              <input
                type="password"
                v-model="old_password"
                name="password"
                class="bg-[#171b29] text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
                placeholder="Old password"
                required
              />
              <input
                type="password"
                v-model="password"
                name="password"
                class="bg-[#171b29] text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
                placeholder="New password"
                required
              />
              <span
                :class="password && passwordError ? 'block text-red-400 text-sm mt-2' : 'hidden'"
                >{{ passwordError }}</span
              >
              <input
                type="password"
                v-model="confirm_password"
                class="bg-[#171b29] text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
                placeholder="Confirm password"
                required
              />
              <span
                :class="
                  confirm_password && !checkPassword ? 'block text-red-400 text-sm mt-2' : 'hidden'
                "
                >Passwords have to match!</span
              >
            </div>
          </div>
          <div class="flex items-center">
            <p class="text-[#ce61fe] m-2 text-xl cursor-pointer" @click="togglePasswordEdit">
              Change
            </p>
          </div>
        </div>
        <div class="bg-[#171b29] rounded-2xl p-6 flex justify-between mb-4">
          <div>
            <p class="text-[#02a5f1] text-lg mb-2">Delete your account</p>
            <p>This action cannot be undone.</p>
          </div>
          <div class="flex items-center">
            <button
              type="button"
              class="cursor-pointer me-2 bg-[#a41e1e] hover:bg-[#780c7b] text-white px-6 py-3 font-semibold rounded-2xl"
              @click="handleDeleteUser"
            >
              Delete
            </button>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            class="cursor-pointer me-2 bg-[#780c7b] hover:bg-[#02a5f1] hover:text-slate-200 px-5 py-2 font-bold rounded-2xl w-full md:w-1/4 my-3"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
