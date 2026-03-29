import { useEffect, useRef, useCallback } from 'react'
import { useUpdateEntry } from './useEntries'
import { AUTO_SAVE_DELAY_MS } from '@/lib/constants'

export function useAutoSave(entryId, formData, delay = AUTO_SAVE_DELAY_MS) {
  const { mutate, isPending } = useUpdateEntry()
  const timeoutRef = useRef(null)
  const lastSavedRef = useRef(null)

  const save = useCallback(() => {
    if (!entryId || !formData) return
    const serialized = JSON.stringify(formData)
    if (serialized === lastSavedRef.current) return
    lastSavedRef.current = serialized
    mutate({ id: entryId, data: formData })
  }, [entryId, formData, mutate])

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(save, delay)
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [formData, save, delay])

  return { saving: isPending }
}
