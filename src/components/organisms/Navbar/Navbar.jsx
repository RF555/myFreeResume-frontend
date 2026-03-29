import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { logout } from '@/lib/api/auth'

export default function Navbar() {
  const { user, logoutUser } = useAuth()

  const handleLogout = async () => {
    await logout()
    logoutUser()
  }

  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-[#6B4C3B]">
          <img src="/logo.svg" alt="" className="h-8 w-8" />
          myFreeResume
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
