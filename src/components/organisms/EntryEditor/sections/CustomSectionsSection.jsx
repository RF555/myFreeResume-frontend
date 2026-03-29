import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LuLayoutList, LuPlus, LuTrash2, LuX } from 'react-icons/lu'

export default function CustomSectionsSection({ data, onChange }) {
  const sections = data || []

  const addSection = () => onChange([...sections, { title: '', items: [] }])
  const removeSection = (i) => onChange(sections.filter((_, idx) => idx !== i))
  const updateSection = (i, updated) => { const s = [...sections]; s[i] = updated; onChange(s) }

  const addItem = (si) => {
    const s = { ...sections[si], items: [...(sections[si].items || []), ''] }
    updateSection(si, s)
  }
  const removeItem = (si, ii) => {
    const s = { ...sections[si], items: sections[si].items.filter((_, idx) => idx !== ii) }
    updateSection(si, s)
  }
  const editItem = (si, ii, val) => {
    const items = [...sections[si].items]; items[ii] = val
    updateSection(si, { ...sections[si], items })
  }

  return (
    <div className="space-y-4">
      {sections.map((sec, si) => (
        <Card key={si}>
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2 flex-1">
                <LuLayoutList className="w-4 h-4" />
                <Input value={sec.title} onChange={(e) => updateSection(si, { ...sec, title: e.target.value })} placeholder="Section Title" className="h-8 text-base font-semibold border-none shadow-none p-0 focus-visible:ring-0" />
              </div>
              <Button type="button" size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-400 hover:text-red-600" onClick={() => removeSection(si)}><LuTrash2 className="w-3.5 h-3.5" /></Button>
            </div>
          </div>
          <CardContent className="space-y-1">
            {(sec.items || []).map((item, ii) => (
              <div key={ii} className="flex gap-2 items-center">
                <span className="text-gray-400 text-xs">•</span>
                <Input value={item} onChange={(e) => editItem(si, ii, e.target.value)} className="h-7 text-sm flex-1" />
                <Button type="button" size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-400" onClick={() => removeItem(si, ii)}><LuX className="w-3 h-3" /></Button>
              </div>
            ))}
            <Button type="button" size="sm" variant="ghost" onClick={() => addItem(si)} className="gap-1 text-xs"><LuPlus className="w-3 h-3" /> Add item</Button>
          </CardContent>
        </Card>
      ))}
      <Button type="button" variant="outline" onClick={addSection} className="w-full gap-1">
        <LuPlus className="w-4 h-4" /> Add Custom Section
      </Button>
    </div>
  )
}
