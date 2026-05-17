import type { JSX } from 'react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { supabase } from '../lib/supabase'

type PageState = 'exchanging' | 'form' | 'success' | 'invalidToken'

const EyeIcon = (): JSX.Element => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const EyeOffIcon = (): JSX.Element => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
)

export const ResetPasswordPage = (): JSX.Element => {
  const { t } = useTranslation()

  const [pageState, setPageState] = useState<PageState>(() => {
    const hash = window.location.hash
    const search = window.location.search
    if (hash.includes('error=')) return 'invalidToken'
    if (new URLSearchParams(search).has('code')) return 'exchanging'
    if (hash.includes('access_token=')) return 'exchanging'
    return 'invalidToken'
  })
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isPasswordValid = password.length >= 6
  const passwordsMatch = password === confirmPassword
  const isFormValid = isPasswordValid && passwordsMatch && confirmPassword.length > 0

  useEffect(() => {
    if (pageState !== 'exchanging') return

    const code = new URLSearchParams(window.location.search).get('code')

    // PKCE flow: exchange the code for a session (creates a real DB session)
    if (code) {
      supabase.auth
        .exchangeCodeForSession(code)
        .then(({ error }) => {
          history.replaceState(null, '', window.location.pathname)
          setPageState(error ? 'invalidToken' : 'form')
        })
      return
    }

    // Implicit flow: extract tokens from the URL hash and call setSession explicitly.
    // This avoids relying on onAuthStateChange event timing (detectSessionInUrl runs
    // as a microtask and may fire PASSWORD_RECOVERY before our listener is registered).
    const hashParams = new URLSearchParams(window.location.hash.slice(1))
    const access_token = hashParams.get('access_token')
    const refresh_token = hashParams.get('refresh_token')

    if (!access_token || !refresh_token) {
      setPageState('invalidToken')
      return
    }

    supabase.auth
      .setSession({ access_token, refresh_token })
      .then(({ data, error }) => {
        if (error || !data.session) {
          setPageState('invalidToken')
        } else {
          setPageState('form')
        }
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!isFormValid) return

    setSubmitError(null)
    setIsSubmitting(true)

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setIsSubmitting(false)
      setSubmitError(t('resetPassword.errorGeneric'))
      return
    }

    await supabase.auth.signOut()
    history.replaceState(null, '', window.location.pathname)
    setIsSubmitting(false)
    setPageState('success')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="w-full max-w-md">
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
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('resetPassword.newPasswordPlaceholder')}
                      className="w-full bg-surface-alt border border-border rounded-xl px-4 py-3 pr-11 text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                      aria-label={showPassword ? t('resetPassword.hidePassword') : t('resetPassword.showPassword')}
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  <p className={`text-xs transition-colors ${password.length === 0 ? 'text-text-secondary/50' : isPasswordValid ? 'text-success' : 'text-danger'}`}>
                    {t('resetPassword.passwordHint')}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-text-secondary">
                    {t('resetPassword.confirmPassword')}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t('resetPassword.confirmPasswordPlaceholder')}
                      className="w-full bg-surface-alt border border-border rounded-xl px-4 py-3 pr-11 text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                      aria-label={showConfirmPassword ? t('resetPassword.hidePassword') : t('resetPassword.showPassword')}
                    >
                      {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && (
                    <p className={`text-xs ${passwordsMatch ? 'text-success' : 'text-danger'}`}>
                      {passwordsMatch ? t('resetPassword.passwordsMatch') : t('resetPassword.errorPasswordMismatch')}
                    </p>
                  )}
                </div>

                {submitError && (
                  <p className="text-sm text-danger">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
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
