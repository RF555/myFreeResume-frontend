import { useState, useRef, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LuX, LuGripVertical } from 'react-icons/lu'

export default function EditableBadge({ value, onEdit, onRemove, draggable = true }) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const commit = () => {
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== value) {
      onEdit(trimmed)
    }
    setEditing(false)
    setEditValue(value)
  }

  const cancel = () => {
    setEditing(false)
    setEditValue(value)
  }

  if (editing) {
    return (
      <Input
        ref={inputRef}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') { e.preventDefault(); commit() }
          if (e.key === 'Escape') cancel()
        }}
        onBlur={commit}
        className="h-7 w-40 text-xs"
      />
    )
  }

  return (
    <Badge
      variant="secondary"
      className="gap-1 pr-1 cursor-grab active:cursor-grabbing"
      onDoubleClick={() => { setEditValue(value); setEditing(true) }}
    >
      {draggable && <LuGripVertical className="w-3 h-3 text-gray-400" />}
      {value}
      <Button type="button" size="sm" variant="ghost" className="h-4 w-4 p-0 hover:bg-transparent" onClick={onRemove}>
        <LuX className="w-3 h-3" />
      </Button>
    </Badge>
  )
}
