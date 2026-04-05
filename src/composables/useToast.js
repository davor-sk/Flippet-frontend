import { ref } from 'vue'

const message = ref('')
const type = ref('')
const visible = ref(false)

export function useToast() {
  const showToast = (msg, toastType = 'info', duration = 3000) => {
    message.value = msg
    type.value = toastType
    visible.value = true
    setTimeout(() => (visible.value = false), duration)
  }

  return { message, type, visible, showToast }
}
