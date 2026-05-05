import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LuUser } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/organisms/EntryEditor/SectionHeader'

export default function PersonalInfoSection({ data, onChange, hidden, onToggleVisibility }) {
  const { t } = useTranslation()
  const d = data || {}
  const contact = d.contact || {}
  const set = (key, val) => onChange({ ...d, [key]: val })
  const setContact = (key, val) => onChange({ ...d, contact: { ...contact, [key]: val } })

  return (
    <Card className={cn(hidden && 'opacity-50')}>
      <div className="px-6 pt-6">
        <SectionHeader icon={LuUser} title={t('resume.personalInfo')} hidden={hidden} onToggleVisibility={onToggleVisibility} />
      </div>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>
              {t('resume.fullName')}{' '}
              <span className="text-red-500" aria-label={t('resume.fullNameRequired')}>*</span>
            </Label>
            <Input
              value={d.name || ''}
              onChange={(e) => set('name', e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <div><Label>{t('resume.professionalTitle')}</Label><Input value={d.professional_title || ''} onChange={(e) => set('professional_title', e.target.value)} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>{t('resume.email')}</Label><Input value={contact.email || ''} onChange={(e) => setContact('email', e.target.value)} /></div>
          <div><Label>{t('resume.phone')}</Label><Input value={contact.phone || ''} onChange={(e) => setContact('phone', e.target.value)} /></div>
          <div><Label>{t('resume.linkedin')}</Label><Input value={contact.linkedin || ''} onChange={(e) => setContact('linkedin', e.target.value)} /></div>
          <div><Label>{t('resume.github')}</Label><Input value={contact.github || ''} onChange={(e) => setContact('github', e.target.value)} /></div>
          <div><Label>{t('resume.location')}</Label><Input value={contact.location || ''} onChange={(e) => setContact('location', e.target.value)} /></div>
        </div>
      </CardContent>
    </Card>
  )
}
