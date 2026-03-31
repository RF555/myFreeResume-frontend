import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { LuFileText } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/organisms/EntryEditor/SectionHeader'

export default function SummarySection({ data, onChange, hidden, onToggleVisibility }) {
  return (
    <Card className={cn(hidden && 'opacity-50')}>
      <div className="px-6 pt-6">
        <SectionHeader icon={LuFileText} title="Professional Summary" hidden={hidden} onToggleVisibility={onToggleVisibility} />
      </div>
      <CardContent>
        <Textarea value={data || ''} onChange={(e) => onChange(e.target.value)} rows={4} placeholder="Write a brief professional summary..." />
      </CardContent>
    </Card>
  )
}
