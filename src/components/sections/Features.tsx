import type { JSX } from 'react'
import { useTranslation } from 'react-i18next'

type FeatureItem = {
  title: string
  description: string
}

const icons = ['📍', '✅', '👥', '📋']

const FeatureCard = ({ icon, title, description }: FeatureItem & { icon: string }): JSX.Element => (
  <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/40 transition-colors">
    <span className="text-3xl" role="img" aria-label={title}>
      {icon}
    </span>
    <h3 className="text-text-primary font-bold text-lg">{title}</h3>
    <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
  </div>
)

export const Features = (): JSX.Element => {
  const { t } = useTranslation()
  const items = t('features.items', { returnObjects: true }) as FeatureItem[]

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            {t('features.heading')}
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <FeatureCard key={item.title} icon={icons[index]} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
