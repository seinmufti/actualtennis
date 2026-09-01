import cors from 'cors'
import crypto from 'node:crypto'
import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as store from './bookings-store.js'
import { StorageUnavailableError } from './bookings-store.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const COURTS = new Set([1, 2])
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const distPath = path.join(__dirname, '../public')

function deviceIdFrom(req) {
  const raw = req.get('x-device-id')
  return typeof raw === 'string' ? raw.trim() : ''
}

function parseCourtId(value) {
  const courtId = Number(value)
  return COURTS.has(courtId) ? courtId : null
}

function parseHour(value) {
  const hour = Number(value)
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) return null
  return hour
}

function parseName(value) {
  if (typeof value !== 'string') return null
  const name = value.trim()
  if (name.length < 1 || name.length > 40) return null
  return name
}

export function createApp() {
  const app = express()
  app.use(cors({ origin: true }))
  app.use(express.json())

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, name: 'Actual Tennis', storage: store.storageStatus() })
  })

  app.get('/api/bookings', async (req, res) => {
    const date = typeof req.query.date === 'string' ? req.query.date : ''
    if (date && !DATE_RE.test(date)) {
      res.status(400).json({ error: 'Use a date like 2026-09-01.' })
      return
    }

    const bookings = date ? await store.getByDate(date) : await store.getAll()
    const deviceId = deviceIdFrom(req)
    const mine = deviceId ? await store.getByDevice(deviceId) : null
    res.json({ bookings, mine })
  })

  app.post('/api/bookings', async (req, res) => {
    try {
      const deviceId = deviceIdFrom(req)
      if (!deviceId) {
        res.status(400).json({ error: 'Missing device id.' })
        return
      }

      const courtId = parseCourtId(req.body?.courtId)
      const date = typeof req.body?.date === 'string' ? req.body.date : ''
      const hour = parseHour(req.body?.hour)
      const name = parseName(req.body?.name)

      if (!courtId) {
        res.status(400).json({ error: 'Pick Court 1 or Court 2.' })
        return
      }
      if (!DATE_RE.test(date)) {
        res.status(400).json({ error: 'Use a date like 2026-09-01.' })
        return
      }
      if (hour === null) {
        res.status(400).json({ error: 'Pick an hour from 0 to 23.' })
        return
      }
      if (!name) {
        res.status(400).json({ error: 'Tell us your name (1–40 characters).' })
        return
      }

      if (await store.getByDevice(deviceId)) {
        res.status(409).json({
          error: 'This device already has a booking. Cancel it first.',
        })
        return
      }

      const taken = (await store.getByDate(date)).some(
        (booking) => booking.courtId === courtId && booking.hour === hour,
      )
      if (taken) {
        res.status(409).json({ error: 'That slot is already booked.' })
        return
      }

      const booking = await store.create({
        id: crypto.randomUUID(),
        courtId,
        date,
        hour,
        name,
        deviceId,
        createdAt: new Date().toISOString(),
      })

      res.status(201).json({ booking })
    } catch (error) {
      if (error instanceof StorageUnavailableError) {
        res.status(error.status).json({ error: error.message })
        return
      }
      console.error('POST /api/bookings failed:', error)
      res.status(500).json({ error: 'Something went wrong. Try again.' })
    }
  })

  app.delete('/api/bookings/:id', async (req, res) => {
    try {
      const deviceId = deviceIdFrom(req)
      if (!deviceId) {
        res.status(400).json({ error: 'Missing device id.' })
        return
      }

      const booking = await store.getById(req.params.id)
      if (!booking) {
        res.status(404).json({ error: 'Booking not found.' })
        return
      }
      if (booking.deviceId !== deviceId) {
        res.status(403).json({ error: 'You can only cancel your own booking.' })
        return
      }

      await store.remove(booking.id)
      res.json({ ok: true })
    } catch (error) {
      if (error instanceof StorageUnavailableError) {
        res.status(error.status).json({ error: error.message })
        return
      }
      console.error('DELETE /api/bookings failed:', error)
      res.status(500).json({ error: 'Something went wrong. Try again.' })
    }
  })

  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath))
    app.use((req, res, next) => {
      if (req.method !== 'GET' || req.path.startsWith('/api')) {
        next()
        return
      }
      res.sendFile(path.join(distPath, 'index.html'))
    })
  }

  return app
}
