import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import WalletPage from './pages/WalletPage'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // wait a tick so the target page has rendered
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }))
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative mx-auto max-w-[1920px] overflow-x-clip">
        <TopBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/digital-wallet" element={<WalletPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
