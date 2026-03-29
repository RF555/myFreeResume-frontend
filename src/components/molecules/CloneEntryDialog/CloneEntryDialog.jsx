import { useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCloneEntry } from '@/hooks/useEntries'
import { useJobTypes } from '@/hooks/useJobTypes'

export default function CloneEntryDialog({ entryId, currentJobTypeId }) {
  const [open, setOpen] = useState(false)
  const [company, setCompany] = useState('')
  const [targetJobTypeId, setTargetJobTypeId] = useState(currentJobTypeId)
  const { mutate, isPending } = useCloneEntry()
  const { data: jobTypes } = useJobTypes()

  const handleSubmit = (e) => {
    e.preventDefault()
    mutate({ id: entryId, jobTypeId: targetJobTypeId, companyName: company }, { onSuccess: () => { setOpen(false); setCompany('') } })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">Clone</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Clone Entry</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="clone-jt">Target Job Type</Label>
            <select id="clone-jt" className="w-full border rounded px-3 py-2" value={targetJobTypeId} onChange={(e) => setTargetJobTypeId(e.target.value)}>
              {jobTypes?.map((jt) => <option key={jt.id} value={jt.id}>{jt.name}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="clone-company">New Company Name</Label>
            <Input id="clone-company" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isPending}>{isPending ? 'Cloning...' : 'Clone'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
