import { useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateJobType } from '@/hooks/useJobTypes'

export default function CreateJobTypeDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const { mutate, isPending } = useCreateJobType()

  const handleSubmit = (e) => {
    e.preventDefault()
    mutate(name, { onSuccess: () => { setOpen(false); setName('') } })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Job Type</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Create Job Type</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="jt-name">Name (e.g. Frontend Developer)</Label>
            <Input id="jt-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isPending}>{isPending ? 'Creating...' : 'Create'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
