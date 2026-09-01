import { list, put } from '@vercel/blob'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FILE = path.join(__dirname, 'bookings.json')
const BLOB_PATH = 'bookings.json'

function useBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

function readFile() {
  try {
    const data = JSON.parse(fs.readFileSync(FILE, 'utf8'))
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function writeFile(bookings) {
  const tmp = `${FILE}.tmp`
  fs.writeFileSync(tmp, `${JSON.stringify(bookings, null, 2)}\n`)
  fs.renameSync(tmp, FILE)
}

async function readBlob() {
  const { blobs } = await list({ prefix: BLOB_PATH })
  const blob = blobs.find((entry) => entry.pathname === BLOB_PATH)
  if (!blob) return []

  const response = await fetch(blob.url)
  if (!response.ok) return []

  const data = await response.json()
  return Array.isArray(data) ? data : []
}

async function writeBlob(bookings) {
  await put(BLOB_PATH, `${JSON.stringify(bookings, null, 2)}\n`, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
  })
}

async function read() {
  if (useBlob()) return readBlob()
  return readFile()
}

async function write(bookings) {
  if (useBlob()) {
    await writeBlob(bookings)
    return
  }
  writeFile(bookings)
}

export async function getAll() {
  return read()
}

export async function getByDate(date) {
  return (await read()).filter((booking) => booking.date === date)
}

export async function getByDevice(deviceId) {
  return (await read()).find((booking) => booking.deviceId === deviceId) ?? null
}

export async function getById(id) {
  return (await read()).find((booking) => booking.id === id) ?? null
}

export async function create(booking) {
  const bookings = await read()
  bookings.push(booking)
  await write(bookings)
  return booking
}

export async function remove(id) {
  const bookings = await read()
  const next = bookings.filter((booking) => booking.id !== id)
  if (next.length === bookings.length) return false
  await write(next)
  return true
}
