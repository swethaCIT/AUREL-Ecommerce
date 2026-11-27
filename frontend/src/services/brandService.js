import apiClient from './apiClient.js'

export async function getBrands({ signal } = {}) {
  const response = await apiClient.get('/brands', { signal })
  const payload = response.data

  if (payload?.success !== true || !Array.isArray(payload.data)) {
    throw new Error('The catalogue returned an invalid brand list response.')
  }

  return payload.data
}
