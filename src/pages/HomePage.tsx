import type { JSX } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Features } from '../components/sections/Features'
import { HowItWorks } from '../components/sections/HowItWorks'
import { Download } from '../components/sections/Download'
import { Faq } from '../components/sections/Faq'

export const HomePage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <Faq />
        <Download />
      </main>
      <Footer />
    </div>
  )
}
