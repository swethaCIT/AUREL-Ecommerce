import ProductGridSection from '../components/ProductGridSection.jsx'
import { useShop } from '../hooks/useShop.js'
import { products } from '../data/products.js'

function WishlistPage() {
  const { wishlistIds } = useShop()
  const wishlistProducts = wishlistIds.map((id) =>
    products.find((product) => product.id === id),
  )

  return (
    <main id="main-content" className="min-h-[65vh]">
      <ProductGridSection
        eyebrow="Kept close"
        title="Your wishlist."
        description="A place for the pieces you would like to come back to."
        items={wishlistProducts}
        emptyMessage="Your wishlist is empty. Save a piece with the heart to find it here."
      />
    </main>
  )
}

export default WishlistPage
