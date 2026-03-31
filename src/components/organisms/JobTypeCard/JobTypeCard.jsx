import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEntries } from '@/hooks/useEntries'
import { useUpdateJobType, useDeleteJobType } from '@/hooks/useJobTypes'
import CreateEntryDialog from '@/components/molecules/CreateEntryDialog/CreateEntryDialog'
import EntryItem from '@/components/molecules/EntryItem/EntryItem'

export default function JobTypeCard({ jobType }) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState(jobType.name)
  const { data: entries, isLoading } = useEntries(expanded ? jobType.id : null)
  const { mutate: updateJT } = useUpdateJobType()
  const { mutate: deleteJT } = useDeleteJobType()

  const handleRename = () => {
    updateJT({ id: jobType.id, name: editName })
    setEditing(false)
  }

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          {editing ? (
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="w-64" />
              <Button size="sm" onClick={handleRename}>{t('common.save')}</Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>{t('common.cancel')}</Button>
            </div>
          ) : (
            <CardTitle className="text-lg">{jobType.name}</CardTitle>
          )}
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>{t('common.rename')}</Button>
            <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteJT(jobType.id)}>{t('common.delete')}</Button>
          </div>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent>
          {isLoading ? (
            <p className="text-gray-500 text-sm">{t('common.loading')}</p>
          ) : entries?.length === 0 ? (
            <p className="text-gray-400 text-sm">{t('dashboard.noEntries')}</p>
          ) : (
            entries?.map((entry) => <EntryItem key={entry.id} entry={entry} jobTypeId={jobType.id} />)
          )}
          <div className="mt-4">
            <CreateEntryDialog jobTypeId={jobType.id} />
          </div>
        </CardContent>
      )}
    </Card>
  )
}
