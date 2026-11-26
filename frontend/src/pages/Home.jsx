import BrandSection from '../components/BrandSection.jsx'
import CategorySection from '../components/CategorySection.jsx'
import DepartmentSection from '../components/DepartmentSection.jsx'
import HeroSection from '../components/HeroSection.jsx'
import Newsletter from '../components/Newsletter.jsx'
import OfferHighlights from '../components/OfferHighlights.jsx'
import ProductGridSection from '../components/ProductGridSection.jsx'
import RecommendedSection from '../components/RecommendedSection.jsx'
import TrustSection from '../components/TrustSection.jsx'
import AurelEdit from '../components/AurelEdit.jsx'
import { products } from '../data/products.js'

function Home() {
  const newArrivals = products
    .filter((product) => product.isNew)
    .sort((first, second) => second.popularity - first.popularity)
    .slice(0, 8)
  const trendingProducts = products
    .filter((product) => product.isTrending)
    .sort((first, second) => second.popularity - first.popularity)
    .slice(0, 8)

  return (
    <main id="main-content">
      <HeroSection />
      <CategorySection />
      <OfferHighlights />
      <ProductGridSection
        id="new-arrivals"
        eyebrow="Just arrived"
        title="New arrivals."
        description="Fresh finds from across the AUREL collection."
        items={newArrivals}
        viewAllTo="/shop?collection=new"
      />
      <ProductGridSection
        id="trending-products"
        eyebrow="Finding their way into favourites"
        title="Trending now."
        description="Popular pieces, chosen from our temporary demo catalog."
        items={trendingProducts}
        viewAllTo="/shop?sort=popular"
      />
      <DepartmentSection />
      <BrandSection />
      <AurelEdit />
      <RecommendedSection />
      <TrustSection />
      <Newsletter />
    </main>
  )
}

export default Home
