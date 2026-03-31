import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DragDropProvider } from '@dnd-kit/react'
import { useSortable } from '@dnd-kit/react/sortable'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LuLayers, LuPlus, LuPencil, LuTrash2, LuGripVertical } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/organisms/EntryEditor/SectionHeader'
import EditableBadge from '@/components/atoms/EditableBadge/EditableBadge'

function SortableSkill({ id, index, skill, onEdit, onRemove }) {
  const { ref, isDragSource } = useSortable({ id, index, group: 'category-skills' })

  return (
    <div ref={ref} className={cn('inline-flex', isDragSource && 'opacity-50')}>
      <EditableBadge value={skill} onEdit={onEdit} onRemove={onRemove} />
    </div>
  )
}

function CategoryEditor({ category, onSave, onCancel }) {
  const { t } = useTranslation()
  const [name, setName] = useState(category?.name || '')
  const [skills, setSkills] = useState(category?.skills || [])
  const [skillInput, setSkillInput] = useState('')

  const addSkill = () => {
    const v = skillInput.trim()
    if (v && !skills.includes(v)) {
      setSkills([...skills, v])
      setSkillInput('')
    }
  }

  const removeSkill = (i) => setSkills(skills.filter((_, idx) => idx !== i))
  const editSkill = (i, newValue) => { const updated = [...skills]; updated[i] = newValue; setSkills(updated) }

  const handleSkillDragOver = useCallback((event) => {
    const { source, target } = event.operation
    if (!source || !target || source.id === target.id) return
    const oldIndex = skills.indexOf(String(source.id))
    const newIndex = skills.indexOf(String(target.id))
    if (oldIndex === -1 || newIndex === -1) return
    const newSkills = [...skills]
    const [moved] = newSkills.splice(oldIndex, 1)
    newSkills.splice(newIndex, 0, moved)
    setSkills(newSkills)
  }, [skills])

  const handleSave = () => {
    if (name.trim()) {
      onSave({ name: name.trim(), skills })
    }
  }

  return (
    <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
      <div>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('resume.skillCategoryNamePlaceholder')}
          className="h-8 text-sm"
        />
      </div>
      <div className="flex gap-2">
        <Input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
          placeholder={t('resume.skillCategorySkillPlaceholder')}
          className="h-8 text-sm"
        />
        <Button type="button" size="sm" variant="outline" onClick={addSkill} className="h-8 px-2">
          <LuPlus className="w-3 h-3" />
        </Button>
      </div>
      <DragDropProvider onDragOver={handleSkillDragOver}>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <SortableSkill key={skill} id={skill} index={i} skill={skill} onEdit={(v) => editSkill(i, v)} onRemove={() => removeSkill(i)} />
          ))}
        </div>
      </DragDropProvider>
      <div className="flex gap-2 justify-end">
        <Button type="button" size="sm" variant="outline" onClick={onCancel}>{t('common.cancel')}</Button>
        <Button type="button" size="sm" onClick={handleSave}>{t('common.save')}</Button>
      </div>
    </div>
  )
}

function SortableCategory({ id, index, cat, onEdit, onRemove }) {
  const { ref, isDragSource } = useSortable({ id, index, group: 'categories' })

  return (
    <div ref={ref} className={cn('flex items-center gap-2 px-4 py-3 border rounded-lg', isDragSource && 'opacity-50')}>
      <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500">
        <LuGripVertical className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <span className="font-medium text-sm">{cat.name}</span>
        {cat.skills.length > 0 && (
          <span className="text-sm text-gray-500"> | {cat.skills.join(' | ')}</span>
        )}
      </div>
      <div className="flex gap-1">
        <Button type="button" size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={onEdit}>
          <LuPencil className="w-3.5 h-3.5" />
        </Button>
        <Button type="button" size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-400 hover:text-red-600" onClick={onRemove}>
          <LuTrash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  )
}

export default function SkillCategoriesSection({ data, onChange, hidden, onToggleVisibility }) {
  const { t } = useTranslation()
  const [editingIndex, setEditingIndex] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const categories = data || []

  const handleSave = (category) => {
    if (editingIndex !== null) {
      const updated = [...categories]
      updated[editingIndex] = category
      onChange(updated)
      setEditingIndex(null)
    } else {
      onChange([...categories, category])
      setIsAdding(false)
    }
  }

  const handleRemove = (i) => onChange(categories.filter((_, idx) => idx !== i))

  const handleCategoryDragOver = useCallback((event) => {
    const { source, target } = event.operation
    if (!source || !target || source.id === target.id) return
    const oldIndex = categories.findIndex((c) => c.name === String(source.id))
    const newIndex = categories.findIndex((c) => c.name === String(target.id))
    if (oldIndex === -1 || newIndex === -1) return
    const newCategories = [...categories]
    const [moved] = newCategories.splice(oldIndex, 1)
    newCategories.splice(newIndex, 0, moved)
    onChange(newCategories)
  }, [categories, onChange])

  return (
    <Card className={cn(hidden && 'opacity-50')}>
      <div className="px-6 pt-6">
        <SectionHeader
          icon={LuLayers}
          title={t('resume.technicalSkills')}
          hidden={hidden}
          onToggleVisibility={onToggleVisibility}
          onAdd={() => setIsAdding(true)}
        />
      </div>
      <CardContent>
        <DragDropProvider onDragOver={handleCategoryDragOver}>
          <div className="space-y-3">
            {categories.map((cat, i) => (
              editingIndex === i ? (
                <CategoryEditor
                  key={i}
                  category={cat}
                  onSave={handleSave}
                  onCancel={() => setEditingIndex(null)}
                />
              ) : (
                <SortableCategory
                  key={cat.name}
                  id={cat.name}
                  index={i}
                  cat={cat}
                  onEdit={() => setEditingIndex(i)}
                  onRemove={() => handleRemove(i)}
                />
              )
            ))}
          </div>
        </DragDropProvider>
        {isAdding && (
          <CategoryEditor
            category={null}
            onSave={handleSave}
            onCancel={() => setIsAdding(false)}
          />
        )}
        {categories.length === 0 && !isAdding && (
          <p className="text-sm text-gray-400 text-center py-2">{t('resume.noSkillCategories')}</p>
        )}
      </CardContent>
    </Card>
  )
}
