<script setup>
import { useCollectionStore } from '@/stores/collectionStore.js'
import { onMounted, computed } from 'vue'

const collectionStore = useCollectionStore()

const firstFiveCollections = computed(() => {
  return collectionStore.collections.slice(0, 5)
})

onMounted(async () => {
  try {
    await collectionStore.getCollections()
    console.log('collectionStore: ', collectionStore)
  } catch (error) {
    console.error('Neuspješan dohvat kolekcija!')
  }
})
</script>

<template>
  <div class="w-full mx-auto px-4 my-8">
    <p class="text-[#ce61fe] p-4 text-2xl">Explore existing flashcards</p>
    <div
      class="flex flex-col p-4"
      v-for="(collection, index) in firstFiveCollections"
      :key="collection._id"
    >
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
        <div class="flex items-start justify-end me-2">
          <RouterLink :to="{ name: 'selectedCollection', params: { id: collection._id } }">
            <button
              type="button"
              class="cursor-pointer bg-[#780c7b] hover:bg-[#02a5f1] hover:text-slate-200 px-6 py-2 font-semibold rounded-3xl"
            >
              Start
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
