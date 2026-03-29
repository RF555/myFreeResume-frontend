import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useDeleteEntry } from '@/hooks/useEntries'
import CloneEntryDialog from '@/components/molecules/CloneEntryDialog/CloneEntryDialog'

export default function EntryItem({ entry, jobTypeId }) {
  const { mutate: deleteEntry } = useDeleteEntry()

  return (
    <div className="flex items-center justify-between py-2 px-4 border-b last:border-b-0">
      <Link to={`/entry/${entry.id}`} className="text-blue-600 hover:underline font-medium">
        {entry.company_name}
      </Link>
      <div className="flex gap-2">
        <CloneEntryDialog entryId={entry.id} currentJobTypeId={jobTypeId} />
        <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteEntry(entry.id)}>
          Delete
        </Button>
      </div>
    </div>
  )
}
