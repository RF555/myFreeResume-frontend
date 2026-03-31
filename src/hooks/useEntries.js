import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchEntries } from '@/lib/api/jobTypes'
import { fetchEntry, createEntry, updateEntry, deleteEntry, cloneEntry } from '@/lib/api/entries'
import { QUERY_KEYS } from '@/lib/constants'

export function useEntries(jobTypeId) {
  return useQuery({ queryKey: [QUERY_KEYS.ENTRIES, jobTypeId], queryFn: () => fetchEntries(jobTypeId), enabled: !!jobTypeId })
}

export function useEntry(id) {
  return useQuery({ queryKey: [QUERY_KEYS.ENTRY, id], queryFn: () => fetchEntry(id), enabled: !!id })
}

export function useCreateEntry() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: ({ jobTypeId, companyName }) => createEntry(jobTypeId, companyName), onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.ENTRIES] }) })
}

export function useUpdateEntry() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: ({ id, data }) => updateEntry(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: [QUERY_KEYS.ENTRY, id] }); qc.invalidateQueries({ queryKey: [QUERY_KEYS.ENTRIES] }) } })
}

export function useDeleteEntry() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (id) => deleteEntry(id), onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.ENTRIES] }) })
}

export function useCloneEntry() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: ({ id, jobTypeId, companyName }) => cloneEntry(id, jobTypeId, companyName), onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.ENTRIES] }) })
}
