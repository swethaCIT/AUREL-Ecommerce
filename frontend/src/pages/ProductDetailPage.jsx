import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Heart, Minus, Plus, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductGridSection from '../components/ProductGridSection.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import { useShop } from '../hooks/useShop.js'
import { products } from '../data/products.js'
import { formatCurrency } from '../utils/formatCurrency.js'

function ProductDetailPage() {
  const { productId } = useParams()
  const product = products.find((item) => item.id === productId)

  if (!product) {
    return (
      <main id="main-content" className="mx-auto min-h-[55vh] max-w-4xl px-5 py-20">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-olive">
          AUREL collection
        </p>
        <h1 className="mt-3 font-serif text-4xl text-charcoal">
          This piece could not be found.
        </h1>
        <Link
          to="/shop"
          className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.15em] text-olive hover:text-bronze"
        >
          Return to shop
        </Link>
      </main>
    )
  }

  return <ProductDetail key={product.id} product={product} />
}

function ProductDetail({ product }) {
  const reducedMotion = useReducedMotion()
  const images = product.images.length ? product.images : [product.image]
  const [activeImage, setActiveImage] = useState(images[0])
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedVariant, setSelectedVariant] = useState(
    product.variantOptions[0] ?? '',
  )
  const [quantity, setQuantity] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const [addedToBag, setAddedToBag] = useState(false)
  const { addToBag, wishlistIds, toggleWishlist, recordRecentlyViewed } =
    useShop()
  const isSaved = wishlistIds.includes(product.id)
  const relatedProducts = products
    .filter(
      (item) =>
        item.categorySlug === product.categorySlug &&
        item.id !== product.id,
    )
    .sort((first, second) => second.popularity - first.popularity)
    .slice(0, 4)

  useEffect(() => {
    recordRecentlyViewed(product.id)
  }, [product.id, recordRecentlyViewed])

  function handleAddToBag() {
    if (product.sizeOptions.length > 0 && !selectedSize) {
      setSizeError(true)
      return
    }

    setSizeError(false)
    addToBag(
      product.id,
      selectedSize || null,
      quantity,
      selectedVariant || null,
    )
    setAddedToBag(true)
  }

  return (
    <>
      <main
        id="main-content"
        className="mx-auto max-w-[90rem] px-5 pb-14 pt-8 sm:px-8 sm:pb-20 lg:px-14 lg:pt-10"
      >
        <nav aria-label="Breadcrumb" className="text-[0.62rem] tracking-wide text-muted">
          <Link to="/" className="hover:text-olive">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link
            to={`/category/${product.categorySlug}`}
            className="hover:text-olive"
          >
            {product.category}
          </Link>
          <span className="px-2">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="mt-7 grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-10 lg:mt-10 lg:gap-16">
          <div className="grid gap-3 sm:grid-cols-[4.5rem_1fr]">
            {images.length > 1 && (
              <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={activeImage === image}
                    onClick={() => setActiveImage(image)}
                    className={`size-16 shrink-0 overflow-hidden border sm:size-[4.5rem] ${
                      activeImage === image
                        ? 'border-olive'
                        : 'border-transparent opacity-75'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt=""
                      className="size-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            <motion.div
              key={activeImage}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.35 }}
              className="relative aspect-[0.82] overflow-hidden bg-paper sm:order-2"
            >
              <ImageWithFallback
                src={activeImage}
                alt={product.imageAlt}
                fetchPriority="high"
                className="size-full object-cover"
              />
            </motion.div>
          </div>

          <section className="md:sticky md:top-28 md:self-start">
            <Link
              to={`/category/${product.categorySlug}`}
              className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-olive"
            >
              {product.category} · {product.subcategory}
            </Link>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-charcoal">
              {product.brand}
            </p>
            <h1 className="mt-2 font-serif text-4xl font-normal leading-tight tracking-[-0.04em] text-charcoal sm:text-5xl">
              {product.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-xl font-medium text-charcoal">
                {formatCurrency(product.sellingPrice)}
              </span>
              <span className="text-sm text-muted line-through">
                {formatCurrency(product.originalPrice)}
              </span>
              <span className="bg-paper px-2 py-1 text-[0.62rem] font-semibold text-olive">
                {product.discountPercentage}% off · demo offer
              </span>
            </div>
            <div className="mt-3 inline-flex items-center gap-1 text-xs text-charcoal">
              <Star size={13} fill="currentColor" aria-hidden="true" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-muted">
                ({product.reviewCount.toLocaleString()} demo reviews)
              </span>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
              {product.description}
            </p>

            {product.sizeOptions.length > 0 && (
              <fieldset className="mt-7">
                <legend className="text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-charcoal">
                  Choose a size
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizeOptions.map((size) => (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={selectedSize === size}
                      onClick={() => {
                        setSelectedSize(size)
                        setSizeError(false)
                      }}
                      className={`grid min-h-11 min-w-11 place-items-center border px-3 text-xs transition-colors ${
                        selectedSize === size
                          ? 'border-charcoal bg-charcoal text-white'
                          : 'border-charcoal/20 text-charcoal hover:border-olive'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p role="alert" className="mt-2 text-xs text-red-800">
                    Choose a size before adding this piece to your bag.
                  </p>
                )}
              </fieldset>
            )}

            {product.variantOptions.length > 0 && (
              <fieldset className="mt-6">
                <legend className="text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-charcoal">
                  {product.variantLabel}
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.variantOptions.map((variant) => (
                    <button
                      key={variant}
                      type="button"
                      aria-pressed={selectedVariant === variant}
                      onClick={() => setSelectedVariant(variant)}
                      className={`min-h-10 border px-3 text-xs transition-colors ${
                        selectedVariant === variant
                          ? 'border-olive bg-olive/10 text-charcoal'
                          : 'border-charcoal/20 text-charcoal hover:border-olive'
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex h-12 items-center border border-charcoal/20">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="grid size-10 place-items-center text-charcoal transition-colors hover:text-olive disabled:opacity-40"
                >
                  <Minus size={15} aria-hidden="true" />
                </button>
                <span className="w-6 text-center text-xs" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((current) => current + 1)}
                  className="grid size-10 place-items-center text-charcoal transition-colors hover:text-olive"
                >
                  <Plus size={15} aria-hidden="true" />
                </button>
              </div>
              <button
                type="button"
                onClick={handleAddToBag}
                className="inline-flex h-12 flex-1 items-center justify-center bg-olive px-6 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-charcoal active:scale-[0.99] sm:flex-none sm:min-w-56"
              >
                Add to bag
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-pressed={isSaved}
                aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                className="grid size-12 place-items-center border border-charcoal/20 text-charcoal transition-colors hover:border-bronze hover:text-bronze"
              >
                <Heart
                  size={18}
                  className={isSaved ? 'fill-bronze text-bronze' : ''}
                  aria-hidden="true"
                />
              </button>
            </div>

            <AnimatePresence>
              {addedToBag && (
                <motion.p
                  role="status"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.25 }}
                  className="mt-3 text-xs text-olive"
                >
                  Added to your bag. Your bag panel is open.
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-8 border-t border-charcoal/10">
              <h2 className="sr-only">Product details</h2>
              {product.details?.map((detail) => (
                <p
                  key={detail}
                  className="border-b border-charcoal/10 py-3 text-xs text-muted"
                >
                  {detail}
                </p>
              ))}
              <p className="border-b border-charcoal/10 py-3 text-xs text-muted">
                Availability: {product.availability}
              </p>
            </div>
            <p className="mt-4 text-[0.62rem] leading-5 text-muted">
              Product prices, ratings and offers are demonstration data only.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-olive hover:text-bronze"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Continue shopping
            </Link>
          </section>
        </div>
      </main>

      <ProductGridSection
        eyebrow={`More in ${product.category}`}
        title="You may also like."
        items={relatedProducts}
        viewAllTo={`/category/${product.categorySlug}`}
      />
    </>
  )
}

export default ProductDetailPage
