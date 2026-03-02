import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const URL_express_users = 'http://localhost:3000/users'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${URL_express_users}/login`, { email, password })
      user.value = data.user
      return data
    } catch (error) {
      console.error('Greška: ', error)
      throw error
    }
  }

  const register = async (first_name, last_name, email, password) => {
    try {
      const { data } = await axios.post(`${URL_express_users}/register`, {
        first_name,
        last_name,
        email,
        password,
      })

      return data
    } catch (error) {
      console.error('Greška: ', error)
      throw error
    }
  }

  return { user, login, register }
})
