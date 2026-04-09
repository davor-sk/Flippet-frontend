import { jwtDecode } from 'jwt-decode'

export function isTokenExpired(token) {
  if (!token) return true

  try {
    const payload = jwtDecode(token)
    const now = Math.floor(Date.now() / 1000)
    return payload.exp < now
  } catch (error) {
    return true
  }
}
