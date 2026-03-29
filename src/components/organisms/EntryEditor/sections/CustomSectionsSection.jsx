import { useFieldArray } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function ItemList({ control, register, basePath }) {
  const { fields, append, remove } = useFieldArray({ control, name: basePath })
  return (
    <div className="space-y-1 pl-4">
      {fields.map((field, i) => (
        <div key={field.id} className="flex gap-2">
          <Input {...register(`${basePath}.${i}`)} className="text-sm" />
          <Button type="button" variant="ghost" size="sm" onClick={() => remove(i)}>x</Button>
        </div>
      ))}
      <Button type="button" variant="ghost" size="sm" onClick={() => append('')}>+ Add item</Button>
    </div>
  )
}

export default function CustomSectionsSection({ control, register }) {
  const { fields, append, remove } = useFieldArray({ control, name: 'resume.custom_sections' })

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-[#224E76]">Custom Sections</h3>
      {fields.map((field, sIndex) => (
        <div key={field.id} className="border rounded p-4 space-y-3">
          <Input placeholder="Section Title" {...register(`resume.custom_sections.${sIndex}.title`)} className="font-semibold" />
          <ItemList control={control} register={register} basePath={`resume.custom_sections.${sIndex}.items`} />
          <Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => remove(sIndex)}>Remove Section</Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append({ title: '', items: [] })}>Add Custom Section</Button>
    </div>
  )
}
