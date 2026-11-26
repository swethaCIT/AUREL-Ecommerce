import AurelEdit from '../components/AurelEdit.jsx'
import CategorySection from '../components/CategorySection.jsx'
import HeroSection from '../components/HeroSection.jsx'
import Newsletter from '../components/Newsletter.jsx'
import ProductGridSection from '../components/ProductGridSection.jsx'
import PromotionBanner from '../components/PromotionBanner.jsx'
import TrustSection from '../components/TrustSection.jsx'
import { useShop } from '../hooks/useShop.js'
import { products } from '../data/products.js'

function Home() {
  const { recentlyViewedIds } = useShop()
  const newArrivals = products.filter((product) => product.isNew).slice(0, 4)
  const bestSellers = products
    .filter((product) => product.isBestSeller)
    .slice(0, 4)
  const recentlyViewed = recentlyViewedIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean)

  return (
    <main id="main-content">
      <HeroSection />
      <CategorySection />
      <ProductGridSection
        id="new-arrivals"
        eyebrow="Just arrived"
        title="New arrivals."
        description="Fresh finds, chosen for right now and the days ahead."
        items={newArrivals}
        viewAllTo="/shop?collection=new"
      />
      <ProductGridSection
        id="best-sellers"
        eyebrow="Most wanted"
        title="Well-loved, for good reason."
        description="A few favourites, chosen again and again."
        items={bestSellers}
        viewAllTo="/shop?collection=best-sellers"
      />
      <PromotionBanner />
      <AurelEdit />
      <ProductGridSection
        id="recently-viewed"
        eyebrow="A second look"
        title="Recently viewed."
        items={recentlyViewed}
        emptyMessage="Products you visit will appear here while you browse."
      />
      <TrustSection />
      <Newsletter />
    </main>
  )
}

export default Home
