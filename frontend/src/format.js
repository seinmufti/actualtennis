const LOCALE_MAP = {
  en: 'en-GB',
  ku: 'ckb-IQ',
  ar: 'ar-IQ',
}

export function formatSlotRange(hour) {
  const display = hour % 12 === 0 ? 12 : hour % 12
  return `${display}:00–${display}:55`
}

export function formatSlot(hour, lang = 'en', t) {
  const period = hour < 12 ? t?.('am') ?? 'AM' : t?.('pm') ?? 'PM'
  return `${formatSlotRange(hour)} ${period}`
}

export function formatDateLabel(date, lang = 'en') {
  return date.toLocaleDateString(LOCALE_MAP[lang] ?? 'en-GB', {
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

export function upcomingDates(count = 7) {
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

export function formatBooking(booking, lang = 'en', t) {
  const court = t
    ? t('courtLabel', { id: booking.courtId })
    : `Court ${booking.courtId}`
  return `${court} · ${formatDateLabel(fromDateKey(booking.date), lang)} · ${formatSlot(booking.hour, lang, t)}`
}
