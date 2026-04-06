<script setup>
import { useCollectionStore } from '@/stores/collectionStore.js'
import { onMounted, computed } from 'vue'
import { useToast } from '@/composables/useToast.js'

const props = defineProps({
  collections: {
    type: Array,
    default: null,
  },
})

const { showToast } = useToast()

const collectionStore = useCollectionStore()

const displayedCollections = computed(() => {
  if (props.collections) return props.collections
  return collectionStore.collections.slice(0, 5)
})

onMounted(async () => {
  if (props.collections) return
  try {
    await collectionStore.getCollections()
  } catch (error) {
    showToast('Neuspješan dohvat kolekcija!', 'error')
  }
})
</script>

<template>
  <div class="w-full mx-auto px-4 my-8">
    <p class="text-[#ce61fe] py-4 text-2xl">
      {{ collections ? 'Search results' : 'Explore existing flashcards' }}
    </p>
    <div
      class="flex flex-col mb-4 w-full"
      v-for="(collection, index) in displayedCollections"
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
    <p v-if="collections && displayedCollections.length === 0" class="text-white/50 px-4">
      No results
    </p>
  </div>
</template>
