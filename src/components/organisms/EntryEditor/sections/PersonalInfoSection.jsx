import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LuUser } from 'react-icons/lu'
import SectionHeader from '../SectionHeader'

export default function PersonalInfoSection({ data, onChange, hidden, onToggleVisibility }) {
  const d = data || {}
  const contact = d.contact || {}
  const set = (key, val) => onChange({ ...d, [key]: val })
  const setContact = (key, val) => onChange({ ...d, contact: { ...contact, [key]: val } })

  return (
    <Card className={hidden ? 'opacity-50' : ''}>
      <div className="px-6 pt-6">
        <SectionHeader icon={LuUser} title="Personal Information" hidden={hidden} onToggleVisibility={onToggleVisibility} />
      </div>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Full Name</Label><Input value={d.name || ''} onChange={(e) => set('name', e.target.value)} /></div>
          <div><Label>Professional Title</Label><Input value={d.professional_title || ''} onChange={(e) => set('professional_title', e.target.value)} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Email</Label><Input value={contact.email || ''} onChange={(e) => setContact('email', e.target.value)} /></div>
          <div><Label>Phone</Label><Input value={contact.phone || ''} onChange={(e) => setContact('phone', e.target.value)} /></div>
          <div><Label>LinkedIn</Label><Input value={contact.linkedin || ''} onChange={(e) => setContact('linkedin', e.target.value)} /></div>
          <div><Label>Location</Label><Input value={contact.location || ''} onChange={(e) => setContact('location', e.target.value)} /></div>
        </div>
      </CardContent>
    </Card>
  )
}
