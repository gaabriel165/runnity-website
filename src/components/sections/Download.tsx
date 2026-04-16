import type { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import playStoreIcon from '../../assets/play-store-icon.png'

const AppStoreBadge = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <a
      href="#"
      aria-label={t('download.appStoreName')}
      className="flex items-center gap-3 bg-surface-alt border border-border hover:border-primary/40 rounded-2xl px-6 py-4 transition-colors group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-text-primary group-hover:text-primary transition-colors"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="text-left">
        <p className="text-text-secondary text-xs">{t('download.appStoreLabel')}</p>
        <p className="text-text-primary font-bold text-base leading-tight">
          {t('download.appStoreName')}
        </p>
      </div>
    </a>
  )
}

const GooglePlayBadge = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <a
      href="#"
      aria-label={t('download.googlePlayName')}
      className="flex items-center gap-3 bg-surface-alt border border-border hover:border-primary/40 rounded-2xl px-6 py-4 transition-colors group"
    >
      <img
        src={playStoreIcon}
        alt=""
        aria-hidden="true"
        className="w-8 h-8 object-contain"
      />
      <div className="text-left">
        <p className="text-text-secondary text-xs">{t('download.googlePlayLabel')}</p>
        <p className="text-text-primary font-bold text-base leading-tight">
          {t('download.googlePlayName')}
        </p>
      </div>
    </a>
  )
}

export const Download = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <section id="download" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #6C63FF, transparent 70%)' }}
        />

        <h2 className="text-4xl font-bold text-text-primary mb-4 relative">
          {t('download.heading')}
        </h2>
        <p className="text-text-secondary text-lg mb-10 relative">{t('download.subtitle')}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
          <AppStoreBadge />
          <GooglePlayBadge />
        </div>
      </div>
    </section>
  )
}
