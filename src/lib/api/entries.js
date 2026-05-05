import { apiJson, apiBlob } from './client'

export const fetchEntry = (id) => apiJson(`/api/entries/${id}`)
export const createEntry = (jobTypeId, companyName) => apiJson(`/api/job-types/${jobTypeId}/entries`, { method: 'POST', body: JSON.stringify({ company_name: companyName }) })
export const updateEntry = (id, data) => apiJson(`/api/entries/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteEntry = (id) => apiJson(`/api/entries/${id}`, { method: 'DELETE' })
export const cloneEntry = (id, jobTypeId, companyName) => apiJson(`/api/entries/${id}/clone`, { method: 'POST', body: JSON.stringify({ job_type_id: jobTypeId, company_name: companyName }) })
export const refreshEntryFromProfile = (id) => apiJson(`/api/entries/${id}/refresh-from-profile`, { method: 'POST' })

export const fetchResumeBlob = (id) => apiBlob(`/api/entries/${id}/download/resume`)
export const fetchCoverLetterBlob = (id) => apiBlob(`/api/entries/${id}/download/cover-letter`)

const ILLEGAL_FILENAME_CHARS = /[<>:"/\\|?*]/g

export function sanitizeForFilename(str) {
  if (!str) return ''
  return String(str)
    .replace(ILLEGAL_FILENAME_CHARS, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function buildFilename(fullName, docType, companyName, includeCompany) {
  const safeName = sanitizeForFilename(fullName)
  const safeCompany = sanitizeForFilename(companyName)
  const base = `${safeName} - ${docType}`
  if (includeCompany && safeCompany) {
    return `${base} - ${safeCompany}.docx`
  }
  return `${base}.docx`
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export async function downloadResume(id, fullName, companyName, includeCompany) {
  const blob = await fetchResumeBlob(id)
  triggerDownload(blob, buildFilename(fullName, 'Resume', companyName, includeCompany))
}

export async function downloadCoverLetter(id, fullName, companyName, includeCompany) {
  const blob = await fetchCoverLetterBlob(id)
  triggerDownload(blob, buildFilename(fullName, 'Cover Letter', companyName, includeCompany))
}
