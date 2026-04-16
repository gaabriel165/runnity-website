import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Footer = (): JSX.Element => {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-text-secondary text-sm">
        <span>{t('footer.copyright', { year })}</span>
        <nav className="flex items-center gap-6">
          <Link to="/terms" onClick={() => window.scrollTo(0, 0)} className="hover:text-text-primary transition-colors">
            {t('footer.terms')}
          </Link>
          <Link to="/privacy" onClick={() => window.scrollTo(0, 0)} className="hover:text-text-primary transition-colors">
            {t('footer.privacy')}
          </Link>
        </nav>
      </div>
    </footer>
  )
}
