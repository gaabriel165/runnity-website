import type { JSX } from 'react'
import { useTranslation } from 'react-i18next'

type Sport = {
  icon: string
  labelKey: string
}

const sports: Sport[] = [
  { icon: '🏃', labelKey: 'about.sports.running' },
  { icon: '🚴', labelKey: 'about.sports.cycling' },
  { icon: '🥾', labelKey: 'about.sports.trail' },
  { icon: '🚶', labelKey: 'about.sports.hiking' },
]

export const About = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <section id="about" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-text-primary mb-6 leading-tight">
              {t('about.heading')}
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              {t('about.p1')}
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              {t('about.p2')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {sports.map(({ icon, labelKey }) => (
              <div
                key={labelKey}
                className="bg-surface-alt border border-border rounded-2xl p-6 flex flex-col items-center gap-3"
              >
                <span className="text-4xl" role="img" aria-label={t(labelKey)}>
                  {icon}
                </span>
                <span className="text-text-primary font-semibold">{t(labelKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
