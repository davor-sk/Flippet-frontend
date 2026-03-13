<script setup>
import { addIcons } from 'oh-vue-icons'
import { FaSearch, RiShutDownLine } from 'oh-vue-icons/icons'
import { RouterLink } from 'vue-router'

addIcons(FaSearch, RiShutDownLine)

defineProps(['authStore', 'searchInput', 'openProfile', 'openSearch'])
defineEmits(['toggle-search', 'toggle-profile', 'logout'])
</script>

<template>
  <div class="hidden lg:flex items-center w-full">
    <div class="flex-1"></div>
    <div class="flex-1 flex justify-center" v-show="!authStore.user || openSearch">
      <div class="relative w-full max-w-xl">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <v-icon name="fa-search" scale="1.1" />
        </span>

        <input
          v-model="searchInput.value"
          type="text"
          name="searchCollections"
          class="bg-white/10 text-white border-b-4 placeholder:text-white/50 border border-white/10 rounded-2xl p-2 pl-10 w-full h-11 focus-visible:ring-2 ring-white/10"
          placeholder="Search..."
        />
      </div>
    </div>

    <div class="flex-1 flex justify-end items-center">
      <div v-show="authStore.user" class="flex justify-end items-center">
        <img
          src="@/assets/images/search_blue_circle.png"
          class="w-14 h-14 me-4 cursor-pointer"
          @click="$emit('toggle-search')"
        />
        <RouterLink to="/create">
          <img src="@/assets/images/add_pink_circle.png" class="w-14 h-14 me-1 cursor-pointer"
        /></RouterLink>
      </div>
      <div v-if="authStore.user" class="relative" @click="$emit('toggle-profile')">
        <button class="px-3 py-2 flex items-center">
          <img src="@/assets/images/avatar_boy_circle.png" class="w-14 h-14 cursor-pointer" />
        </button>
        <div
          v-show="openProfile"
          class="absolute right-0 top-full z-50 flex flex-col w-84 gap-2 bg-[#171b29] text-xl p-6"
        >
          <div class="text-lg mb-3">
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
            class="block rounded-xl px-3 mt-3 py-2 bg-[#a41e1e] hover:bg-[#780c7b] text-white w-full cursor-pointer"
          >
            <v-icon name="ri-shut-down-line" scale="1.2" />
            <span class="ms-2">Logout</span>
          </button>
        </div>
      </div>
      <div v-else>
        <RouterLink
          to="/login"
          class="cursor-pointer me-2 bg-[#780c7b] hover:bg-[#02a5f1] hover:text-slate-200 px-6 py-3 font-semibold rounded-2xl"
        >
          Log in
        </RouterLink>
      </div>
    </div>
  </div>
</template>
