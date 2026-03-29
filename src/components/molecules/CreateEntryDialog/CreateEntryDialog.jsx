import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateEntry } from '@/hooks/useEntries'

export default function CreateEntryDialog({ jobTypeId }) {
  const [open, setOpen] = useState(false)
  const [company, setCompany] = useState('')
  const { mutate, isPending } = useCreateEntry()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    mutate({ jobTypeId, companyName: company }, {
      onSuccess: (data) => {
        setOpen(false)
        setCompany('')
        navigate(`/entry/${data.id}`)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Add Entry</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>New Entry</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="company">Company / Recruiter</Label>
            <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isPending}>{isPending ? 'Creating...' : 'Create'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
