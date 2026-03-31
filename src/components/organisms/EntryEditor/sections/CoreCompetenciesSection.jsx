import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DragDropProvider } from '@dnd-kit/react'
import { useSortable } from '@dnd-kit/react/sortable'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LuTarget, LuPlus } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/organisms/EntryEditor/SectionHeader'
import EditableBadge from '@/components/atoms/EditableBadge/EditableBadge'

function SortableItem({ id, index, item, onEdit, onRemove }) {
  const { ref, isDragSource } = useSortable({ id, index, group: 'competencies' })

  return (
    <div ref={ref} className={cn('inline-flex', isDragSource && 'opacity-50')}>
      <EditableBadge value={item} onEdit={onEdit} onRemove={onRemove} />
    </div>
  )
}

export default function CoreCompetenciesSection({ data, onChange, hidden, onToggleVisibility }) {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const items = data || []

  const add = () => { const v = input.trim(); if (v && !items.includes(v)) { onChange([...items, v]); setInput('') } }
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  const edit = (i, newValue) => { const updated = [...items]; updated[i] = newValue; onChange(updated) }

  const handleDragOver = useCallback((event) => {
    const { source, target } = event.operation
    if (!source || !target || source.id === target.id) return

    const oldIndex = items.indexOf(String(source.id))
    const newIndex = items.indexOf(String(target.id))
    if (oldIndex === -1 || newIndex === -1) return

    const newItems = [...items]
    const [moved] = newItems.splice(oldIndex, 1)
    newItems.splice(newIndex, 0, moved)
    onChange(newItems)
  }, [items, onChange])

  return (
    <Card className={cn(hidden && 'opacity-50')}>
      <div className="px-6 pt-6">
        <SectionHeader icon={LuTarget} title={t('resume.coreCompetencies')} hidden={hidden} onToggleVisibility={onToggleVisibility} />
      </div>
      <CardContent>
        <div className="flex gap-2 mb-3">
          <Input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
            placeholder={t('resume.competencyPlaceholder')} className="h-8 text-sm" />
          <Button type="button" size="sm" variant="outline" onClick={add} className="h-8 px-2"><LuPlus className="w-3 h-3" /></Button>
        </div>
        <DragDropProvider onDragOver={handleDragOver}>
          <div className="flex flex-wrap gap-2">
            {items.map((item, i) => (
              <SortableItem key={item} id={item} index={i} item={item} onEdit={(v) => edit(i, v)} onRemove={() => remove(i)} />
            ))}
          </div>
        </DragDropProvider>
        {items.length === 0 && <p className="text-sm text-gray-400 text-center py-2">{t('resume.noCompetencies')}</p>}
      </CardContent>
    </Card>
  )
}
