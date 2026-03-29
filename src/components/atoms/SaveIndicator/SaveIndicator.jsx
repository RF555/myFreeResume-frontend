export default function SaveIndicator({ saving }) {
  return (
    <span className="text-sm text-gray-400">
      {saving ? 'Saving...' : 'Saved'}
    </span>
  )
}
