import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { LuLayers, LuPlus, LuX, LuPencil, LuTrash2 } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/organisms/EntryEditor/SectionHeader'

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
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <Badge key={skill} variant="secondary" className="gap-1 pr-1">
            {skill}
            <Button type="button" size="sm" variant="ghost" className="h-4 w-4 p-0 hover:bg-transparent" onClick={() => removeSkill(i)}>
              <LuX className="w-3 h-3" />
            </Button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" size="sm" variant="outline" onClick={onCancel}>{t('common.cancel')}</Button>
        <Button type="button" size="sm" onClick={handleSave}>{t('common.save')}</Button>
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
              <div key={i} className="flex items-center justify-between px-4 py-3 border rounded-lg">
                <div>
                  <span className="font-medium text-sm">{cat.name}</span>
                  {cat.skills.length > 0 && (
                    <span className="text-sm text-gray-500"> | {cat.skills.join(' | ')}</span>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button type="button" size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setEditingIndex(i)}>
                    <LuPencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button type="button" size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-400 hover:text-red-600" onClick={() => handleRemove(i)}>
                    <LuTrash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            )
          ))}
          {isAdding && (
            <CategoryEditor
              category={null}
              onSave={handleSave}
              onCancel={() => setIsAdding(false)}
            />
          )}
        </div>
        {categories.length === 0 && !isAdding && (
          <p className="text-sm text-gray-400 text-center py-2">{t('resume.noSkillCategories')}</p>
        )}
      </CardContent>
    </Card>
  )
}
