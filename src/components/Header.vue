<script setup>
import { addIcons } from 'oh-vue-icons'
import { HiUserCircle, FaSearch } from 'oh-vue-icons/icons'
addIcons(HiUserCircle, FaSearch)
import { ref } from 'vue'

const searchInput = ref('')
console.log(searchInput)

const ikone = {
  user: 'hi-user-circle',
  search: 'fa-search',
}
</script>

<template>
  <nav class="rounded-2xl text-white shadow-sm p-4">
    <ul class="space-y-1 flex flex-row items-center justify-end">
      <li class="me-4">
        <input
          type="text"
          class="bg-white text-indigo-950 rounded-2xl p-4"
          :v-model="searchInput"
        />
      </li>
      <li>
        <a href="#" class="block rounded-xl px-3 py-2 hover:bg-slate-200 hover:text-indigo-900"
          ><v-icon name="fa-search" scale="2" />
        </a>
      </li>
      <li>
        <a href="#" class="block rounded-xl px-3 py-2 hover:bg-slate-200 hover:text-indigo-900"
          ><v-icon name="hi-user-circle" scale="2" />
        </a>
      </li>
    </ul>
  </nav>
</template>
