import type { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import icon from '../../assets/icon-without-backgroud.png'

export const Navbar = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <img src={icon} alt="Runnity" className="w-8 h-8" />
          <span className="text-xl font-bold text-text-primary tracking-tight">Runnity</span>
        </a>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button href="#download" variant="primary" className="text-sm px-5 py-2">
            {t('navbar.download')}
          </Button>
        </div>
      </div>
    </header>
  )
}
