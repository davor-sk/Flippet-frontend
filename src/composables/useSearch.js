import { useCollectionStore } from '@/stores/collectionStore'
import { computed, ref } from 'vue'

const searchQuery = ref('')

export function useSearch() {
  const collectionStore = useCollectionStore()

  const searchResults = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()
    if (query.length < 3) return []

    return collectionStore.collections.filter((collection) => {
      return (
        collection.title?.toLowerCase().startsWith(query) ||
        collection.subject?.toLowerCase().startsWith(query)
      )
    })
  })
  return { searchQuery, searchResults }
}
