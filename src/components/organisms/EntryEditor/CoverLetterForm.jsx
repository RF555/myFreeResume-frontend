import { useFieldArray } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function CoverLetterForm({ register, control }) {
  const { fields, append, remove } = useFieldArray({ control, name: 'cover_letter.body_paragraphs' })

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-[#224E76]">Addressee</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cl.name">Hiring Manager Name</Label>
          <Input id="cl.name" {...register('cover_letter.addressee_name')} />
        </div>
        <div>
          <Label htmlFor="cl.company">Company</Label>
          <Input id="cl.company" {...register('cover_letter.addressee_company')} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cl.date">Date</Label>
          <Input id="cl.date" {...register('cover_letter.date')} />
        </div>
        <div>
          <Label htmlFor="cl.subject">Subject</Label>
          <Input id="cl.subject" {...register('cover_letter.subject')} />
        </div>
      </div>

      <h3 className="font-semibold text-lg text-[#224E76]">Body</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <Textarea rows={3} {...register(`cover_letter.body_paragraphs.${index}`)} />
          <Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append('')}>Add Paragraph</Button>

      <div>
        <Label htmlFor="cl.closing">Closing</Label>
        <Input id="cl.closing" {...register('cover_letter.closing')} placeholder="Best regards" />
      </div>
    </div>
  )
}
