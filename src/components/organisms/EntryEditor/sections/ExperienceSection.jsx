import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LuBriefcase, LuPencil, LuTrash2 } from 'react-icons/lu'
import SectionHeader from '../SectionHeader'
import ItemModal, { formatYearRange } from '../ItemModal'

const SCHEMA = [
  { key: 'years', label: 'Years', type: 'yearRange' },
  { key: 'role', label: 'Job Title', type: 'text', placeholder: 'Software Engineer' },
  { key: 'company', label: 'Company', type: 'text', placeholder: 'Company Name' },
  { key: 'bullets', label: 'Responsibilities / Achievements', type: 'bullets' },
]

export default function ExperienceSection({ data, onChange, hidden, onToggleVisibility }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const items = data || []

  const openAdd = () => { setEditingIndex(null); setModalOpen(true) }
  const openEdit = (i) => { setEditingIndex(i); setModalOpen(true) }
  const handleSave = (item) => {
    if (editingIndex === null) onChange([...items, item])
    else { const updated = [...items]; updated[editingIndex] = item; onChange(updated) }
  }
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))

  return (
    <Card className={hidden ? 'opacity-50' : ''}>
      <div className="px-6 pt-6">
        <SectionHeader icon={LuBriefcase} title="Professional Experience" onAdd={openAdd} hidden={hidden} onToggleVisibility={onToggleVisibility} />
      </div>
      <CardContent className="space-y-2">
        {items.length === 0 && <p className="text-sm text-gray-400 text-center py-2">No experience added yet.</p>}
        {items.map((exp, i) => (
          <div key={i} className="border rounded-lg px-4 py-3 bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{exp.role || 'Untitled'}</p>
                <p className="text-xs text-gray-500">{[exp.company, formatYearRange(exp.years)].filter(Boolean).join(' · ')}</p>
              </div>
              <div className="flex gap-1 ml-2 flex-shrink-0">
                <Button type="button" size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => openEdit(i)}><LuPencil className="w-3 h-3" /></Button>
                <Button type="button" size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-400 hover:text-red-600" onClick={() => remove(i)}><LuTrash2 className="w-3 h-3" /></Button>
              </div>
            </div>
            {(exp.bullets || []).length > 0 && (
              <ul className="mt-2 space-y-0.5">
                {exp.bullets.map((b, j) => <li key={j} className="text-xs text-gray-600 flex gap-1.5"><span className="text-gray-400">•</span><span>{b}</span></li>)}
              </ul>
            )}
          </div>
        ))}
      </CardContent>
      <ItemModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} schema={SCHEMA}
        initialData={editingIndex !== null ? items[editingIndex] : null}
        title={editingIndex !== null ? 'Edit Experience' : 'Add Experience'} />
    </Card>
  )
}
