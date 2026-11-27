import apiClient from './apiClient.js'

export async function getCategories({ signal } = {}) {
  const response = await apiClient.get('/categories', { signal })
  const payload = response.data

  if (payload?.success !== true || !Array.isArray(payload.data)) {
    throw new Error('The catalogue returned an invalid category list response.')
  }

  return payload.data
}
