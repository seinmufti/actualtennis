import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FILE = path.join(__dirname, 'bookings.json')

function read() {
  try {
    const data = JSON.parse(fs.readFileSync(FILE, 'utf8'))
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function write(bookings) {
  const tmp = `${FILE}.tmp`
  fs.writeFileSync(tmp, `${JSON.stringify(bookings, null, 2)}\n`)
  fs.renameSync(tmp, FILE)
}

export function getAll() {
  return read()
}

export function getByDate(date) {
  return read().filter((booking) => booking.date === date)
}

export function getByDevice(deviceId) {
  return read().find((booking) => booking.deviceId === deviceId) ?? null
}

export function getById(id) {
  return read().find((booking) => booking.id === id) ?? null
}

export function create(booking) {
  const bookings = read()
  bookings.push(booking)
  write(bookings)
  return booking
}

export function remove(id) {
  const bookings = read()
  const next = bookings.filter((booking) => booking.id !== id)
  if (next.length === bookings.length) return false
  write(next)
  return true
}
