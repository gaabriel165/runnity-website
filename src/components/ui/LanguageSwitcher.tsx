import type { JSX } from 'react'
import { useTranslation } from 'react-i18next'

type Language = {
  code: string
  flag: string
  label: string
}

const languages: Language[] = [
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
]

export const LanguageSwitcher = (): JSX.Element => {
  const { i18n } = useTranslation()
  const current = i18n.language?.split('-')[0]

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language switcher">
      {languages.map(({ code, flag, label }) => (
        <button
          key={code}
          onClick={() => i18n.changeLanguage(code)}
          title={label}
          aria-label={label}
          aria-pressed={current === code}
          className={`text-lg w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer ${
            current === code
              ? 'bg-primary/20 ring-1 ring-primary/40'
              : 'opacity-40 hover:opacity-75'
          }`}
        >
          {flag}
        </button>
      ))}
    </div>
  )
}
