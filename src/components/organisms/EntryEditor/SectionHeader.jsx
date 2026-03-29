import { Button } from '@/components/ui/button'
import { LuPlus, LuEye, LuEyeOff } from 'react-icons/lu'

export default function SectionHeader({ icon: Icon, title, onAdd, hidden, onToggleVisibility }) {
  return (
    <div className="flex items-center justify-between pb-3">
      <div className="flex items-center gap-2">
        {onToggleVisibility && (
          <Button type="button" size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={onToggleVisibility} title={hidden ? 'Show in export' : 'Hide from export'}>
            {hidden ? <LuEyeOff className="w-3.5 h-3.5 text-gray-400" /> : <LuEye className="w-3.5 h-3.5 text-gray-500" />}
          </Button>
        )}
        <h3 className="flex items-center gap-2 text-base font-semibold">
          {Icon && <Icon className="w-4 h-4" />} {title}
        </h3>
      </div>
      {onAdd && (
        <Button type="button" size="sm" variant="outline" onClick={onAdd} className="gap-1 h-8">
          <LuPlus className="w-3 h-3" /> Add
        </Button>
      )}
    </div>
  )
}
