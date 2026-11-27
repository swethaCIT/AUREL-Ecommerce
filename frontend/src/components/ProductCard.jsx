import { motion } from 'framer-motion'
import { Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useShop } from '../hooks/useShop.js'
import { formatCurrency } from '../utils/formatCurrency.js'
import ImageWithFallback from './ImageWithFallback.jsx'

function ProductCard({ product }) {
  const { wishlistIds, toggleWishlist } = useShop()
  const wishlistEnabled = product.wishlistEnabled !== false
  const detailsEnabled = product.detailsEnabled !== false
  const isSaved = wishlistEnabled && wishlistIds.includes(product.id)
  const productPath = `/product/${product.id}`

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="group min-w-0"
    >
      <div className="relative aspect-[0.78] overflow-hidden bg-paper">
        {detailsEnabled ? (
          <Link
            to={productPath}
            aria-label={`View details for ${product.brand} ${product.name}`}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={product.image}
              alt={product.imageAlt}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
            />
          </Link>
        ) : (
          <ImageWithFallback
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
        )}
        <span className="pointer-events-none absolute left-2 top-2 bg-ivory/95 px-2 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.1em] text-olive sm:left-3 sm:top-3">
          {product.isNew ? 'New' : 'Demo offer'}
        </span>
        <span className="pointer-events-none absolute bottom-2 left-2 bg-charcoal/90 px-2 py-1 text-[0.56rem] font-semibold text-white sm:bottom-3 sm:left-3">
          {product.discountPercentage}% OFF
        </span>
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleWishlist(product.id)}
          disabled={!wishlistEnabled}
          aria-label={
            wishlistEnabled
              ? `${isSaved ? 'Remove from' : 'Save to'} Wishlist: ${product.name}`
              : `Wishlist is not available for ${product.name} yet`
          }
          aria-pressed={isSaved}
          title={
            wishlistEnabled
              ? isSaved
                ? 'Remove from Wishlist'
                : 'Save to Wishlist'
              : 'Wishlist is not connected for catalogue products yet'
          }
          className="absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-ivory/95 text-charcoal transition-colors hover:text-bronze disabled:cursor-not-allowed disabled:opacity-70 sm:right-3 sm:top-3"
        >
          <Heart
            size={17}
            strokeWidth={1.6}
            className={isSaved ? 'fill-bronze text-bronze' : ''}
          />
        </motion.button>
      </div>
      <div className="pt-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-charcoal">
              {product.brand}
            </p>
            <h3 className="mt-1 truncate font-serif text-[0.95rem] text-charcoal sm:text-lg">
              {detailsEnabled ? (
                <Link to={productPath} className="hover:text-olive">
                  {product.name}
                </Link>
              ) : (
                product.name
              )}
            </h3>
          </div>
          {Number.isFinite(product.rating) && (
            <span className="inline-flex shrink-0 items-center gap-1 bg-paper px-1.5 py-1 text-[0.58rem] text-charcoal">
              {product.rating.toFixed(1)}
              <Star size={10} fill="currentColor" aria-hidden="true" />
            </span>
          )}
        </div>
        <p className="mt-1 text-[0.58rem] text-muted">
          {product.category}
          {product.subcategory && ` · ${product.subcategory}`}
          {Number.isFinite(product.reviewCount) && (
            <span className="sr-only"> · {product.reviewCount} reviews</span>
          )}
        </p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-xs font-semibold text-charcoal sm:text-sm">
            {formatCurrency(product.sellingPrice)}
          </span>
          <span className="text-[0.62rem] text-muted line-through">
            {formatCurrency(product.originalPrice)}
          </span>
          <span className="text-[0.58rem] font-semibold text-olive">
            {product.discountPercentage}% off
          </span>
        </div>
        {detailsEnabled ? (
          <Link
            to={productPath}
            className="mt-3 inline-flex min-h-9 w-full items-center justify-center border border-charcoal/15 text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-charcoal transition-colors hover:border-olive hover:bg-olive hover:text-white"
          >
            View details
          </Link>
        ) : (
          <span
            aria-disabled="true"
            title="Product detail pages are not part of this integration milestone"
            className="mt-3 inline-flex min-h-9 w-full cursor-not-allowed items-center justify-center border border-charcoal/10 text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-muted"
          >
            Details coming soon
          </span>
        )}
      </div>
    </motion.article>
  )
}

export default ProductCard
