const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

let accessToken = null

export function setAccessToken(token) {
  accessToken = token
}

export function getAccessToken() {
  return accessToken
}

export function clearAccessToken() {
  accessToken = null
}

export async function apiFetch(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  })

  if (response.status === 401 && accessToken) {
    const refreshed = await refreshToken()
    if (refreshed) {
      headers['Authorization'] = `Bearer ${accessToken}`
      return fetch(`${API_URL}${path}`, { ...options, headers, credentials: 'include' })
    }
  }

  return response
}

async function refreshToken() {
  try {
    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
    if (response.ok) {
      const data = await response.json()
      accessToken = data.access_token
      return true
    }
  } catch {
    // Refresh failed
  }
  accessToken = null
  return false
}

export async function apiJson(path, options = {}) {
  const response = await apiFetch(path, options)
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }))
    throw new Error(error.detail || 'Request failed')
  }
  return response.json()
}

export async function apiBlob(path) {
  const response = await apiFetch(path)
  if (!response.ok) {
    throw new Error('Download failed')
  }
  return response.blob()
}
