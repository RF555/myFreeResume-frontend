import { useTranslation } from 'react-i18next'

export default function SaveIndicator({ saving }) {
  const { t } = useTranslation()
  return (
    <span className="text-sm text-gray-400">
      {saving ? t('common.saving') : t('common.saved')}
    </span>
  )
}
