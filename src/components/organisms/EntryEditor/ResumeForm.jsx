import { useCallback } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { useSortable } from '@dnd-kit/react/sortable'
import { LuGripVertical } from 'react-icons/lu'
import { cn } from '@/lib/utils'

import PersonalInfoSection from './sections/PersonalInfoSection'
import SummarySection from './sections/SummarySection'
import SkillsSection from './sections/SkillsSection'
import ExperienceSection from './sections/ExperienceSection'
import EducationSection from './sections/EducationSection'
import LanguagesSection from './sections/LanguagesSection'
import CustomSectionsSection from './sections/CustomSectionsSection'

const SECTION_MAP = {
  skill_highlights: { Component: SkillsSection, dataKey: 'skill_highlights' },
  experience: { Component: ExperienceSection, dataKey: 'experience' },
  education: { Component: EducationSection, dataKey: 'education' },
  languages: { Component: LanguagesSection, dataKey: 'languages' },
}

const DEFAULT_ORDER = ['skill_highlights', 'experience', 'education', 'languages']

function SortableSection({ id, index, resume, hidden, updateField, onToggleVisibility }) {
  const section = SECTION_MAP[id]
  if (!section) return null

  const { ref, isDragSource } = useSortable({ id, index, group: 'resume-sections' })

  return (
    <div ref={ref} className={cn(isDragSource && 'opacity-60 shadow-xl')}>
      <div className="flex gap-2 items-start">
        <div className="pt-7 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500">
          <LuGripVertical className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <section.Component
            data={resume[section.dataKey]}
            onChange={(val) => updateField(section.dataKey, val)}
            hidden={hidden}
            onToggleVisibility={onToggleVisibility}
          />
        </div>
      </div>
    </div>
  )
}

export default function ResumeForm({ data, onChange, hiddenSections, onToggleVisibility, sectionOrder, onReorderSections }) {
  const resume = data || {}
  const hidden = hiddenSections || {}
  const order = sectionOrder || DEFAULT_ORDER

  const updateField = useCallback((key, value) => {
    onChange({ ...resume, [key]: value })
  }, [resume, onChange])

  const updatePersonal = useCallback((personalData) => {
    onChange({
      ...resume,
      name: personalData.name,
      professional_title: personalData.professional_title,
      contact: personalData.contact,
    })
  }, [resume, onChange])

  const handleDragOver = useCallback((event) => {
    const { source, target } = event.operation
    if (!source || !target || source.id === target.id) return

    const oldIndex = order.indexOf(String(source.id))
    const newIndex = order.indexOf(String(target.id))
    if (oldIndex === -1 || newIndex === -1) return

    const newOrder = [...order]
    const [moved] = newOrder.splice(oldIndex, 1)
    newOrder.splice(newIndex, 0, moved)
    onReorderSections(newOrder)
  }, [order, onReorderSections])

  return (
    <div className="space-y-4">
      <PersonalInfoSection
        data={{ name: resume.name, professional_title: resume.professional_title, contact: resume.contact }}
        onChange={updatePersonal}
        hidden={hidden.personal}
        onToggleVisibility={() => onToggleVisibility('personal')}
      />
      <SummarySection
        data={resume.summary}
        onChange={(val) => updateField('summary', val)}
        hidden={hidden.summary}
        onToggleVisibility={() => onToggleVisibility('summary')}
      />

      <DragDropProvider onDragOver={handleDragOver}>
        <div className="space-y-4">
          {order.map((id, index) => (
            <SortableSection
              key={id}
              id={id}
              index={index}
              resume={resume}
              hidden={hidden[id]}
              updateField={updateField}
              onToggleVisibility={() => onToggleVisibility(id)}
            />
          ))}
        </div>
      </DragDropProvider>

      <CustomSectionsSection
        data={resume.custom_sections}
        onChange={(val) => updateField('custom_sections', val)}
      />
    </div>
  )
}
