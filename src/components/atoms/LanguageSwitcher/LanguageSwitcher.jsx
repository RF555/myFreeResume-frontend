import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { SUPPORTED_LANGUAGES } from '@/lib/constants'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const next = i18n.language === SUPPORTED_LANGUAGES.HE ? SUPPORTED_LANGUAGES.EN : SUPPORTED_LANGUAGES.HE
    i18n.changeLanguage(next)
    document.documentElement.dir = next === SUPPORTED_LANGUAGES.HE ? 'rtl' : 'ltr'
    document.documentElement.lang = next
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="text-sm font-medium">
      {i18n.language === SUPPORTED_LANGUAGES.HE ? 'EN' : 'עב'}
    </Button>
  )
}
