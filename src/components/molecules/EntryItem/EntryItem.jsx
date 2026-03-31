import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDeleteEntry, useUpdateEntry } from '@/hooks/useEntries'
import CloneEntryDialog from '@/components/molecules/CloneEntryDialog/CloneEntryDialog'

export default function EntryItem({ entry, jobTypeId }) {
  const { t } = useTranslation()
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState(entry.company_name)
  const { mutate: deleteEntry } = useDeleteEntry()
  const { mutate: updateEntry } = useUpdateEntry()

  const handleRename = () => {
    updateEntry({ id: entry.id, data: { company_name: editName } })
    setEditing(false)
  }

  return (
    <div className="flex items-center justify-between py-2 px-4 border-b last:border-b-0">
      {editing ? (
        <div className="flex gap-2">
          <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="w-64" />
          <Button size="sm" onClick={handleRename}>{t('common.save')}</Button>
          <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>{t('common.cancel')}</Button>
        </div>
      ) : (
        <Link to={`/entry/${entry.id}`} className="text-blue-600 hover:underline font-medium">
          {entry.company_name}
        </Link>
      )}
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>{t('common.rename')}</Button>
        <CloneEntryDialog entryId={entry.id} currentJobTypeId={jobTypeId} />
        <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteEntry(entry.id)}>
          {t('common.delete')}
        </Button>
      </div>
    </div>
  )
}
