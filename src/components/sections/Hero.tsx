import type { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import icon from '../../assets/icon-without-backgroud.png'

export const Hero = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #6C63FF, transparent 70%)' }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <img src={icon} alt="Runnity" className="w-28 h-28" />
        </div>

        <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
          {t('hero.badge')}
        </span>

        <h1 className="text-5xl sm:text-6xl font-bold text-text-primary leading-tight mb-6">
          {t('hero.headline')}{' '}
          <span className="text-primary">{t('hero.headlineHighlight')}</span>
        </h1>

        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="#download" variant="primary" className="text-base px-8 py-3.5">
            {t('hero.ctaPrimary')}
          </Button>
          <Button href="#features" variant="outline" className="text-base px-8 py-3.5">
            {t('hero.ctaSecondary')}
          </Button>
        </div>
      </div>
    </section>
  )
}
