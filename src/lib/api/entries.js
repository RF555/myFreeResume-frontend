import { apiJson, apiBlob } from './client'

export const fetchEntry = (id) => apiJson(`/api/entries/${id}`)
export const createEntry = (jobTypeId, companyName) => apiJson(`/api/job-types/${jobTypeId}/entries`, { method: 'POST', body: JSON.stringify({ company_name: companyName }) })
export const updateEntry = (id, data) => apiJson(`/api/entries/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteEntry = (id) => apiJson(`/api/entries/${id}`, { method: 'DELETE' })
export const cloneEntry = (id, jobTypeId, companyName) => apiJson(`/api/entries/${id}/clone`, { method: 'POST', body: JSON.stringify({ job_type_id: jobTypeId, company_name: companyName }) })
export const refreshEntryFromProfile = (id) => apiJson(`/api/entries/${id}/refresh-from-profile`, { method: 'POST' })

export const fetchResumeBlob = (id) => apiBlob(`/api/entries/${id}/download/resume`)
export const fetchCoverLetterBlob = (id) => apiBlob(`/api/entries/${id}/download/cover-letter`)

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export async function downloadResume(id) {
  const blob = await fetchResumeBlob(id)
  triggerDownload(blob, 'Resume.docx')
}

export async function downloadCoverLetter(id) {
  const blob = await fetchCoverLetterBlob(id)
  triggerDownload(blob, 'Cover Letter.docx')
}
