import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchJobTypes, createJobType, updateJobType, deleteJobType } from '@/lib/api/jobTypes'

export function useJobTypes() {
  return useQuery({ queryKey: ['jobTypes'], queryFn: fetchJobTypes })
}

export function useCreateJobType() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (name) => createJobType(name), onSuccess: () => qc.invalidateQueries({ queryKey: ['jobTypes'] }) })
}

export function useUpdateJobType() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: ({ id, name }) => updateJobType(id, name), onSuccess: () => qc.invalidateQueries({ queryKey: ['jobTypes'] }) })
}

export function useDeleteJobType() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (id) => deleteJobType(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['jobTypes'] }) })
}
