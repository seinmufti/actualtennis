import { ClayCourtIcon, GrassCourtIcon } from './CourtIcons.jsx'
import { useLanguage } from '../language.jsx'

export default function CourtToggle({
  courtId,
  onChange,
  takenCourts = [],
  visibleCourts = [1, 2],
}) {
  const { t } = useLanguage()

  return (
    <div className="court-toggle" role="group" aria-label={t('chooseCourt')}>
      {visibleCourts.map((id) => {
        const taken = takenCourts.includes(id)
        const label = t('courtLabel', { id })
        return (
          <button
            key={id}
            type="button"
            className={courtId === id ? 'selected' : ''}
            disabled={taken}
            onClick={() => onChange(id)}
            aria-label={taken ? `${label} taken` : label}
          >
            <span className="court-label">{label}</span>
            {id === 1 ? <GrassCourtIcon /> : <ClayCourtIcon />}
          </button>
        )
      })}
    </div>
  )
}
