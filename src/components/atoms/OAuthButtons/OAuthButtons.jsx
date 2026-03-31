import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { getOAuthUrl } from '@/lib/api/auth'

export default function OAuthButtons() {
  const { t } = useTranslation()
  return (
    <div className="space-y-2">
      <Button variant="outline" className="w-full" asChild>
        <a href={getOAuthUrl('google')}>{t('auth.continueWithGoogle')}</a>
      </Button>
      <Button variant="outline" className="w-full" asChild>
        <a href={getOAuthUrl('github')}>{t('auth.continueWithGitHub')}</a>
      </Button>
      <Button variant="outline" className="w-full" asChild>
        <a href={getOAuthUrl('linkedin')}>{t('auth.continueWithLinkedIn')}</a>
      </Button>
    </div>
  )
}
