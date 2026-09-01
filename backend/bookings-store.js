import { get, put } from '@vercel/blob'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FILE = path.join(__dirname, 'bookings.json')
const BLOB_PATH = 'bookings.json'

export class StorageUnavailableError extends Error {
  constructor(message = 'Booking storage is not configured for production.') {
    super(message)
    this.name = 'StorageUnavailableError'
    this.status = 503
  }
}

function isVercel() {
  return Boolean(process.env.VERCEL)
}

function useBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

export function storageStatus() {
  if (useBlob()) {
    return { mode: 'blob', writable: true }
  }
  if (isVercel()) {
    return {
      mode: 'none',
      writable: false,
      hint: 'Add Blob storage in the Vercel project dashboard (Storage → Create → Blob).',
    }
  }
  return { mode: 'file', writable: true }
}

function assertWritable() {
  if (isVercel() && !useBlob()) {
    throw new StorageUnavailableError(
      'Bookings cannot be saved yet. Add Blob storage to this Vercel project (Storage → Create → Blob), then redeploy.',
    )
  }
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
  const result = await get(BLOB_PATH, { access: 'private', useCache: false })
  if (!result) return []

  const text = await new Response(result.stream).text()
  try {
    const data = JSON.parse(text)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

async function writeBlob(bookings) {
  await put(BLOB_PATH, `${JSON.stringify(bookings, null, 2)}\n`, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
  })
}

async function read() {
  if (useBlob()) return readBlob()
  return readFile()
}

async function write(bookings) {
  assertWritable()
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
