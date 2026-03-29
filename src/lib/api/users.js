import { apiJson } from './client'

export const fetchProfile = () => apiJson('/api/users/me')
export const updateProfile = (data) => apiJson('/api/users/me', { method: 'PUT', body: JSON.stringify(data) })
export const fetchResumeProfile = () => apiJson('/api/users/me/resume-profile')
export const updateResumeProfile = (data) => apiJson('/api/users/me/resume-profile', { method: 'PUT', body: JSON.stringify(data) })
