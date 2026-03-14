<script setup>
const props = defineProps({
  flashcards: {
    type: Array,
    required: true,
  },
  isListening: Boolean,
  activeField: Object,
})
const emits = defineEmits(['deleteCard', 'startListening'])
</script>

<template>
  <div
    v-for="(flashcard, index) in flashcards"
    :key="flashcard.id"
    :id="`flashcard_${flashcard.id}`"
  >
    <div class="flex justify-between bg-white/10 rounded-t-2xl mb-2 p-4">
      <p class="text-[#02a5f1] text-xl">#{{ index + 1 }}</p>
      <button type="button" class="cursor-pointer" @click="$emit('deleteCard', index)">
        <img src="@/assets/images/delete.png" class="w-6" />
      </button>
    </div>
    <div class="flex flex-col justify-between bg-white/10 p-4 rounded-b-2xl mb-4">
      <div class="relative w-full">
        <label :for="`term_${flashcard.id}`">TERM</label>
        <textarea
          rows="2"
          :id="`term_${flashcard.id}`"
          v-model="flashcard.term"
          :name="`term_${flashcard.id}`"
          class="text-white border border-[#02a5f1] rounded-xl p-2 w-full focus-visible:ring-2 ring-white/10 mb-4 mt-2 pr-16"
          required
        ></textarea>
        <button
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          @click="$emit('startListening', { index, field: 'term' })"
        >
          <img
            src="@/assets/images/mic.png"
            class="w-6 transition-transform duration-200"
            :class="{
              'scale-150 opacity-70':
                isListening && activeField?.index === index && activeField?.field === 'term',
            }"
          />
        </button>
      </div>
      <div class="relative w-full">
        <label :for="`definition_${flashcard.id}`" class="mb-2">DEFINITION</label>
        <textarea
          v-model="flashcard.definition"
          :id="`definition_${flashcard.id}`"
          rows="3"
          :name="`definition${flashcard.id}`"
          class="text-white border border-[#02a5f1] rounded-xl p-2 w-full focus-visible:ring-2 ring-white/10 mt-2"
          required
        ></textarea>
        <button
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          @click="$emit('startListening', { index, field: 'definition' })"
        >
          <img
            src="@/assets/images/mic.png"
            class="w-6 transition-transform duration-200"
            :class="{
              'scale-150 opacity-70':
                isListening && activeField?.index === index && activeField?.field === 'definition',
            }"
          />
        </button>
      </div>
    </div>
  </div>
</template>
