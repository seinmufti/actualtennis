import { useLanguage } from '../language.jsx'

export default function Hero({ onOpenSettings }) {
  const { t } = useLanguage()

  return (
    <header className="hero">
      <div className="hero-brand" dir="ltr">
        <h1>{t('appTitle')}</h1>
        <svg className="ball" viewBox="0 0 64 64" aria-hidden="true">
          <defs>
            <clipPath id="ball-clip">
              <circle cx="32" cy="32" r="30" />
            </clipPath>
            <radialGradient id="ball-shine" cx="32%" cy="28%" r="70%">
              <stop offset="0%" stopColor="#f7ff8a" />
              <stop offset="70%" stopColor="#c6de1a" />
              <stop offset="100%" stopColor="#8fa80c" />
            </radialGradient>
          </defs>
          <circle cx="32" cy="32" r="30" fill="url(#ball-shine)" />
          <g
            clipPath="url(#ball-clip)"
            fill="none"
            stroke="#fffef2"
            strokeWidth="4"
            strokeLinecap="round"
          >
            <path d="M6 10c22 12 22 32 0 44" />
            <path d="M58 10c-22 12-22 32 0 44" />
          </g>
        </svg>
      </div>
      <button
        type="button"
        className="settings-btn"
        aria-label={t('settings')}
        onClick={onOpenSettings}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
          />
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </header>
  )
}
