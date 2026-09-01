import { formatDateLabel, formatSlot, fromDateKey } from '../format.js'
import { useLanguage } from '../language.jsx'
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
  const { lang, t } = useLanguage()

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
        <h2 id="book-title">{t('bookSlot')}</h2>
        <p className="modal-summary">
          {formatDateLabel(fromDateKey(draft.date), lang)} · {formatSlot(draft.hour, lang, t)}
        </p>
        <div className="field">
          <span>{t('chooseCourt')}</span>
          <CourtToggle
            courtId={draft.courtId}
            takenCourts={draft.takenCourts}
            visibleCourts={draft.visibleCourts}
            onChange={onCourtChange}
          />
        </div>
        <label className="field">
          <span>{t('yourName')}</span>
          <input
            type="text"
            autoComplete="name"
            maxLength={40}
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder={t('namePlaceholder')}
          />
        </label>
        {error ? <p className="banner error">{error}</p> : null}
        <div className="modal-actions">
          <button type="button" className="ghost" onClick={onClose}>
            {t('neverMind')}
          </button>
          <button type="button" className="primary" disabled={busy} onClick={onConfirm}>
            {busy ? t('booking') : t('bookCourt')}
          </button>
        </div>
      </div>
    </div>
  )
}
