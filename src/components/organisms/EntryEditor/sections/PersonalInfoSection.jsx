import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function PersonalInfoSection({ register }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-[#224E76]">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="resume.name">Full Name</Label>
          <Input id="resume.name" {...register('resume.name')} />
        </div>
        <div>
          <Label htmlFor="resume.professional_title">Professional Title</Label>
          <Input id="resume.professional_title" {...register('resume.professional_title')} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="resume.contact.email">Email</Label>
          <Input id="resume.contact.email" {...register('resume.contact.email')} />
        </div>
        <div>
          <Label htmlFor="resume.contact.phone">Phone</Label>
          <Input id="resume.contact.phone" {...register('resume.contact.phone')} />
        </div>
        <div>
          <Label htmlFor="resume.contact.linkedin">LinkedIn</Label>
          <Input id="resume.contact.linkedin" {...register('resume.contact.linkedin')} />
        </div>
        <div>
          <Label htmlFor="resume.contact.location">Location</Label>
          <Input id="resume.contact.location" {...register('resume.contact.location')} />
        </div>
      </div>
    </div>
  )
}
