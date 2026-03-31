import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import LanguageSwitcher from '@/components/atoms/LanguageSwitcher/LanguageSwitcher'
import { useAuth } from '@/hooks/useAuth'
import { logout } from '@/lib/api/auth'

export default function Navbar() {
  const { t } = useTranslation()
  const { user, logoutUser } = useAuth()

  const handleLogout = async () => {
    await logout()
    logoutUser()
  }

  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-brand">
          <img src="/logo.svg" alt="" className="h-8 w-8" />
          {t('nav.brandName')}
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          {user ? (
            <>
              <Link to="/profile">
                <Button variant="ghost">{t('nav.profile')}</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost">{t('nav.dashboard')}</Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>{t('nav.signOut')}</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">{t('nav.signIn')}</Button>
              </Link>
              <Link to="/register">
                <Button>{t('nav.getStarted')}</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
