import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { LuPlus, LuTrash2 } from 'react-icons/lu'

export default function CoverLetterForm({ data, onChange }) {
  const cl = data || {}
  const set = (key, val) => onChange({ ...cl, [key]: val })
  const paragraphs = cl.body_paragraphs || []

  const addParagraph = () => set('body_paragraphs', [...paragraphs, ''])
  const removeParagraph = (i) => set('body_paragraphs', paragraphs.filter((_, idx) => idx !== i))
  const editParagraph = (i, val) => { const p = [...paragraphs]; p[i] = val; set('body_paragraphs', p) }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg text-[#224E76] mb-4">Addressee</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Hiring Manager Name</Label><Input value={cl.addressee_name || ''} onChange={(e) => set('addressee_name', e.target.value)} /></div>
          <div><Label>Company</Label><Input value={cl.addressee_company || ''} onChange={(e) => set('addressee_company', e.target.value)} /></div>
          <div><Label>Date</Label><Input value={cl.date || ''} onChange={(e) => set('date', e.target.value)} /></div>
          <div><Label>Subject</Label><Input value={cl.subject || ''} onChange={(e) => set('subject', e.target.value)} /></div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-lg text-[#224E76] mb-4">Body</h3>
        {paragraphs.map((p, i) => (
          <div key={i} className="flex gap-2 mb-3">
            <Textarea rows={3} value={p} onChange={(e) => editParagraph(i, e.target.value)} className="flex-1" />
            <Button type="button" variant="ghost" size="sm" className="text-red-400 hover:text-red-600" onClick={() => removeParagraph(i)}><LuTrash2 className="w-4 h-4" /></Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addParagraph} className="gap-1"><LuPlus className="w-3 h-3" /> Add Paragraph</Button>
      </div>
      <div>
        <Label>Closing</Label>
        <Input value={cl.closing || ''} onChange={(e) => set('closing', e.target.value)} placeholder="Best regards" />
      </div>
    </div>
  )
}
