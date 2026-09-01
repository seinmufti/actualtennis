import { ClayCourtIcon, GrassCourtIcon } from './CourtIcons.jsx'
import { useLanguage } from '../language.jsx'

export default function CourtsShowcase({ selectedCourts, onToggle }) {
  const { t } = useLanguage()
  const COURTS = [
    { id: 1, label: t('court1'), Icon: GrassCourtIcon },
    { id: 2, label: t('court2'), Icon: ClayCourtIcon },
  ]

  return (
    <section className="courts-card" aria-labelledby="courts-heading">
      <h2 id="courts-heading">{t('ourCourts')}</h2>
      <div className="branch-card">
        <p className="branch-info">
          <span className="branch-name">{t('branchName')}</span>
          <br />
          <span className="branch-address">{t('branchAddress')}</span>
        </p>
        <div className="courts-row">
          {COURTS.map(({ id, label, Icon }) => {
            const selected = selectedCourts.includes(id)
            return (
              <button
                key={id}
                type="button"
                className={selected ? 'court-figure selected' : 'court-figure'}
                aria-pressed={selected}
                onClick={() => onToggle(id)}
              >
                <span className="court-check" aria-hidden="true">
                  {selected ? (
                    <svg viewBox="0 0 16 16">
                      <rect width="16" height="16" rx="4" fill="currentColor" />
                      <path
                        d="M4 8.2 6.6 11 12 5"
                        fill="none"
                        stroke="#1b4332"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 16 16">
                      <rect
                        x="1"
                        y="1"
                        width="14"
                        height="14"
                        rx="3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                    </svg>
                  )}
                </span>
                <span className="court-figure-label">{label}</span>
                <Icon />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
