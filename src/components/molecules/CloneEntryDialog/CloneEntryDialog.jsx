import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCloneEntry } from '@/hooks/useEntries'
import { useJobTypes } from '@/hooks/useJobTypes'

export default function CloneEntryDialog({ entryId, currentJobTypeId }) {
  const { t } = useTranslation()
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
        <Button variant="ghost" size="sm">{t('common.clone')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{t('cloneDialog.cloneEntry')}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="clone-jt">{t('cloneDialog.targetJobType')}</Label>
            <select id="clone-jt" className="w-full border rounded px-3 py-2" value={targetJobTypeId} onChange={(e) => setTargetJobTypeId(e.target.value)}>
              {jobTypes?.map((jt) => <option key={jt.id} value={jt.id}>{jt.name}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="clone-company">{t('cloneDialog.newCompanyName')}</Label>
            <Input id="clone-company" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isPending}>{isPending ? t('common.cloning') : t('common.clone')}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
