import { useFieldArray } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SkillsSection({ control, register }) {
  const { fields, append, remove } = useFieldArray({ control, name: 'resume.skill_highlights' })

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg text-[#224E76]">Skill Highlights</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <Input {...register(`resume.skill_highlights.${index}`)} />
          <Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append('')}>Add Skill</Button>
    </div>
  )
}
