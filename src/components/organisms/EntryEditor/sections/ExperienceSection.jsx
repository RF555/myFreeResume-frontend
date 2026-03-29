import { useFieldArray } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function BulletList({ control, register, basePath }) {
  const { fields, append, remove } = useFieldArray({ control, name: basePath })
  return (
    <div className="space-y-1 pl-4">
      {fields.map((field, i) => (
        <div key={field.id} className="flex gap-2">
          <Input placeholder="Bullet point" {...register(`${basePath}.${i}`)} className="text-sm" />
          <Button type="button" variant="ghost" size="sm" onClick={() => remove(i)}>x</Button>
        </div>
      ))}
      <Button type="button" variant="ghost" size="sm" onClick={() => append('')}>+ Add bullet</Button>
    </div>
  )
}

export default function ExperienceSection({ control, register }) {
  const { fields, append, remove } = useFieldArray({ control, name: 'resume.experience' })

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-[#224E76]">Professional Experience</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="border rounded p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input placeholder="Role" {...register(`resume.experience.${index}.role`)} />
            <Input placeholder="Company" {...register(`resume.experience.${index}.company`)} />
            <Input placeholder="Start Date" {...register(`resume.experience.${index}.start_date`)} />
            <Input placeholder="End Date" {...register(`resume.experience.${index}.end_date`)} />
          </div>
          <BulletList control={control} register={register} basePath={`resume.experience.${index}.bullets`} />
          <Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => remove(index)}>Remove Entry</Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append({ company: '', role: '', start_date: '', end_date: '', bullets: [] })}>Add Experience</Button>
    </div>
  )
}
