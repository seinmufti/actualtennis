import { formatDateLabel, formatSlot, fromDateKey } from '../format.js'
import CourtToggle from './CourtToggle.jsx'

export default function BookingModal({
  draft,
  name,
  error,
  busy,
  onNameChange,
  onCourtChange,
  onClose,
  onConfirm,
}) {
  if (!draft) return null

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="book-title">Book this slot?</h2>
        <p className="modal-summary">
          {formatDateLabel(fromDateKey(draft.date))} · {formatSlot(draft.hour)}
        </p>
        <div className="field">
          <span>Choose Court</span>
          <CourtToggle
            courtId={draft.courtId}
            takenCourts={draft.takenCourts}
            visibleCourts={draft.visibleCourts}
            onChange={onCourtChange}
          />
        </div>
        <label className="field">
          <span>Your name</span>
          <input
            type="text"
            autoComplete="name"
            maxLength={40}
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="e.g. Sam"
          />
        </label>
        {error ? <p className="banner error">{error}</p> : null}
        <div className="modal-actions">
          <button type="button" className="ghost" onClick={onClose}>
            Never mind
          </button>
          <button type="button" className="primary" disabled={busy} onClick={onConfirm}>
            {busy ? 'Booking…' : 'Book this court'}
          </button>
        </div>
      </div>
    </div>
  )
}
