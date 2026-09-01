import { formatDateLabel, toDateKey } from '../format.js'

export default function DatePicker({ dates, selected, onSelect }) {
  return (
    <div className="date-row" role="listbox" aria-label="Pick a date">
      {dates.map((date) => {
        const key = toDateKey(date)
        const selectedDate = key === selected
        return (
          <button
            key={key}
            type="button"
            role="option"
            aria-selected={selectedDate}
            className={selectedDate ? 'date-chip selected' : 'date-chip'}
            onClick={() => onSelect(key)}
          >
            <span className="date-weekday">
              {date.toLocaleDateString(undefined, { weekday: 'short' })}
            </span>
            <span className="date-num">{date.getDate()}</span>
            <span className="date-month">
              {date.toLocaleDateString(undefined, { month: 'short' })}
            </span>
            <span className="sr-only">{formatDateLabel(date)}</span>
          </button>
        )
      })}
    </div>
  )
}
