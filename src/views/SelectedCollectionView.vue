<script setup>
import { useCollectionStore } from '@/stores/collectionStore.js'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Results from '@/components/Results.vue'
import { useToast } from '@/composables/useToast.js'

const { showToast } = useToast()

const route = useRoute()
const collectionStore = useCollectionStore()

const currentCardIndex = ref(0)
const showAnswer = ref(false)
const isFinished = ref(false)

const startTime = ref(null)
const endTime = ref(null)

const activeCards = ref([])
const learnedCards = ref([])
const notLearnedCards = ref([])

const originalCards = computed(() => {
  return collectionStore.selectedCollection?.flashcards || []
})

const currentCard = computed(() => {
  return activeCards.value[currentCardIndex.value] || null
})

const nextCard = () => {
  if (currentCardIndex.value < activeCards.value.length - 1) {
    currentCardIndex.value++
    showAnswer.value = false
  } else {
    endTime.value = Date.now()
    isFinished.value = true
  }
}

const markLearned = () => {
  if (!currentCard.value) return
  learnedCards.value.push(currentCard.value)
  nextCard()
}

const markNotLearned = () => {
  if (!currentCard.value) return
  notLearnedCards.value.push(currentCard.value)
  nextCard()
}

const result = computed(() => {
  if (!activeCards.value.length) return 0
  return Math.round((learnedCards.value.length / activeCards.value.length) * 100)
})

const elapsedTime = computed(() => {
  if (!startTime.value || !endTime.value) return '0s'
  const totalSeconds = Math.floor((endTime.value - startTime.value) / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}m ${seconds}s`
})

const retryWrong = () => {
  const wrongCards = [...notLearnedCards.value]

  activeCards.value = wrongCards
  currentCardIndex.value = 0
  isFinished.value = false
  showAnswer.value = false
  learnedCards.value = []
  notLearnedCards.value = []
  startTime.value = Date.now()
  endTime.value = null
}

const retryAll = () => {
  isFinished.value = false
  showAnswer.value = false
  learnedCards.value = []
  startTime.value = Date.now()
  endTime.value = null
  currentCardIndex.value = 0
  activeCards.value = [...originalCards.value]
  notLearnedCards.value = []
}

watch(
  () => route.params.id,
  async (newId) => {
    if (!newId) return

    try {
      await collectionStore.getCollectionById(newId)
      retryAll()
    } catch (error) {
      showToast('Neuspješan dohvat kolekcije!', 'error')
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="flex flex-col items-center mt-8 w-full">
    <div v-if="isFinished">
      <Results
        :result="result"
        :learned-cards="learnedCards"
        :not-learned-cards="notLearnedCards"
        :active-cards="activeCards"
        :elapsed-time="elapsedTime"
        @retry-wrong="retryWrong"
        @retry-all="retryAll"
      />
    </div>
    <div v-else class="flex w-7/10 justify-center my-8">
      <div class="flex flex-col justify-center w-full max-w-5xl">
        <p class="text-3xl text-[#02a5f1] mb-6">{{ collectionStore.selectedCollection?.title }}</p>
        <div class="flex justify-between mb-2 px-4">
          <p>Click to flip</p>
          <p class="text-lg">{{ currentCardIndex + 1 }}/{{ activeCards.length }}</p>
        </div>
        <div class="cursor-pointer h-70 perspective-[1000px]" @click="showAnswer = !showAnswer">
          <div
            class="relative w-full h-full transform-3d transition-transform duration-500 ease-in-out"
            :class="{ 'transform-[rotateX(180deg)]': showAnswer }"
          >
            <div
              class="absolute inset-0 backface-hidden flex items-center justify-center bg-[#171b29] rounded-2xl p-4"
            >
              <p class="text-xl font-medium">{{ currentCard?.term }}</p>
            </div>
            <div
              class="absolute inset-0 backface-hidden transform-[rotateX(180deg)] flex items-center justify-center bg-[#1e2436] rounded-2xl p-4"
            >
              <p class="text-xl font-medium">{{ currentCard?.definition }}</p>
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <div class="flex items-center pe-8">
            <span class="text-xl pe-2 text-[#02a5f1] font-semibold">{{
              notLearnedCards.length
            }}</span>
            <img
              class="w-18 cursor-pointer"
              src="../assets/images/cancel.png"
              @click="markNotLearned()"
            />
          </div>
          <div class="flex items-center">
            <img
              class="w-18 cursor-pointer"
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
