import Hero from '../components/Hero'
import Customers from '../components/Customers'
import HowItWorks from '../components/HowItWorks'
import Brands from '../components/Brands'
import Testimonials from '../components/Testimonials'
import ContactForm from '../components/ContactForm'

/** "ארנק אקסטרה" — the digital wallet product page. */
export default function WalletPage() {
  return (
    <main>
      <Hero />
      <Customers />
      <HowItWorks />
      <Brands />
      <Testimonials />
      <ContactForm />
    </main>
  )
}
