import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import Navbar from '@/components/organisms/Navbar/Navbar'

export default function LandingPage() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <img src="/logo.svg" alt="myFreeResume" className="h-24 w-24 mx-auto mb-8" />
        <h1 className="text-5xl font-bold text-brand mb-6">
          {t('landing.headline')}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t('landing.subheadline')}
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/register">
            <Button size="lg" className="bg-brand hover:bg-brand-dark">
              {t('landing.getStartedFree')}
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline">{t('nav.signIn')}</Button>
          </Link>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{t('landing.feature1Title')}</h3>
            <p className="text-gray-600">{t('landing.feature1Desc')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{t('landing.feature2Title')}</h3>
            <p className="text-gray-600">{t('landing.feature2Desc')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{t('landing.feature3Title')}</h3>
            <p className="text-gray-600">{t('landing.feature3Desc')}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
