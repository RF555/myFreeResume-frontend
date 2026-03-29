import { useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { LuGripVertical } from 'react-icons/lu'

import PersonalInfoSection from './sections/PersonalInfoSection'
import SummarySection from './sections/SummarySection'
import SkillsSection from './sections/SkillsSection'
import ExperienceSection from './sections/ExperienceSection'
import EducationSection from './sections/EducationSection'
import LanguagesSection from './sections/LanguagesSection'
import CustomSectionsSection from './sections/CustomSectionsSection'

const DRAGGABLE_SECTIONS = [
  { id: 'skill_highlights', Component: SkillsSection, dataKey: 'skill_highlights' },
  { id: 'experience', Component: ExperienceSection, dataKey: 'experience' },
  { id: 'education', Component: EducationSection, dataKey: 'education' },
  { id: 'languages', Component: LanguagesSection, dataKey: 'languages' },
]

export default function ResumeForm({ data, onChange, hiddenSections, onToggleVisibility, sectionOrder, onReorderSections }) {
  const resume = data || {}
  const hidden = hiddenSections || {}
  const order = sectionOrder || DRAGGABLE_SECTIONS.map(s => s.id)

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

  const onDragEnd = useCallback((result) => {
    if (!result.destination) return
    const newOrder = [...order]
    const [moved] = newOrder.splice(result.source.index, 1)
    newOrder.splice(result.destination.index, 0, moved)
    onReorderSections(newOrder)
  }, [order, onReorderSections])

  const orderedSections = order
    .map(id => DRAGGABLE_SECTIONS.find(s => s.id === id))
    .filter(Boolean)

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

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="resume-sections">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
              {orderedSections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} className={snapshot.isDragging ? 'opacity-80 shadow-xl' : ''}>
                      <div className="flex gap-2 items-start">
                        <div {...provided.dragHandleProps} className="pt-7 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500">
                          <LuGripVertical className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <section.Component
                            data={resume[section.dataKey]}
                            onChange={(val) => updateField(section.dataKey, val)}
                            hidden={hidden[section.id]}
                            onToggleVisibility={() => onToggleVisibility(section.id)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <CustomSectionsSection
        data={resume.custom_sections}
        onChange={(val) => updateField('custom_sections', val)}
      />
    </div>
  )
}
