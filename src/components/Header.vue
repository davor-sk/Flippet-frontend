<script setup>
import { addIcons } from 'oh-vue-icons'
import { HiUserCircle, FaSearch, CoHamburgerMenu } from 'oh-vue-icons/icons'
addIcons(HiUserCircle, FaSearch, CoHamburgerMenu)
import { ref } from 'vue'

const searchInput = ref('')
const open = ref(false)
console.log(searchInput.value)

const ikone = {
  user: 'hi-user-circle',
  search: 'fa-search',
  hamburger: 'co-hamburger-menu',
}
</script>

<template>
  <nav class="rounded-2xl text-white shadow-sm p-4" aria-label="Main navigation">
    <div class="hidden lg:flex items-center w-full">
      <div class="flex-1"></div>
      <div class="flex-1 flex justify-center">
        <div class="relative w-full max-w-xl">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <v-icon name="fa-search" scale="1.1" />
          </span>

          <input
            v-model="searchInput"
            type="text"
            name="searchCollections"
            class="bg-white/10 text-white border-b-4 placeholder:text-white/50 border border-white/10 rounded-2xl p-2 pl-10 w-full h-11 focus-visible:ring-2 ring-white/10"
            placeholder="Search..."
          />
        </div>
      </div>

      <div class="flex-1 flex justify-end">
        <a href="#" class="rounded-xl px-3 py-2 hover:bg-slate-200 hover:text-neutral-800 hidden"
          ><v-icon name="hi-user-circle" scale="2" />
        </a>
        <button
          class="cursor-pointer me-2 bg-slate-200 text-neutral-800 hover:bg-white/10 hover:text-slate-200 px-6 py-3 font-semibold"
        >
          Log in
        </button>
      </div>
    </div>
    <div class="flex flex-col w-full lg:hidden">
      <div class="flex gap-3 w-full">
        <div class="relative w-full">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <v-icon name="fa-search" scale="1.1" />
          </span>

          <input
            v-model="searchInput"
            @click="open = false"
            type="text"
            name="searchCollections"
            class="bg-white/10 text-white placeholder:text-white/50 border border-white/10 rounded-2xl p-2 pl-10 w-full h-11 focus-visible:ring-2 ring-white/10"
            placeholder="Search..."
          />
        </div>

        <button @click="open = !open">
          <v-icon name="co-hamburger-menu" scale="2" />
        </button>
      </div>

      <ul
        v-show="open"
        @click="open = false"
        class="flex flex-col mt-4 gap-2 w-full bg-slate-50 text-neutral-800 text-xl rounded-xl p-2"
      >
        <li>
          <a href="#" class="block rounded-xl px-3 py-1 hover:bg-slate-200"
            ><v-icon name="co-home" scale="1.2" /><span class="ms-2"> Home</span>
          </a>
        </li>

        <li>
          <a href="#" class="block rounded-xl px-3 py-1 hover:bg-slate-200"
            ><v-icon name="co-pencil" scale="1.2" /><span class="ms-2"> Create</span>
          </a>
        </li>

        <li>
          <a href="#" class="block rounded-xl px-3 py-1 hover:bg-slate-200"
            ><v-icon name="la-school-solid" scale="1.2" /><span class="ms-2"> Study</span>
          </a>
        </li>

        <li class="pt-2 mt-2 border-t border-slate-200/70 dark:border-slate-800">
          <a href="#" class="block rounded-xl px-3 py-1 hover:bg-slate-200"> My collections </a>
        </li>
        <li class="">
          <a href="#" class="block rounded-xl px-3 py-1 hover:bg-slate-200 hover:text-neutral-800"
            ><v-icon name="hi-user-circle" scale="1.2" /><span class="ms-2">Profile</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
