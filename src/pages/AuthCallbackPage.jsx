import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth'

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams()
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = searchParams.get('access_token')
    if (accessToken) {
      loginUser(accessToken)
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }, [searchParams, loginUser, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Authenticating...</p>
    </div>
  )
}
