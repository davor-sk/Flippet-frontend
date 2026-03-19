<script setup>
import { computed } from 'vue'
import happyRobot from '@/assets/images/happy_robot.png'
import sadRobot from '@/assets/images/sad_robot.png'

const props = defineProps({
  result: {
    type: Number,
    required: true,
  },
  learnedCards: {
    type: Array,
    required: true,
  },
  notLearnedCards: {
    type: Array,
    required: true,
  },
  activeCards: {
    type: Array,
    required: true,
  },
  elapsedTime: {
    type: String,
    required: true,
  },
})

const isPassed = computed(() => props.result >= 51)

const emits = defineEmits(['retryWrong', 'retryAll'])
</script>

<template>
  <div class="flex flex-col items-center my-8 w-full">
    <div class="flex flex-col items-center">
      <p
        class="text-3xl text-center md:text-5xl mb-4 font-bold bg-linear-to-r from-[#22d3ee] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent"
      >
        {{ isPassed ? 'CONGRATULATIONS!' : 'ALMOST THERE!' }}
      </p>
      <img :src="isPassed ? happyRobot : sadRobot" class="w-1/2" />
      <div class="grid grid-cols-3 gap-8 my-8">
        <div class="flex flex-col items-center text-md md:text-lg py-4">
          {{ learnedCards.length }} / {{ activeCards.length }} <br />
          <p>Points</p>
        </div>
        <div class="flex flex-col items-center text-md md:text-lg border-x-2 py-4 px-8">
          {{ result }}%
          <p>Accuracy</p>
        </div>
        <div class="flex flex-col items-center text-md md:text-lg py-4">
          <p>Time spent:</p>
          {{ elapsedTime }}
        </div>
      </div>
      <div class="mb-4">
        <p class="text-2xl font-bold">
          {{ isPassed ? 'One more round?' : 'You’re close. Try again?' }}
        </p>
      </div>
    </div>

    <div>
      <button
        type="button"
        class="cursor-pointer me-2 border-2 border-[#780c7b] bg-[#780c7b] hover:bg-[#02a5f1] hover:border-[#02a5f1] hover:text-slate-200 px-5 py-2 font-bold rounded-2xl w-full mb-3 disabled:bg-white/30 disabled:text-slate-200 disabled:cursor-not-allowed disabled:border-white/30"
        :disabled="notLearnedCards.length === 0"
        @click="$emit('retryWrong')"
      >
        Retry the ones you got wrong
      </button>
      <button
        type="button"
        class="block cursor-pointer me-2 bg-[#171b29] text-center border-2 border-white/30 text-neutral-300 hover:bg-white/30 hover:text-slate-200 px-5 py-2 font-semibold rounded-2xl w-full hover:ring-1 hover:border-white/30"
        @click="$emit('retryAll')"
      >
        Retry all
      </button>
    </div>
  </div>
</template>
