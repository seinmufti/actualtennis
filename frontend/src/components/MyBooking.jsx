import { formatBooking } from '../format.js'
import { useLanguage } from '../language.jsx'

export default function MyBooking({ booking, busy, onCancel }) {
  const { lang, t } = useLanguage()

  if (!booking) return null

  return (
    <section className="my-booking">
      <div>
        <h2>{t('onBoard')}</h2>
        <p>{formatBooking(booking, lang, t)}</p>
        <p className="muted">{t('bookedAs', { name: booking.name })}</p>
      </div>
      <button type="button" className="ghost" disabled={busy} onClick={onCancel}>
        {busy ? t('canceling') : t('cancelBooking')}
      </button>
    </section>
  )
}
