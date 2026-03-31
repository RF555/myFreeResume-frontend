import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateEntry } from '@/hooks/useEntries'

export default function CreateEntryDialog({ jobTypeId }) {
  const { t } = useTranslation()
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
        <Button variant="outline" size="sm">{t('entryDialog.addEntry')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{t('entryDialog.newEntry')}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="company">{t('entryDialog.companyLabel')}</Label>
            <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isPending}>{isPending ? t('common.creating') : t('common.create')}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
