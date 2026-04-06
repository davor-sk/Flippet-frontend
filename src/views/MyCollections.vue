<script setup>
import { useCollectionStore } from '@/stores/collectionStore.js'
import { onMounted, computed } from 'vue'
import { useCollectionActions } from '@/composables/useCollectionActions.js'
import { useToast } from '@/composables/useToast.js'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const { handleDeleteCollection } = useCollectionActions()
const { showToast } = useToast()

const collectionStore = useCollectionStore()

const myCollections = computed(() => {
  return collectionStore.myCollections
})

onMounted(async () => {
  if (collectionStore.myCollections.length > 0) return
  try {
    await collectionStore.getCollectionsByUserId(authStore.user?.id)
  } catch (error) {
    showToast('Neuspješan dohvat kolekcija!', 'error')
  }
})
</script>

<template>
  <div class="w-full mx-auto px-4 my-8">
    <p class="text-[#ce61fe] p-4 text-2xl">My collections</p>
    <div class="flex flex-col" v-for="(collection, index) in myCollections" :key="collection._id">
      <div
        class="flex items-center w-full rounded-2xl p-4 gap-6"
        :class="index % 2 == 0 ? 'bg-[#460748]' : 'bg-[#171b29]'"
      >
        <img src="../assets/images/quiz.png" class="w-20" />
        <div class="flex w-3/4 flex-col gap-2">
          <p class="text-[#02a5f1] text-xl">{{ collection.title }}</p>
          <p class="text-sm">{{ collection.description }}</p>
          <p>{{ collection.flashcards?.length || 0 }} Cards</p>
        </div>
        <div class="flex flex-col items-end">
          <RouterLink :to="{ name: 'selectedCollection', params: { id: collection._id } }">
            <button
              type="button"
              class="cursor-pointer bg-[#780c7b] hover:bg-[#02a5f1] hover:text-slate-200 px-6 py-2 font-semibold rounded-3xl"
            >
              Start
            </button>
          </RouterLink>
          <div class="flex mt-2">
            <RouterLink :to="{ name: 'create', params: { id: collection._id } }">
              <img
                src="@/assets/images/edit.png"
                class="w-10 h-10 mx-2 hover:rounded-full hover:bg-slate-200 p-2 cursor-pointer"
              />
            </RouterLink>
            <img
              src="@/assets/images/delete.png"
              class="w-10 h-10 hover:rounded-full hover:bg-slate-200 p-2 cursor-pointer"
              @click="handleDeleteCollection(collection._id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
