import { useCallback, useEffect, useMemo, useState } from 'react'
import { cancelBooking, createBooking, fetchBookings } from './api.js'
import Alerts from './components/Alerts.jsx'
import BookingModal from './components/BookingModal.jsx'
import ConfirmCancelModal from './components/ConfirmCancelModal.jsx'
import CourtsShowcase from './components/CourtsShowcase.jsx'
import DatePicker from './components/DatePicker.jsx'
import Hero from './components/Hero.jsx'
import MyBooking from './components/MyBooking.jsx'
import Pricing from './components/Pricing.jsx'
import Rules from './components/Rules.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'
import SlotGrid from './components/SlotGrid.jsx'
import { getSavedName, saveName } from './device.js'
import { toDateKey, upcomingDates } from './format.js'
import { useLanguage } from './language.jsx'
import './App.css'

const DATES = upcomingDates(7)

export default function App() {
  const { t } = useLanguage()
  const [date, setDate] = useState(() => toDateKey(DATES[0]))
  const [board, setBoard] = useState({ date: null, bookings: [] })
  const [mine, setMine] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [actionError, setActionError] = useState('')
  const [draft, setDraft] = useState(null)
  const [confirmCancel, setConfirmCancel] = useState(false)
  const [name, setName] = useState(getSavedName)
  const [busy, setBusy] = useState(false)
  const [selectedCourts, setSelectedCourts] = useState([1, 2])
  const [settingsOpen, setSettingsOpen] = useState(false)

  const load = useCallback(async (selectedDate) => {
    const data = await fetchBookings(selectedDate)
    setBoard({ date: selectedDate, bookings: data.bookings })
    setMine(data.mine)
    setLoadError('')
  }, [])

  useEffect(() => {
    let cancelled = false

    const refresh = () => {
      fetchBookings(date)
        .then((data) => {
          if (cancelled) return
          setBoard({ date, bookings: data.bookings })
          setMine(data.mine)
          setLoadError('')
        })
        .catch((error) => {
          if (cancelled) return
          setLoadError(error.message)
        })
    }

    refresh()
    const timer = setInterval(refresh, 5000)
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)

    return () => {
      cancelled = true
      clearInterval(timer)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [date])

  const bookings = board.date === date ? board.bookings : []
  const visibleBookings = useMemo(
    () => bookings.filter((booking) => selectedCourts.includes(booking.courtId)),
    [bookings, selectedCourts],
  )
  const openCount = selectedCourts.length * 24 - visibleBookings.length

  function toggleCourt(id) {
    setSelectedCourts((current) => {
      if (current.includes(id)) {
        if (current.length === 1) return current
        return current.filter((courtId) => courtId !== id)
      }
      return [...current, id].sort()
    })
  }

  function pickSlot(hour) {
    setActionError('')
    if (mine) {
      setActionError('This device already has a booking. Cancel it first.')
      return
    }
    const takenCourts = bookings
      .filter((booking) => booking.hour === hour)
      .map((booking) => booking.courtId)
    const courtId = selectedCourts.find((id) => !takenCourts.includes(id))
    if (!courtId) return
    setDraft({
      courtId,
      date,
      hour,
      takenCourts,
      visibleCourts: selectedCourts,
    })
  }

  async function confirmBooking() {
    if (!draft) return
    const trimmed = name.trim()
    if (!trimmed) {
      setActionError('Add your name so others know who booked it.')
      return
    }

    setBusy(true)
    setActionError('')
    try {
      saveName(trimmed)
      await createBooking({ ...draft, name: trimmed })
      setDraft(null)
      await load(date)
    } catch (error) {
      setActionError(error.message)
      await load(date).catch(() => {})
    } finally {
      setBusy(false)
    }
  }

  async function onCancel() {
    if (!mine) return false
    setBusy(true)
    setActionError('')
    try {
      await cancelBooking(mine.id)
      await load(date)
      return true
    } catch (error) {
      setActionError(error.message)
      return false
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="phone">
      <div className="phone-notch" aria-hidden="true" />
      <main className="page">
        <Hero onOpenSettings={() => setSettingsOpen(true)} />

        <MyBooking
          booking={mine}
          busy={busy}
          onCancel={() => setConfirmCancel(true)}
        />

        <Alerts
          loadError={loadError}
          actionError={!draft ? actionError : ''}
        />

        <CourtsShowcase
          selectedCourts={selectedCourts}
          onToggle={toggleCourt}
        />

        <section className="board" aria-labelledby="book-heading">
          <header className="board-head">
            <div className="board-title">
              <h2 id="book-heading">{t('pickTime')}</h2>
              <p className="muted">{t('slotsOpen', { count: openCount })}</p>
            </div>
          </header>

          <section className="date-section" aria-label="Choose a date">
            <DatePicker dates={DATES} selected={date} onSelect={setDate} />
          </section>

          <section className="slot-section" aria-label="Choose a time">
            <SlotGrid
              date={date}
              bookings={bookings}
              mine={mine}
              onPick={pickSlot}
              selectedCourts={selectedCourts}
            />
          </section>
        </section>

        <Rules />
        <Pricing />
      </main>

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <BookingModal
        draft={draft}
        name={name}
        error={actionError}
        busy={busy}
        onNameChange={setName}
        onCourtChange={(courtId) => setDraft((current) => ({ ...current, courtId }))}
        onClose={() => {
          setDraft(null)
          setActionError('')
        }}
        onConfirm={confirmBooking}
      />

      {confirmCancel ? (
        <ConfirmCancelModal
          booking={mine}
          busy={busy}
          onClose={() => setConfirmCancel(false)}
          onConfirm={async () => {
            const cancelled = await onCancel()
            if (cancelled) setConfirmCancel(false)
          }}
        />
      ) : null}
    </div>
  )
}
