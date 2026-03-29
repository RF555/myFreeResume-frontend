import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function SummarySection({ register }) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg text-[#224E76]">Professional Summary</h3>
      <Label htmlFor="resume.summary">Summary</Label>
      <Textarea id="resume.summary" rows={4} {...register('resume.summary')} />
    </div>
  )
}
