<script setup>
import { ref, nextTick, computed } from 'vue'
import CreateFlashcard from '@/components/CreateFlashcard.vue'
import { useAuthStore } from '@/stores/authStore.js'
import { useSpeechRecognition } from '@/composables/useSpeechRecognition.js'
import { useCollectionStore } from '@/stores/collectionStore.js'

const authStore = useAuthStore()
const collecionStore = useCollectionStore()
const counter = ref(2)

console.log('user_id: ', authStore.user?.id)

const collection = ref({
  userId: authStore.user?.id || '',
  title: '',
  category: '',
  description: '',
  flashcards: [
    {
      id: 1,
      term: '',
      definition: '',
    },
  ],
})

const { startListening, isListening, activeField } = useSpeechRecognition(
  ({ index, field, transcript }) => {
    collection.value.flashcards[index][field] = transcript
  },
)

function deleteCard(index) {
  if (collection.value.flashcards.length === 1) return
  collection.value.flashcards.splice(index, 1)
}

async function addCard() {
  const newId = counter.value
  collection.value.flashcards.push({
    id: counter.value,
    term: '',
    definition: '',
  })
  counter.value++
  console.log('flashcards:', collection.value)
  console.log('counter:', counter.value)

  await nextTick()
  const newCard = document.getElementById(`flashcard_${newId}`)

  if (newCard) {
    newCard.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
    newCard.querySelector('textarea')?.focus()
  }

  console.log('new card:', newCard)
}

const isTitleValid = computed(() => collection.value.title.trim().length >= 2)
const isCategoryValid = computed(() => collection.value.category.trim().length >= 2)
const isDescriptionValid = computed(() => collection.value.description.trim().length >= 4)

const saveCollection = async () => {
  try {
    const cleanedFlashcards = collection.value.flashcards.filter(
      (card) => card.term.trim() !== '' && card.definition.trim() !== '',
    )
    if (
      !isTitleValid.value ||
      !isCategoryValid.value ||
      !isDescriptionValid.value ||
      cleanedFlashcards.length === 0
    ) {
      return
    }
    const payload = {
      ...collection.value,
      flashcards: cleanedFlashcards,
    }
    await collecionStore.addCollection(payload)
  } catch (error) {
    console.error('Neuspješna izrada kolekcije!', error.response?.data || error.message || error)
  }
}
</script>

<template>
  <form @submit.prevent="saveCollection">
    <div class="flex flex-col items-center mt-8 w-full">
      <div class="w-8/10 flex flex-col">
        <p class="text-3xl mb-8">Create a new collection</p>

        <div class="mb-10">
          <div class="flex gap-4">
            <div
              :class="['flex flex-col w-full', collection.title && !isTitleValid ? 'mb-2' : 'mb-6']"
            >
              <input
                type="text"
                v-model="collection.title"
                name="title"
                class="bg-[#171b29] text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
                placeholder="Title"
                required
              />
              <span
                :class="
                  collection.title && !isTitleValid
                    ? 'block text-red-400 text-sm mb-4 mt-2'
                    : 'hidden'
                "
                >Title is required!</span
              >
            </div>
            <div
              :class="[
                'flex flex-col w-full',
                collection.category && !isCategoryValid ? 'mb-2' : 'mb-6',
              ]"
            >
              <input
                type="text"
                v-model="collection.category"
                name="category"
                class="bg-[#171b29] text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
                placeholder="Category"
                required
              />
              <span
                :class="
                  collection.category && !isCategoryValid
                    ? 'block text-red-400 text-sm mb-4 mt-2'
                    : 'hidden'
                "
                >Category is required!</span
              >
            </div>
          </div>
          <div
            :class="[
              'flex flex-col w-full',
              collection.description && !isDescriptionValid ? 'mb-2' : 'mb-4',
            ]"
          >
            <input
              type="text"
              v-model="collection.description"
              name="description"
              class="bg-[#171b29] text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
              placeholder="Add a description..."
              required
            />
            <span
              :class="
                collection.description && !isDescriptionValid
                  ? 'block text-red-400 text-sm mb-4 mt-2'
                  : 'hidden'
              "
              >Description is required!</span
            >
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-36 md:pb-24">
          <CreateFlashcard
            :flashcards="collection.flashcards"
            :is-listening="isListening"
            :active-field="activeField"
            @delete-card="deleteCard"
            @start-listening="startListening"
          />
        </div>
      </div>
    </div>
    <div
      class="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0b0f19]/95 backdrop-blur-md"
    >
      <div
        class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="text-sm text-white/70">
          {{ collection.flashcards.length }}
          {{ collection.flashcards.length === 1 ? 'card' : 'cards' }}
        </div>

        <div class="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            @click="addCard()"
            class="rounded-2xl border border-[#02a5f1] px-4 py-3 text-white transition hover:bg-[#02a5f1]/10"
          >
            Add card
          </button>

          <button
            type="submit"
            class="rounded-2xl bg-[#02a5f1] px-4 py-3 font-medium text-white transition hover:opacity-90"
          >
            Save collection
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
