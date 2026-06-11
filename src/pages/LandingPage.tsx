import HeroLanding from '../components/landing/HeroLanding'
import LogosBanner from '../components/landing/LogosBanner'
import About from '../components/landing/About'
import BrandsWall from '../components/landing/BrandsWall'
import Options from '../components/landing/Options'
import SystemShowcase from '../components/landing/SystemShowcase'
import FaqSection from '../components/landing/FaqSection'
import Testimonials from '../components/Testimonials'
import ContactForm from '../components/ContactForm'

/** Home — the main XTRA landing page. */
export default function LandingPage() {
  return (
    <main>
      <HeroLanding />
      <LogosBanner />
      <About />
      <BrandsWall />
      <Options />
      <SystemShowcase />
      <Testimonials />
      <FaqSection />
      <ContactForm />
    </main>
  )
}
