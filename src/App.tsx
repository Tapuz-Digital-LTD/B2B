import TopBar from './components/TopBar'
import Hero from './components/Hero'
import Customers from './components/Customers'
import HowItWorks from './components/HowItWorks'
import Brands from './components/Brands'
import Testimonials from './components/Testimonials'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative mx-auto max-w-[1920px] overflow-x-clip">
      <TopBar />
      <main>
        <Hero />
        <Customers />
        <HowItWorks />
        <Brands />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
