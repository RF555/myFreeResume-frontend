import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useEntry } from '@/hooks/useEntries'
import Navbar from '@/components/organisms/Navbar/Navbar'
import EntryEditor from '@/components/organisms/EntryEditor/EntryEditor'

export default function EntryPage() {
  const { t } = useTranslation()
  const { id } = useParams()
  const { data: entry, isLoading } = useEntry(id)

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><p>{t('common.loading')}</p></div>
  if (!entry) return <div className="min-h-screen flex items-center justify-center"><p>{t('entry.notFound')}</p></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <EntryEditor entry={entry} />
    </div>
  )
}
