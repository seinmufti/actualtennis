import { translations } from '../i18n.js'
import { useLanguage } from '../language.jsx'

export default function Rules() {
  const { lang, t } = useLanguage()
  const rules = translations[lang]?.rules ?? translations.en.rules

  return (
    <section className="rules-card" aria-labelledby="rules-heading">
      <h2 id="rules-heading">{t('courtRules')}</h2>
      <ol>
        {rules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ol>
    </section>
  )
}
