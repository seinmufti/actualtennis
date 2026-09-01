import { ClayCourtIcon, GrassCourtIcon } from './CourtIcons.jsx'
import { formatSlotRange, isPastSlot } from '../format.js'
import { useLanguage } from '../language.jsx'

const AM_HOURS = Array.from({ length: 12 }, (_, hour) => hour)
const PM_HOURS = Array.from({ length: 12 }, (_, hour) => hour + 12)

function SunIcon() {
  return (
    <svg className="period-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6" />
      </g>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="period-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M15.2 3.1a8.8 8.8 0 1 0 5.7 15.6A8.2 8.2 0 0 1 15.2 3.1z"
      />
    </svg>
  )
}

function SlotChip({ hour, hourBookings, mine, date, onPick, selectedCourts }) {
  const { t } = useLanguage()
  const visibleBookings = hourBookings.filter((booking) =>
    selectedCourts.includes(booking.courtId),
  )
  const mineHere = Boolean(
    mine && visibleBookings.some((booking) => booking.id === mine.id),
  )
  const past = isPastSlot(date, hour)
  const full = selectedCourts.every((courtId) =>
    visibleBookings.some((booking) => booking.courtId === courtId),
  )
  const available = !full && !past
  const left = selectedCourts.length - visibleBookings.length

  let status = 'open'
  if (mineHere) status = 'mine'
  else if (full) status = 'taken'
  else if (past) status = 'past'

  let meta = t('open')
  if (mineHere) meta = t('yourGame')
  else if (full) meta = visibleBookings.map((booking) => booking.name).join(' · ')
  else if (past) meta = t('finished')
  else if (left === 1 && selectedCourts.length > 1) meta = t('oneCourtLeft')

  const takenIds = new Set(visibleBookings.map((booking) => booking.courtId))

  return (
    <button
      type="button"
      className={`slot-chip ${status}`}
      disabled={!available}
      onClick={() => onPick(hour)}
    >
      <span className="slot-time">{formatSlotRange(hour)}</span>
      <span className="slot-meta">{meta}</span>
      <span className="slot-courts">
        {selectedCourts.includes(1) ? (
          <span className={takenIds.has(1) ? 'mini-court taken' : 'mini-court'}>
            <GrassCourtIcon />
          </span>
        ) : null}
        {selectedCourts.includes(2) ? (
          <span className={takenIds.has(2) ? 'mini-court taken' : 'mini-court'}>
            <ClayCourtIcon />
          </span>
        ) : null}
      </span>
    </button>
  )
}

export default function SlotGrid({ date, bookings, mine, onPick, selectedCourts }) {
  const { t } = useLanguage()
  const byHour = new Map()
  for (const booking of bookings) {
    const list = byHour.get(booking.hour) ?? []
    list.push(booking)
    byHour.set(booking.hour, list)
  }

  return (
    <div className="slot-grid">
      <section className="slot-col am" aria-labelledby="am-heading">
        <h3 id="am-heading" className="slot-col-title">
          <SunIcon />
          {t('am')}
        </h3>
        {AM_HOURS.map((hour) => (
          <SlotChip
            key={hour}
            hour={hour}
            hourBookings={byHour.get(hour) ?? []}
            mine={mine}
            date={date}
            onPick={onPick}
            selectedCourts={selectedCourts}
          />
        ))}
      </section>

      <section className="slot-col pm" aria-labelledby="pm-heading">
        <h3 id="pm-heading" className="slot-col-title">
          <MoonIcon />
          {t('pm')}
        </h3>
        {PM_HOURS.map((hour) => (
          <SlotChip
            key={hour}
            hour={hour}
            hourBookings={byHour.get(hour) ?? []}
            mine={mine}
            date={date}
            onPick={onPick}
            selectedCourts={selectedCourts}
          />
        ))}
      </section>
    </div>
  )
}
