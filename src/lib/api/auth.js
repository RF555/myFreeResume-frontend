import { apiJson, setAccessToken } from './client'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function login(email, password) {
  const data = await apiJson('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  setAccessToken(data.access_token)
  return data
}

export async function register(email, password, name) {
  const data = await apiJson('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  })
  setAccessToken(data.access_token)
  return data
}

export async function logout() {
  await apiJson('/api/auth/logout', { method: 'POST' })
  setAccessToken(null)
}

export function getOAuthUrl(provider) {
  return `${API_URL}/api/auth/oauth/${provider}`
}
