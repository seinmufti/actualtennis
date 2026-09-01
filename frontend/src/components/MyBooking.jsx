import { formatBooking } from '../format.js'

export default function MyBooking({ booking, busy, onCancel }) {
  if (!booking) return null

  return (
    <section className="my-booking">
      <div>
        <p className="eyebrow">Your game</p>
        <h2>You are on the board</h2>
        <p>{formatBooking(booking)}</p>
        <p className="muted">Booked as {booking.name}</p>
      </div>
      <button type="button" className="ghost" disabled={busy} onClick={onCancel}>
        {busy ? 'Canceling…' : 'Cancel booking'}
      </button>
    </section>
  )
}
