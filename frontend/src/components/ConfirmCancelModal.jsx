import { formatBooking } from '../format.js'

export default function ConfirmCancelModal({ booking, busy, onClose, onConfirm }) {
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
        <h2 id="cancel-title">Cancel this booking?</h2>
        <p className="modal-summary">{formatBooking(booking)}</p>
        <p className="muted">Are you sure? This slot will open for someone else.</p>
        <div className="modal-actions">
          <button type="button" className="ghost" onClick={onClose}>
            Never mind
          </button>
          <button type="button" className="primary" disabled={busy} onClick={onConfirm}>
            {busy ? 'Canceling…' : 'Yes, cancel'}
          </button>
        </div>
      </div>
    </div>
  )
}
