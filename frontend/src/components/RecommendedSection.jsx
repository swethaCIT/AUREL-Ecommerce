import ProductGridSection from './ProductGridSection.jsx'
import { useShop } from '../hooks/useShop.js'
import { products } from '../data/products.js'

function RecommendedSection() {
  const { recentlyViewedIds } = useShop()
  const mostRecentlyViewed = products.find(
    (product) => product.id === recentlyViewedIds[0],
  )
  const recommendations = products
    .filter(
      (product) =>
        product.id !== mostRecentlyViewed?.id &&
        (!mostRecentlyViewed ||
          product.categorySlug === mostRecentlyViewed.categorySlug),
    )
    .sort((first, second) => second.popularity - first.popularity)
    .slice(0, 4)
  const items =
    recommendations.length === 4
      ? recommendations
      : [...recommendations, ...products]
          .filter(
            (product, index, list) =>
              list.findIndex((candidate) => candidate.id === product.id) === index &&
              product.id !== mostRecentlyViewed?.id,
          )
          .slice(0, 4)

  return (
    <ProductGridSection
      id="recommended"
      eyebrow={mostRecentlyViewed ? `Because you viewed ${mostRecentlyViewed.name}` : 'AUREL recommends'}
      title="Recommended for you."
      description="Explore pieces chosen from across the AUREL demo collection."
      items={items}
      viewAllTo="/shop?sort=popular"
    />
  )
}

export default RecommendedSection
