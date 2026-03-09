import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const URL_express_users = 'http://localhost:3000/users'

export const useAuthStore = defineStore(
  'auth',
  () => {
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

    const register = async (first_name, last_name, username, email, password) => {
      try {
        const { data } = await axios.post(`${URL_express_users}/register`, {
          first_name,
          last_name,
          username,
          email,
          password,
        })

        return data
      } catch (error) {
        console.error('Greška: ', error)
        throw error
      }
    }

    const patchUser = async (userId, username, email, old_password, password) => {
      try {
        const payload = {}
        if (username) payload.username = username
        if (email) payload.email = email
        if (old_password) payload.old_password = old_password
        if (password) payload.password = password

        const { data } = await axios.patch(`${URL_express_users}/settings/${userId}`, payload)
        if (data.user) {
          user.value = data.user
        }
        return data
      } catch (error) {
        console.error('Greška:', error.response?.data || error.message)
        throw error
      }
    }

    const deleteUser = async (userId) => {
      try {
        const { data } = await axios.delete(`${URL_express_users}/settings/${userId}`)
        return data.message
      } catch (error) {
        console.error('Greška:', error.response?.data || error.message)
        throw error
      }
    }

    const logout = () => {
      user.value = null
    }

    return { user, login, register, logout, patchUser, deleteUser }
  },
  { persist: true },
)
