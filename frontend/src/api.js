import { getDeviceId } from './device.js'

function apiBase() {
  const env = import.meta.env.VITE_API_URL
  if (!env) return ''

  try {
    const url = new URL(env)
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      url.hostname = window.location.hostname
    }
    return url.origin
  } catch {
    return String(env).replace(/\/$/, '')
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${apiBase()}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Device-Id': getDeviceId(),
      ...options.headers,
    },
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong. Try again.')
  }
  return data
}

export function fetchBookings(date) {
  const query = date ? `?date=${encodeURIComponent(date)}` : ''
  return request(`/api/bookings${query}`)
}

export function createBooking(payload) {
  return request('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function cancelBooking(id) {
  return request(`/api/bookings/${id}`, { method: 'DELETE' })
}
