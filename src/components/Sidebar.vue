<script setup>
import { addIcons } from 'oh-vue-icons'
import { CoHome, CoPencil, LaSchoolSolid } from 'oh-vue-icons/icons'
import { RouterLink } from 'vue-router'
addIcons(CoHome, CoPencil, LaSchoolSolid)

const ikone = {
  home: 'co-home',
  pencil: 'co-pencil',
  study: 'la-school-solid',
}
</script>

<template>
  <nav
    class="bg-white/10 text-white/80 shadow-sm p-4 min-h-screen hidden md:flex flex-col"
    aria-label="Sidebar navigation"
  >
    <div class="mb-4 text-lg font-semibold flex flex-row items-center">
      <img src="../assets/images/flippet.png" class="w-1/5 md:w-1/2" />
    </div>

    <ul class="space-y-1">
      <li>
        <RouterLink to="/" class="block rounded-xl px-3 py-2 hover:bg-white/10 hover:text-slate-200"
          ><v-icon name="co-home" /> Home
        </RouterLink>
      </li>

      <li>
        <RouterLink
          to="/create"
          class="block rounded-xl px-3 py-2 hover:bg-white/10 hover:text-slate-200"
          ><v-icon name="co-pencil" /> Create
        </RouterLink>
      </li>

      <li>
        <RouterLink
          to="/study"
          class="block rounded-xl px-3 py-2 hover:bg-white/10 hover:text-slate-200"
          ><v-icon name="la-school-solid" /> Study
        </RouterLink>
      </li>

      <li class="pt-2 mt-2 border-t border-slate-200/70">
        <a href="#" class="block rounded-xl px-3 py-2 hover:bg-white/10 hover:text-slate-200">
          My collections
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
a.router-link-exact-active {
  color: #94a3b8;
}
</style>
