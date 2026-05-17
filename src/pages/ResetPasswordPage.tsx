import type { JSX } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { supabase } from '../lib/supabase'

type PageState = 'landing' | 'exchanging' | 'form' | 'success' | 'invalidToken'

export const ResetPasswordPage = (): JSX.Element => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  const [pageState, setPageState] = useState<PageState>(() => {
    if (window.location.hash.includes('error=')) return 'invalidToken'
    return searchParams.get('code') ? 'landing' : 'invalidToken'
  })
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStartReset = async (): Promise<void> => {
    const code = searchParams.get('code')
    if (!code) return

    setPageState('exchanging')

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      setPageState('invalidToken')
    } else {
      setPageState('form')
    }
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setFieldError(null)
    setSubmitError(null)

    if (password.length < 6) {
      setFieldError(t('resetPassword.errorPasswordTooShort'))
      return
    }

    if (password !== confirmPassword) {
      setFieldError(t('resetPassword.errorPasswordMismatch'))
      return
    }

    setIsSubmitting(true)

    const { error } = await supabase.auth.updateUser({ password })

    setIsSubmitting(false)

    if (error) {
      setSubmitError(t('resetPassword.errorGeneric'))
      return
    }

    setPageState('success')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="w-full max-w-md">
          {pageState === 'landing' && (
            <div className="bg-surface border border-border rounded-2xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-text-primary mb-2">
                {t('resetPassword.landingTitle')}
              </h1>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {t('resetPassword.landingMessage')}
              </p>
              <button
                onClick={handleStartReset}
                className="w-full inline-flex items-center justify-center font-semibold rounded-xl px-6 py-3 transition-all duration-200 bg-primary text-white hover:bg-primary-dark active:scale-95"
              >
                {t('resetPassword.startButton')}
              </button>
            </div>
          )}

          {pageState === 'exchanging' && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {pageState === 'invalidToken' && (
            <div className="bg-surface border border-border rounded-2xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-danger"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-text-primary mb-2">
                {t('resetPassword.errorInvalidToken')}
              </h1>
            </div>
          )}

          {pageState === 'form' && (
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h1 className="text-2xl font-bold text-text-primary mb-1">{t('resetPassword.title')}</h1>
              <p className="text-text-secondary text-sm mb-6">{t('resetPassword.subtitle')}</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-text-secondary">
                    {t('resetPassword.newPassword')}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('resetPassword.newPasswordPlaceholder')}
                    required
                    className="bg-surface-alt border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-text-secondary">
                    {t('resetPassword.confirmPassword')}
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t('resetPassword.confirmPasswordPlaceholder')}
                    required
                    className="bg-surface-alt border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-primary transition-colors"
                  />
                </div>

                {(fieldError ?? submitError) && (
                  <p className="text-sm text-danger">{fieldError ?? submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex items-center justify-center font-semibold rounded-xl px-6 py-3 transition-all duration-200 bg-primary text-white hover:bg-primary-dark active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {isSubmitting ? t('resetPassword.saving') : t('resetPassword.submit')}
                </button>
              </form>
            </div>
          )}

          {pageState === 'success' && (
            <div className="bg-surface border border-border rounded-2xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-text-primary mb-2">
                {t('resetPassword.successTitle')}
              </h1>
              <p className="text-text-secondary text-sm leading-relaxed">
                {t('resetPassword.successMessage')}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
