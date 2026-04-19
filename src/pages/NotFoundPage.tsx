import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'

export default function NotFoundPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <span className="text-8xl font-bold text-primary select-none">404</span>
        <h1 className="mt-4 text-3xl font-bold">Página não encontrada</h1>
        <p className="mt-3 text-text-secondary max-w-sm">
          O endereço que você acessou não existe ou foi removido.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block bg-primary hover:bg-primary-dark transition-colors text-white font-semibold px-8 py-3 rounded-xl"
        >
          Voltar para a Home
        </Link>
      </main>
      <Footer />
    </div>
  )
}
