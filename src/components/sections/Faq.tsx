import { useState } from 'react'
import type { JSX } from 'react'
import { useTranslation } from 'react-i18next'

type FaqItem = {
  question: string
  answer: string
}

const FaqRow = ({ question, answer }: FaqItem): JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-8 py-6 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="text-text-primary font-semibold group-hover:text-primary transition-colors">
          {question}
        </span>
        <span
          className={`text-text-secondary transition-transform duration-200 shrink-0 ${open ? 'rotate-45' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="px-8 pb-6 text-text-secondary leading-relaxed text-justify">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export const Faq = (): JSX.Element => {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true }) as FaqItem[]

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-text-primary mb-4 text-center">{t('faq.heading')}</h2>
        <p className="text-text-secondary text-lg mb-12 text-center">{t('faq.subtitle')}</p>

        <div className="border border-border rounded-2xl overflow-hidden">
          {items.map((item) => (
            <FaqRow key={item.question} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
