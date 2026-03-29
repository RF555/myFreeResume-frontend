import { Button } from '@/components/ui/button'
import { getOAuthUrl } from '@/lib/api/auth'

export default function OAuthButtons() {
  return (
    <div className="space-y-2">
      <Button variant="outline" className="w-full" asChild>
        <a href={getOAuthUrl('google')}>Continue with Google</a>
      </Button>
      <Button variant="outline" className="w-full" asChild>
        <a href={getOAuthUrl('github')}>Continue with GitHub</a>
      </Button>
      <Button variant="outline" className="w-full" asChild>
        <a href={getOAuthUrl('linkedin')}>Continue with LinkedIn</a>
      </Button>
    </div>
  )
}
