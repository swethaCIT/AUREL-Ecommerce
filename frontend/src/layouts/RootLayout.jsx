import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

function RootLayout() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[60] bg-ivory p-3 text-charcoal focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default RootLayout
