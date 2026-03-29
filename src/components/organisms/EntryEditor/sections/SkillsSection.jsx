import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { LuCode, LuPlus, LuX } from 'react-icons/lu'
import SectionHeader from '../SectionHeader'

export default function SkillsSection({ data, onChange, hidden, onToggleVisibility }) {
  const [input, setInput] = useState('')
  const items = data || []

  const add = () => { const v = input.trim(); if (v && !items.includes(v)) { onChange([...items, v]); setInput('') } }
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))

  return (
    <Card className={hidden ? 'opacity-50' : ''}>
      <div className="px-6 pt-6">
        <SectionHeader icon={LuCode} title="Skill Highlights" hidden={hidden} onToggleVisibility={onToggleVisibility} />
      </div>
      <CardContent>
        <div className="flex gap-2 mb-3">
          <Input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
            placeholder="Type a skill and press Enter..." className="h-8 text-sm" />
          <Button type="button" size="sm" variant="outline" onClick={add} className="h-8 px-2"><LuPlus className="w-3 h-3" /></Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((skill, i) => (
            <Badge key={i} variant="secondary" className="gap-1 pr-1">
              {skill}
              <Button type="button" size="sm" variant="ghost" className="h-4 w-4 p-0 hover:bg-transparent" onClick={() => remove(i)}><LuX className="w-3 h-3" /></Button>
            </Badge>
          ))}
        </div>
        {items.length === 0 && <p className="text-sm text-gray-400 text-center py-2">No skills added yet.</p>}
      </CardContent>
    </Card>
  )
}
