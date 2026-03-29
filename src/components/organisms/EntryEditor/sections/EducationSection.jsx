import { useFieldArray } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function EducationSection({ control, register }) {
  const { fields, append, remove } = useFieldArray({ control, name: 'resume.education' })

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-[#224E76]">Education</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="border rounded p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input placeholder="Degree" {...register(`resume.education.${index}.degree`)} />
            <Input placeholder="Institution" {...register(`resume.education.${index}.institution`)} />
            <Input placeholder="Start Date" {...register(`resume.education.${index}.start_date`)} />
            <Input placeholder="End Date" {...register(`resume.education.${index}.end_date`)} />
          </div>
          <Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append({ institution: '', degree: '', start_date: '', end_date: '' })}>Add Education</Button>
    </div>
  )
}
