import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateJobType } from '@/hooks/useJobTypes'

export default function CreateJobTypeDialog() {
  const { t } = useTranslation()
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
        <Button>{t('jobType.newJobType')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{t('jobType.createJobType')}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="jt-name">{t('jobType.namePlaceholder')}</Label>
            <Input id="jt-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isPending}>{isPending ? t('common.creating') : t('common.create')}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
