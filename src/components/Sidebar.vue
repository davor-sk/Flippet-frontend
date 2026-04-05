<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useCollectionStore } from '@/stores/collectionStore'
import { addIcons } from 'oh-vue-icons'
import { CoHome, CoPencil, LaSchoolSolid } from 'oh-vue-icons/icons'
import { onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from '@/composables/useToast.js'

const { showToast } = useToast()
addIcons(CoHome, CoPencil, LaSchoolSolid)

const authStore = useAuthStore()
const collectionStore = useCollectionStore()

const userCollections = computed(() => {
  return collectionStore.myCollections || []
})

onMounted(async () => {
  try {
    console.log(authStore.user?.id)
    const userId = authStore.user?.id

    if (!userId) return
    await collectionStore.getCollectionsByUserId(userId)
  } catch (error) {
    showToast('Neuspješan dohvat kolekcija!', 'error')
  }
})
</script>

<template>
  <nav class="shadow-sm p-4 min-h-screen hidden md:flex flex-col border-r border-r-[#3ecad8]">
    <div class="mb-10">
      <RouterLink to="/">
        <img src="@/assets/images/Flippet_logo_main.png" class="w-full cursor-pointer" />
      </RouterLink>
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
          class="flex items-center rounded-xl px-3 py-2 hover:bg-[#171b29] hover:text-slate-200 mb-4"
          ><img src="@/assets/images/library_books.png" class="w-1/7" />
          <p class="ms-3">Study</p>
        </RouterLink>
      </li>
    </ul>

    <div v-if="authStore.user && userCollections.length > 0" class="border-t border-[#3ecad8] pt-4">
      <RouterLink to="/mycollections" class="pt-4 mt-4">
        <p class="rounded-xl px-3 py-2 text-[#ce61fe] hover:bg-[#171b29] hover:text-slate-200">
          My collections
        </p>
      </RouterLink>

      <div v-for="collection in userCollections" :key="collection._id" class="flex items-center">
        <RouterLink
          :to="{ name: 'selectedCollection', params: { id: collection._id } }"
          class="flex items-center rounded-xl px-3 py-2 hover:bg-[#171b29] hover:text-slate-200"
        >
          <img src="@/assets/images/flashcards.png" class="w-1/7" />
          <p class="ms-3 text-xl">{{ collection.title }}</p>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
a.router-link-exact-active {
  color: #ce61fe;
}
</style>
