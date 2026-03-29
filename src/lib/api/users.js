import { apiJson } from './client'

export const fetchProfile = () => apiJson('/api/users/me')
export const updateProfile = (data) => apiJson('/api/users/me', { method: 'PUT', body: JSON.stringify(data) })
