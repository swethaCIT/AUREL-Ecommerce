import axios from 'axios'

const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api'
).replace(/\/+$/, '')

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  headers: { Accept: 'application/json' },
})

export function getApiErrorMessage(error) {
  return (
    error.response?.data?.error?.message ||
    error.message ||
    'Unable to reach the AUREL catalogue. Please try again.'
  )
}

export default apiClient
