import type { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'

type Section = {
  title: string
  content: string
}

export const TermsPage = (): JSX.Element => {
  const { t } = useTranslation()
  const sections = t('terms.sections', { returnObjects: true }) as Section[]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 pt-32 pb-16">
        <h1 className="text-4xl font-bold text-text-primary mb-2">{t('terms.title')}</h1>
        <p className="text-text-secondary text-sm mb-8">{t('terms.lastUpdated')}</p>

        <div className="border border-border rounded-2xl overflow-hidden">
          {sections.map(({ title, content }) => (
            <section
              key={title}
              className="px-12 py-9"
            >
              <h2 className="text-lg font-bold text-text-primary mb-3">{title}</h2>
              <p className="text-text-secondary leading-relaxed text-justify">{content}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
