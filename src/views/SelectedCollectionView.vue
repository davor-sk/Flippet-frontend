<script setup>
import { useCollectionStore } from '@/stores/collectionStore.js'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const collectionStore = useCollectionStore()

const currentCardIndex = ref(0)
const showAnswer = ref(false)
const isFinished = ref(false)

const learnedCards = ref([])
const notLearnedCards = ref([])

const flashcards = computed(() => {
  return collectionStore.selectedCollection?.flashcards || {}
})

const currentCard = computed(() => {
  return flashcards.value[currentCardIndex.value] || null
})

const nextCard = () => {
  if (currentCardIndex.value < flashcards.value.length - 1) {
    currentCardIndex.value++
    showAnswer.value = false
  } else {
    isFinished.value = true
  }
}

const markLearned = () => {
  learnedCards.value.push(currentCard.value)
  nextCard()
}

const markNotLearned = () => {
  notLearnedCards.value.push(currentCard.value)
  nextCard()
}

const result = computed(() => {
  let res = (learnedCards.value.length / flashcards.value.length).toFixed(2)
  console.log(res)
  return res * 100
})

onMounted(async () => {
  try {
    const collectionId = route.params.id
    await collectionStore.getCollectionById(collectionId)
    console.log('id:', route.params.id)
  } catch (error) {
    console.error('Neuspješan dohvat kolekcija!')
  }
})
</script>

<template>
  <div class="flex flex-col items-center mt-8 w-full">
    <div v-if="isFinished">
      <div v-if="result < 51">
        <img src="../assets/images/sad_robot.png" />
      </div>
      <div v-else>
        <img src="../assets/images/happy_robot.png" />
      </div>
    </div>
    <div v-else class="flex w-7/10 justify-center my-8">
      <div class="flex flex-col justify-center w-full max-w-5xl">
        <p class="text-3xl text-[#02a5f1] mb-6">{{ collectionStore.selectedCollection?.title }}</p>
        <div class="flex justify-between mb-2 px-4">
          <p>Click to flip</p>
          <p class="text-lg">{{ currentCardIndex + 1 }}/{{ flashcards.length }}</p>
        </div>
        <div
          class="flex items-center justify-center text-2xl bg-[#171b29] p-4 rounded-2xl cursor-pointer h-70"
          @click="showAnswer = !showAnswer"
        >
          <p v-if="!showAnswer">{{ currentCard?.term }}</p>
          <p v-else>{{ currentCard?.definition }}</p>
        </div>
        <div class="flex justify-center mt-4">
          <div class="flex items-center pe-8">
            <span class="text-xl pe-2 text-[#02a5f1] font-semibold">{{
              notLearnedCards.length
            }}</span>
            <img
              class="w-14 cursor-pointer"
              src="../assets/images/cancel.png"
              @click="markNotLearned()"
            />
          </div>
          <div class="flex items-center">
            <img
              class="w-14 cursor-pointer"
              src="../assets/images/check_circle.png"
              @click="markLearned()"
            />
            <span class="text-xl ps-2 text-[#e418d3] font-semibold">{{ learnedCards.length }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
