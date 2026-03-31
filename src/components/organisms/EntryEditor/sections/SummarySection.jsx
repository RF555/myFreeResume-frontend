import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { LuFileText } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/organisms/EntryEditor/SectionHeader'

export default function SummarySection({ data, onChange, hidden, onToggleVisibility }) {
  const { t } = useTranslation()
  return (
    <Card className={cn(hidden && 'opacity-50')}>
      <div className="px-6 pt-6">
        <SectionHeader icon={LuFileText} title={t('resume.summary')} hidden={hidden} onToggleVisibility={onToggleVisibility} />
      </div>
      <CardContent>
        <Textarea value={data || ''} onChange={(e) => onChange(e.target.value)} rows={4} placeholder={t('resume.summaryPlaceholder')} />
      </CardContent>
    </Card>
  )
}
