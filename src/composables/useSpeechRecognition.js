import { ref } from 'vue'

export function useSpeechRecognition(onTranscript) {
  const isListening = ref(false)
  const activeField = ref(null)
  let recognition = null

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  const stopListening = () => {
    if (recognition && isListening.value) {
      recognition.stop()
    }
  }
  const startListening = ({ index, field }) => {
    if (!SpeechRecognition) {
      alert('Speech-to-text nije podrzan u ovom browseru.')
      return
    }

    if (isListening.value) {
      stopListening()
      return
    }

    recognition = new SpeechRecognition()
    recognition.lang = 'hr-HR'
    recognition.interimResults = false
    recognition.continuous = false

    activeField.value = { index, field }

    recognition.onstart = () => {
      isListening.value = true
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim()
      onTranscript({ index, field, transcript })
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      isListening.value = false
      activeField.value = null
    }

    recognition.onend = () => {
      isListening.value = false
      activeField.value = null
    }
    recognition.start()
  }

  return { startListening, isListening, activeField }
}
