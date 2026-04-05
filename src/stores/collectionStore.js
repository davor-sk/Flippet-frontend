import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const URL_express_collections = 'http://localhost:3000/collections'

export const useCollectionStore = defineStore('collection', () => {
  const collections = ref([])
  const selectedCollection = ref(null)
  const myCollections = ref([])

  const addCollection = async (collectionToAdd) => {
    try {
      const { data } = await axios.post(`${URL_express_collections}`, collectionToAdd)
      myCollections.value.push(data)
    } catch (error) {
      console.error('Greška: ', error)
      throw error
    }
  }

  const getCollections = async () => {
    try {
      const { data } = await axios.get(`${URL_express_collections}`)
      collections.value = data
      return data
    } catch (error) {
      console.error('Greška: ', error)
      throw error
    }
  }

  const getCollectionById = async (id) => {
    try {
      const { data } = await axios.get(`${URL_express_collections}/${id}`)
      selectedCollection.value = data
    } catch (error) {
      console.error('Greška: ', error)
      throw error
    }
  }

  const getCollectionsByUserId = async (userId) => {
    try {
      const { data } = await axios.get(`${URL_express_collections}/user/${userId}`)
      myCollections.value = data
    } catch (error) {
      console.error('Greška: ', error)
      throw error
    }
  }

  const deleteCollection = async (collectionId) => {
    try {
      await axios.delete(`${URL_express_collections}/delete/${collectionId}`)
      const index = myCollections.value.findIndex((coll) => coll._id === collectionId)
      if (index !== -1) {
        myCollections.value.splice(index, 1)
      }
    } catch (error) {
      console.error('Greška: ', error)
      throw error
    }
  }

  return {
    collections,
    addCollection,
    getCollections,
    getCollectionById,
    selectedCollection,
    getCollectionsByUserId,
    myCollections,
    deleteCollection,
  }
})
