import { createContext, useState, useEffect, useCallback } from 'react'
import { setAccessToken, clearAccessToken, getAccessToken } from '@/lib/api/client'
import { apiJson } from '@/lib/api/client'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    try {
      if (!getAccessToken()) {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/auth/refresh`,
          { method: 'POST', credentials: 'include' }
        )
        if (res.ok) {
          const data = await res.json()
          setAccessToken(data.access_token)
        } else {
          setLoading(false)
          return
        }
      }
      const userData = await apiJson('/api/users/me')
      setUser(userData)
    } catch {
      setUser(null)
      clearAccessToken()
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const loginUser = useCallback((token) => {
    setAccessToken(token)
    fetchUser()
  }, [fetchUser])

  const logoutUser = useCallback(() => {
    clearAccessToken()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}
