import { apiJson } from './client'

export const fetchJobTypes = () => apiJson('/api/job-types')
export const createJobType = (name) => apiJson('/api/job-types', { method: 'POST', body: JSON.stringify({ name }) })
export const updateJobType = (id, name) => apiJson(`/api/job-types/${id}`, { method: 'PUT', body: JSON.stringify({ name }) })
export const deleteJobType = (id) => apiJson(`/api/job-types/${id}`, { method: 'DELETE' })
export const fetchEntries = (jobTypeId) => apiJson(`/api/job-types/${jobTypeId}/entries`)
