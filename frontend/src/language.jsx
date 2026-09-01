import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  applyDocumentLanguage,
  getSavedLanguage,
  saveLanguage,
  translate,
} from './i18n.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getSavedLanguage)

  useEffect(() => {
    applyDocumentLanguage(lang)
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang(next) {
        saveLanguage(next)
        setLangState(next)
      },
      t(key, vars) {
        return translate(lang, key, vars)
      },
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
