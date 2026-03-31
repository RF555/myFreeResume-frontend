import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchJobTypes, createJobType, updateJobType, deleteJobType } from '@/lib/api/jobTypes'
import { QUERY_KEYS } from '@/lib/constants'

export function useJobTypes() {
  return useQuery({ queryKey: [QUERY_KEYS.JOB_TYPES], queryFn: fetchJobTypes })
}

export function useCreateJobType() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (name) => createJobType(name), onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.JOB_TYPES] }) })
}

export function useUpdateJobType() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: ({ id, name }) => updateJobType(id, name), onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.JOB_TYPES] }) })
}

export function useDeleteJobType() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (id) => deleteJobType(id), onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.JOB_TYPES] }) })
}
