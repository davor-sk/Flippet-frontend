<script setup>
import { ref, nextTick } from 'vue'
import CreateFlashcard from '@/components/CreateFlashcard.vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const counter = ref(2)

console.log('user_id: ', authStore.user.id)

const collection = ref({
  userId: authStore.user?.id || '',
  title: '',
  subject: '',
  description: '',
  flashcards: [
    {
      id: 1,
      term: '',
      definition: '',
    },
  ],
  createdAt: new Date(),
})

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

function saveCollection() {
  console.log('flashcards:', collection.value)
}
</script>

<template>
  <form>
    <div class="flex flex-col items-center mt-8 w-full">
      <div class="w-8/10 flex flex-col">
        <p class="text-3xl mb-8">Create a new collection</p>

        <div class="mb-10">
          <div class="flex gap-4 mb-6">
            <input
              type="text"
              v-model="collection.title"
              name="title"
              class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
              placeholder="Title"
              required
            />
            <input
              type="text"
              v-model="collection.subject"
              name="subject"
              class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
              placeholder="Subject"
              required
            />
          </div>
          <input
            type="text"
            v-model="collection.description"
            name="description"
            class="bg-white/10 text-white placeholder:text-white/50 border border-white/30 rounded-2xl p-2 w-full h-11 focus-visible:ring-2 ring-white/10 border-b-4"
            placeholder="Add a description..."
            required
          />
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-36 md:pb-24">
          <CreateFlashcard :flashcards="collection.flashcards" @delete-card="deleteCard(i)" />
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
            type="button"
            @click="saveCollection()"
            class="rounded-2xl bg-[#02a5f1] px-4 py-3 font-medium text-white transition hover:opacity-90"
          >
            Save collection
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
