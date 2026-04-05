<script setup>
import { useToast } from '@/composables/useToast.js'

const { visible, message, type } = useToast()
</script>

<template>
  <Transition name="fade">
    <div
      v-if="visible"
      :class="[
        'fixed top-6 right-6 z-50 px-6 py-3 rounded-2xl text-white font-medium shadow-lg',
        type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : 'bg-[#02a5f1]',
      ]"
    >
      {{ message }}
    </div>
  </Transition>
</template>
