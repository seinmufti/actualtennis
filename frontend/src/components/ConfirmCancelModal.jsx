import { formatBooking } from '../format.js'
import { useLanguage } from '../language.jsx'

export default function ConfirmCancelModal({ booking, busy, onClose, onConfirm }) {
  const { lang, t } = useLanguage()

  if (!booking) return null

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="cancel-title">{t('cancelConfirm')}</h2>
        <p className="modal-summary">{formatBooking(booking, lang, t)}</p>
        <p className="muted">{t('cancelSure')}</p>
        <div className="modal-actions">
          <button type="button" className="ghost" onClick={onClose}>
            {t('neverMind')}
          </button>
          <button type="button" className="primary" disabled={busy} onClick={onConfirm}>
            {busy ? t('canceling') : t('yesCancel')}
          </button>
        </div>
      </div>
    </div>
  )
}
