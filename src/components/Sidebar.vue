<script setup>
import { addIcons } from 'oh-vue-icons'
import { CoHome, CoPencil, LaSchoolSolid } from 'oh-vue-icons/icons'
addIcons(CoHome, CoPencil, LaSchoolSolid)

const ikone = {
  home: 'co-home',
  pencil: 'co-pencil',
  study: 'la-school-solid',
}
</script>

<template>
  <nav class="rounded-2xl bg-white shadow-sm p-4 h-full sm:h-[95vh]">
    <div class="mb-4 text-lg font-semibold flex flex-row items-center">
      <img src="../assets/images/flippet.png" class="w-2/10 sm:w-5/10" />
    </div>

    <ul class="space-y-1">
      <li>
        <a href="#" class="block rounded-xl px-3 py-2 hover:bg-slate-200"
          ><v-icon name="co-home" /> Home
        </a>
      </li>

      <li>
        <a href="#" class="block rounded-xl px-3 py-2 hover:bg-slate-200"
          ><v-icon name="co-pencil" /> Create
        </a>
      </li>

      <li>
        <a href="#" class="block rounded-xl px-3 py-2 hover:bg-slate-200"
          ><v-icon name="la-school-solid" /> Study
        </a>
      </li>

      <li class="pt-2 mt-2 border-t border-slate-200/70 dark:border-slate-800">
        <a href="#" class="block rounded-xl px-3 py-2 hover:bg-slate-200"> My collections </a>
      </li>
    </ul>
  </nav>
</template>
