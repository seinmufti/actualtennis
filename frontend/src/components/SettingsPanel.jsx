import nordlysLogo from '../assets/nordlys-logo.png'
import { LANGUAGES } from '../i18n.js'
import { useLanguage } from '../language.jsx'

export default function SettingsPanel({ open, onClose }) {
  const { lang, setLang, t } = useLanguage()

  if (!open) return null

  return (
    <div className="settings-backdrop" role="presentation" onClick={onClose}>
      <aside
        className="settings-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="settings-head">
          <h2 id="settings-title">{t('settings')}</h2>
          <button type="button" className="settings-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <p className="settings-label">{t('language')}</p>
        <div className="lang-list">
          {LANGUAGES.map(({ id, labelKey, Flag }) => (
            <button
              key={id}
              type="button"
              className={lang === id ? 'lang-btn selected' : 'lang-btn'}
              aria-pressed={lang === id}
              onClick={() => setLang(id)}
            >
              <Flag />
              <span>{t(labelKey)}</span>
            </button>
          ))}
        </div>

        <footer className="settings-footer">
          <span className="settings-credit">{t('developedBy')}</span>
          <img src={nordlysLogo} alt="Nordlys Solutions" className="nordlys-logo" />
        </footer>
      </aside>
    </div>
  )
}
