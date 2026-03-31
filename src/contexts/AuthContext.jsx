import { createContext, useState, useEffect, useCallback, useRef } from 'react'
import { setAccessToken, clearAccessToken, getAccessToken, apiJson, API_URL } from '@/lib/api/client'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const didInit = useRef(false)

  const fetchUser = useCallback(async () => {
    try {
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
    if (didInit.current) return
    didInit.current = true

    const init = async () => {
      if (getAccessToken()) {
        await fetchUser()
        return
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        })
        if (res.ok) {
          const data = await res.json()
          setAccessToken(data.access_token)
          await fetchUser()
        } else {
          setLoading(false)
        }
      } catch {
        setLoading(false)
      }
    }

    init()
  }, [fetchUser])

  const loginUser = useCallback(async (token) => {
    setAccessToken(token)
    await fetchUser()
  }, [fetchUser])

  const logoutUser = useCallback(() => {
    clearAccessToken()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}
