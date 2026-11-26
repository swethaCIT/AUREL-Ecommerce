import { useState } from 'react'
import CategorySection from '../components/CategorySection.jsx'
import EditorialBanner from '../components/EditorialBanner.jsx'
import Footer from '../components/Footer.jsx'
import HeroSection from '../components/HeroSection.jsx'
import Navbar from '../components/Navbar.jsx'
import Newsletter from '../components/Newsletter.jsx'
import TrendingProducts from '../components/TrendingProducts.jsx'

function Home() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <Navbar onSearch={setSearchTerm} />
      <main>
        <HeroSection />
        <CategorySection />
        <TrendingProducts searchTerm={searchTerm} />
        <EditorialBanner />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}

export default Home
