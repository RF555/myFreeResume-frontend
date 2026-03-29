import { apiPublic, setAccessToken, clearAccessToken } from './client'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function login(email, password) {
  const data = await apiPublic('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  setAccessToken(data.access_token)
  return data
}

export async function register(email, password, name) {
  const data = await apiPublic('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  })
  setAccessToken(data.access_token)
  return data
}

export async function logout() {
  try {
    await apiPublic('/api/auth/logout', { method: 'POST' })
  } catch {
    // Logout may fail if session is already expired
  }
  clearAccessToken()
}

export function getOAuthUrl(provider) {
  return `${API_URL}/api/auth/oauth/${provider}`
}
