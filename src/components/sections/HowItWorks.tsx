import type { JSX } from 'react'
import { useTranslation } from 'react-i18next'

type Step = {
  number: string
  title: string
  description: string
}

const StepCard = ({ number, title, description }: Step): JSX.Element => (
  <div className="flex flex-col items-center text-center gap-4">
    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
      <span className="text-primary font-bold text-xl">{number}</span>
    </div>
    <h3 className="text-text-primary font-bold text-xl">{title}</h3>
    <p className="text-text-secondary text-sm leading-relaxed max-w-xs">{description}</p>
  </div>
)

export const HowItWorks = (): JSX.Element => {
  const { t } = useTranslation()
  const steps = t('howItWorks.steps', { returnObjects: true }) as Step[]

  return (
    <section id="how-it-works" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            {t('howItWorks.heading')}
          </h2>
          <p className="text-text-secondary text-lg max-w-lg mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-border"
          />
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}
