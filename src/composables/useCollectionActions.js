import { useCollectionStore } from '@/stores/collectionStore'
import { useToast } from '@/composables/useToast.js'
import { useRouter } from 'vue-router'

export function useCollectionActions() {
  const router = useRouter()
  const { showToast } = useToast()
  const collectionStore = useCollectionStore()

  const handleDeleteCollection = async (id) => {
    const confirmed = window.confirm(
      'Jesi siguran da želiš obrisati kolekciju? Ova radnja se ne može poništiti.',
    )
    if (!confirmed) return
    try {
      await collectionStore.deleteCollection(id)
      showToast('Kolekcija uspješno obrisana!', 'success')
      router.push('/mycollections')
    } catch (error) {
      showToast('Neuspješno brisanje kolekcije!', 'error')
    }
  }

  return { handleDeleteCollection }
}
