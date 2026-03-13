<script setup>
import { addIcons } from 'oh-vue-icons'
import { FaSearch, CoHamburgerMenu, RiShutDownLine } from 'oh-vue-icons/icons'
import { RouterLink } from 'vue-router'

addIcons(FaSearch, CoHamburgerMenu, RiShutDownLine)
defineProps(['authStore', 'searchInput', 'open', 'openProfile'])
defineEmits(['toggle-menu', 'close-menu', 'toggle-profile', 'logout'])
</script>
<template>
  <div class="flex flex-col w-full lg:hidden">
    <div class="flex justify-between items-center gap-3 w-full">
      <div class="relative">
        <button @click="$emit('toggle-menu')">
          <v-icon name="co-hamburger-menu" scale="2" />
        </button>
        <ul
          class="absolute left-0 top-full z-50 flex flex-col w-86 gap-2 bg-[#0f121c] text-[#d2d2d3] text-xl rounded-xl p-2 shadow-lg"
          v-show="open"
          @click="$emit('close-menu')"
        >
          <li>
            <RouterLink
              to="/"
              class="flex items-center px-3 py-2 hover:bg-white/10 hover:text-slate-200"
              ><img src="@/assets/images/home.png" class="w-10" />
              <p class="ms-3">Home</p>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/create"
              class="flex items-center px-3 py-2 hover:bg-white/10 hover:text-slate-200"
              ><img src="@/assets/images/add.png" class="w-10" />
              <p class="ms-3">Create</p>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/study"
              class="flex items-center px-3 py-2 hover:bg-white/10 hover:text-slate-200"
              ><img src="@/assets/images/library_books.png" class="w-10" />
              <p class="ms-3">Study</p>
            </RouterLink>
          </li>

          <li class="pt-4 mt-4 border-t border-[#02a5f1]">
            <p class="px-3 py-2 text-[#ce61fe]">Your folders</p>
          </li>
          <li>
            <RouterLink
              to="/study"
              class="flex items-center px-3 py-2 hover:bg-white/10 hover:text-slate-200"
              ><img src="@/assets/images/flashcards.png" class="w-10" />
              <p class="ms-3">Flashcards</p>
            </RouterLink>
          </li>
          <li v-if="!authStore.user" class="w-full">
            <RouterLink
              to="/login"
              class="cursor-pointer text-md mt-6 bg-[#780c7b] py-2 font-bold rounded-xl flex items-center justify-center"
            >
              Log in
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="relative w-full items-center flex">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <v-icon name="fa-search" scale="1.1" />
        </span>

        <input
          v-model="searchInput.value"
          @click="$emit('close-menu')"
          type="text"
          name="searchCollections"
          class="bg-white/10 text-white border-b-4 placeholder:text-white/50 border border-white/10 rounded-2xl p-2 pl-10 w-full h-11 focus-visible:ring-2 ring-white/10"
          placeholder="Search..."
        />
      </div>
      <div v-if="authStore.user" @click="$emit('toggle-profile')" class="relative">
        <button class="flex items-center">
          <img src="@/assets/images/avatar_boy_circle.png" class="w-14 h-14 cursor-pointer" />
        </button>
        <div
          v-show="authStore.user && openProfile"
          class="absolute right-0 top-full z-50 flex flex-col w-84 gap-2 bg-[#171b29] text-xl p-6"
        >
          <div class="text-xl mb-3">
            {{ authStore.user?.first_name }} {{ authStore.user?.last_name }}<br />
            {{ authStore.user?.email }}
          </div>
          <RouterLink to="/settings" class="flex items-center mb-3 text-xl cursor-pointer">
            <img src="@/assets/images/settings.png" class="w-10 me-2" />
            <p>Settings</p>
          </RouterLink>
          <button
            type="button"
            @click="$emit('logout')"
            class="block rounded-xl px-3 mt-3 py-2 bg-[#a41e1e] text-white w-full cursor-pointer"
          >
            <v-icon name="ri-shut-down-line" scale="1.2" />
            <span class="ms-2">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
