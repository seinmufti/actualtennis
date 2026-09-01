export function formatSlotRange(hour) {
  const display = hour % 12 === 0 ? 12 : hour % 12
  return `${display}:00–${display}:55`
}

export function formatSlot(hour) {
  const period = hour < 12 ? 'AM' : 'PM'
  return `${formatSlotRange(hour)} ${period}`
}

export function formatDateLabel(date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function toDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function fromDateKey(key) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function upcomingDates(count = 14) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() + index)
    return date
  })
}

export function isPastSlot(dateKey, hour) {
  const now = new Date()
  const slot = fromDateKey(dateKey)
  slot.setHours(hour, 0, 0, 0)
  return slot.getTime() <= now.getTime()
}

export function formatBooking(booking) {
  return `Court ${booking.courtId} · ${formatDateLabel(fromDateKey(booking.date))} · ${formatSlot(booking.hour)}`
}
