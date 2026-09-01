import { ClayCourtIcon, GrassCourtIcon } from './CourtIcons.jsx'

export default function CourtToggle({
  courtId,
  onChange,
  takenCourts = [],
  visibleCourts = [1, 2],
}) {
  return (
    <div className="court-toggle" role="group" aria-label="Choose a court">
      {visibleCourts.map((id) => {
        const taken = takenCourts.includes(id)
        return (
          <button
            key={id}
            type="button"
            className={courtId === id ? 'selected' : ''}
            disabled={taken}
            onClick={() => onChange(id)}
            aria-label={taken ? `Court ${id} taken` : `Court ${id}`}
          >
            <span className="court-label">Court {id}</span>
            {id === 1 ? <GrassCourtIcon /> : <ClayCourtIcon />}
          </button>
        )
      })}
    </div>
  )
}
