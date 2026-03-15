<script setup>
import { useAuthStore } from '@/stores/authStore'
import { addIcons } from 'oh-vue-icons'
import { CoHome, CoPencil, LaSchoolSolid } from 'oh-vue-icons/icons'
import { RouterLink } from 'vue-router'
addIcons(CoHome, CoPencil, LaSchoolSolid)

const authStore = useAuthStore()
</script>

<template>
  <nav class="shadow-sm p-4 min-h-screen hidden md:flex flex-col border-r border-r-[#3ecad8]">
    <div class="mb-10">
      <RouterLink to="/"></RouterLink>
      <img src="@/assets/images/Flippet_logo_main.png" class="w-full cursor-pointer" />
    </div>

    <ul class="space-y-1 text-xl">
      <li>
        <RouterLink
          to="/"
          class="flex items-center rounded-xl px-3 py-2 hover:bg-[#171b29] hover:text-slate-200"
          ><img src="@/assets/images/home.png" class="w-1/7" />
          <p class="ms-3">Home</p>
        </RouterLink>
      </li>

      <li>
        <RouterLink
          :to="authStore.user ? '/create' : '/login'"
          class="flex items-center rounded-xl px-3 py-2 hover:bg-[#171b29] hover:text-slate-200"
          ><img src="@/assets/images/add.png" class="w-1/7" />
          <p class="ms-3">Create</p>
        </RouterLink>
      </li>

      <li>
        <RouterLink
          to="/study"
          class="flex items-center rounded-xl px-3 py-2 hover:bg-[#171b29] hover:text-slate-200"
          ><img src="@/assets/images/library_books.png" class="w-1/7" />
          <p class="ms-3">Study</p>
        </RouterLink>
      </li>

      <div v-if="authStore.user">
        <li class="pt-4 mt-4 border-t border-[#3ecad8]">
          <p class="rounded-xl px-3 py-2 text-[#ce61fe]">Your folders</p>
        </li>
        <li>
          <RouterLink
            to="/study"
            class="flex items-center rounded-xl px-3 py-2 hover:bg-[#171b29] hover:text-slate-200"
            ><img src="@/assets/images/flashcards.png" class="w-1/7" />
            <p class="ms-3">Flashcards</p>
          </RouterLink>
        </li>
      </div>
    </ul>
  </nav>
</template>

<style scoped>
a.router-link-exact-active {
  color: #ce61fe;
}
</style>
