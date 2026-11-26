import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { categories, products, slugify } from '../data/products.js'
import { formatCurrency } from '../utils/formatCurrency.js'

const pageSize = 12
const maximumAvailablePrice = Math.max(
  ...products.map((product) => product.sellingPrice),
)

function readPrice(value, fallback) {
  if (value === null || value.trim() === '') return fallback
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback
}

function ProductListingPage() {
  const { categorySlug: routeCategory } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const selectedCategory = routeCategory || searchParams.get('category') || ''
  const category = categories.find((item) => item.slug === selectedCategory)
  const collection = searchParams.get('collection') ?? ''
  const query = (searchParams.get('search') ?? '').trim().toLowerCase()
  const selectedSubcategory = searchParams.get('subcategory') ?? ''
  const selectedBrand = searchParams.get('brand') ?? ''
  const selectedSize = searchParams.get('size') ?? ''
  const minPrice = readPrice(searchParams.get('minPrice'), 0)
  const maxPrice = readPrice(
    searchParams.get('maxPrice'),
    maximumAvailablePrice,
  )
  const minDiscount = readPrice(searchParams.get('minDiscount'), 0)
  const minRating = readPrice(searchParams.get('rating'), 0)
  const sortBy =
    searchParams.get('sort') ?? (collection === 'deals' ? 'discount' : 'popular')
  const currentPage = Math.max(
    1,
    Number.parseInt(searchParams.get('page') ?? '1', 10) || 1,
  )

  function updateParam(name, value) {
    const nextParams = new URLSearchParams(searchParams)
    if (value) nextParams.set(name, value)
    else nextParams.delete(name)
    if (name !== 'page') nextParams.delete('page')
    setSearchParams(nextParams, { replace: true })
  }

  const availableSubcategories = useMemo(() => {
    return [
      ...new Set(
        products
          .filter(
            (product) =>
              !selectedCategory ||
              (selectedCategory === 'footwear'
                ? product.subcategorySlug === 'footwear'
                : product.categorySlug === selectedCategory),
          )
          .map((product) => product.subcategory),
      ),
    ].sort()
  }, [selectedCategory])

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          !selectedCategory ||
          (selectedCategory === 'footwear'
            ? product.subcategorySlug === 'footwear'
            : product.categorySlug === selectedCategory)
        const matchesCollection =
          collection === 'new'
            ? product.isNew
            : collection === 'best-sellers'
              ? product.isBestSeller
              : collection === 'deals'
                ? true
                : true
        const matchesSearch =
          !query ||
          `${product.name} ${product.brand} ${product.category} ${product.subcategory} ${product.description}`
            .toLowerCase()
            .includes(query)
        const matchesPrice =
          product.sellingPrice >= minPrice &&
          product.sellingPrice <= maxPrice
        const matchesDiscount = product.discountPercentage >= minDiscount
        const matchesBrand =
          !selectedBrand || product.brand === selectedBrand
        const matchesRating = product.rating >= minRating
        const matchesSize =
          !selectedSize || product.sizeOptions.includes(selectedSize)
        const matchesSubcategory =
          !selectedSubcategory ||
          product.subcategorySlug === selectedSubcategory

        return (
          product.available &&
          matchesCategory &&
          matchesCollection &&
          matchesSearch &&
          matchesPrice &&
          matchesDiscount &&
          matchesBrand &&
          matchesRating &&
          matchesSize &&
          matchesSubcategory
        )
      })
      .sort((first, second) => {
        if (sortBy === 'price-low') {
          return first.sellingPrice - second.sellingPrice
        }
        if (sortBy === 'price-high') {
          return second.sellingPrice - first.sellingPrice
        }
        if (sortBy === 'discount') {
          return (
            second.discountPercentage - first.discountPercentage ||
            second.popularity - first.popularity
          )
        }
        if (sortBy === 'newest') {
          return Number(second.isNew) - Number(first.isNew) ||
            second.popularity - first.popularity
        }
        return second.popularity - first.popularity
      })
  }, [
    collection,
    maxPrice,
    minDiscount,
    minPrice,
    minRating,
    query,
    selectedBrand,
    selectedCategory,
    selectedSize,
    selectedSubcategory,
    sortBy,
  ])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const visiblePage = Math.min(currentPage, totalPages)
  const visibleProducts = filteredProducts.slice(
    (visiblePage - 1) * pageSize,
    visiblePage * pageSize,
  )

  const title = category?.name
    ? category.name
    : collection === 'new'
      ? 'New arrivals'
      : collection === 'best-sellers'
        ? 'Most wanted'
        : collection === 'deals'
          ? 'Demo offers'
          : query
            ? 'Search results'
            : 'Shop all'

  function changeCategory(value) {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('category')
    nextParams.delete('subcategory')
    nextParams.delete('page')
    const suffix = nextParams.toString()
    if (value) navigate(`/category/${value}${suffix ? `?${suffix}` : ''}`)
    else navigate(`/shop${suffix ? `?${suffix}` : ''}`)
  }

  function clearFilters() {
    if (routeCategory) navigate('/shop')
    else setSearchParams({}, { replace: true })
  }

  const sizes = [
    ...new Set(
      products
        .filter(
          (product) =>
            !selectedCategory ||
            (selectedCategory === 'footwear'
              ? product.subcategorySlug === 'footwear'
              : product.categorySlug === selectedCategory),
        )
        .flatMap((product) => product.sizeOptions),
    ),
  ].sort((first, second) => first.localeCompare(second, undefined, { numeric: true }))

  return (
    <main id="main-content" className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-[90rem] px-5 pb-20 pt-8 sm:px-8 sm:pt-10 lg:px-14 lg:pb-24">
        <nav aria-label="Breadcrumb" className="text-[0.62rem] tracking-wide text-muted">
          <Link to="/" className="hover:text-olive">
            Home
          </Link>
          <span className="px-2">/</span>
          <span aria-current="page">{title}</span>
        </nav>

        <header className="mt-6 flex flex-col justify-between gap-4 border-b border-charcoal/10 pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-olive">
              AUREL collection
            </p>
            <h1 className="mt-2 font-serif text-4xl font-normal tracking-[-0.04em] text-charcoal sm:text-5xl">
              {title}
            </h1>
          </div>
          <p className="text-sm text-muted" aria-live="polite">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'piece' : 'pieces'}
          </p>
        </header>

        <div className="mt-6 grid gap-7 lg:grid-cols-[16rem_1fr] lg:gap-9">
          <aside
            aria-label="Product filters"
            className="grid grid-cols-2 gap-3 border-b border-charcoal/10 pb-5 sm:grid-cols-3 lg:block lg:border-b-0 lg:border-r lg:pr-7"
          >
            <label className="col-span-2 flex flex-col gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-charcoal sm:col-span-1 lg:col-span-2 lg:mt-0">
              Search products and brands
              <input
                type="search"
                value={searchParams.get('search') ?? ''}
                onChange={(event) => updateParam('search', event.target.value.trim())}
                placeholder="Find a product or brand"
                className="h-10 min-w-0 border border-charcoal/15 bg-transparent px-3 text-xs font-normal normal-case tracking-normal outline-none transition-colors focus:border-olive"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-charcoal lg:mt-5">
              Department
              <select
                value={selectedCategory}
                onChange={(event) => changeCategory(event.target.value)}
                className="h-10 min-w-0 border border-charcoal/15 bg-ivory px-2 text-xs font-normal normal-case tracking-normal outline-none focus:border-olive"
              >
                <option value="">All departments</option>
                {categories.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-charcoal lg:mt-5">
              Subcategory
              <select
                value={selectedSubcategory}
                onChange={(event) => updateParam('subcategory', event.target.value)}
                className="h-10 min-w-0 border border-charcoal/15 bg-ivory px-2 text-xs font-normal normal-case tracking-normal outline-none focus:border-olive"
              >
                <option value="">All types</option>
                {availableSubcategories.map((subcategory) => (
                  <option
                    key={subcategory}
                    value={slugify(subcategory)}
                  >
                    {subcategory}
                  </option>
                ))}
              </select>
            </label>

            <div className="col-span-2 sm:col-span-1 lg:mt-5">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-charcoal">
                Price range
              </p>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                <label className="text-[0.58rem] text-muted">
                  Min
                  <input
                    type="number"
                    min="0"
                    aria-label="Minimum price"
                    value={searchParams.get('minPrice') ?? ''}
                    placeholder="0"
                    onChange={(event) => updateParam('minPrice', event.target.value)}
                    className="mt-1 h-10 w-full border border-charcoal/15 bg-transparent px-2 text-xs text-charcoal outline-none focus:border-olive"
                  />
                </label>
                <label className="text-[0.58rem] text-muted">
                  Max
                  <input
                    type="number"
                    min="0"
                    aria-label="Maximum price"
                    value={searchParams.get('maxPrice') ?? ''}
                    placeholder={String(maximumAvailablePrice)}
                    onChange={(event) => updateParam('maxPrice', event.target.value)}
                    className="mt-1 h-10 w-full border border-charcoal/15 bg-transparent px-2 text-xs text-charcoal outline-none focus:border-olive"
                  />
                </label>
              </div>
              <p className="mt-1.5 text-[0.58rem] text-muted">
                {formatCurrency(minPrice)} – {formatCurrency(maxPrice)}
              </p>
            </div>

            <label className="flex flex-col gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-charcoal lg:mt-5">
              Discount
              <select
                value={searchParams.get('minDiscount') ?? ''}
                onChange={(event) => updateParam('minDiscount', event.target.value)}
                className="h-10 min-w-0 border border-charcoal/15 bg-ivory px-2 text-xs font-normal normal-case tracking-normal outline-none focus:border-olive"
              >
                <option value="">Any offer</option>
                <option value="10">10% and above</option>
                <option value="20">20% and above</option>
                <option value="40">40% and above</option>
                <option value="60">60% and above</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-charcoal lg:mt-5">
              Brand
              <select
                value={selectedBrand}
                onChange={(event) => updateParam('brand', event.target.value)}
                className="h-10 min-w-0 border border-charcoal/15 bg-ivory px-2 text-xs font-normal normal-case tracking-normal outline-none focus:border-olive"
              >
                <option value="">All brands</option>
                {[...new Set(products.map((product) => product.brand))]
                  .sort()
                  .map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-charcoal lg:mt-5">
              Customer rating
              <select
                value={searchParams.get('rating') ?? ''}
                onChange={(event) => updateParam('rating', event.target.value)}
                className="h-10 min-w-0 border border-charcoal/15 bg-ivory px-2 text-xs font-normal normal-case tracking-normal outline-none focus:border-olive"
              >
                <option value="">All ratings</option>
                <option value="4">4★ and above</option>
                <option value="4.5">4.5★ and above</option>
              </select>
            </label>

            {sizes.length > 0 && (
              <label className="flex flex-col gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-charcoal lg:mt-5">
                Size
                <select
                  value={selectedSize}
                  onChange={(event) => updateParam('size', event.target.value)}
                  className="h-10 min-w-0 border border-charcoal/15 bg-ivory px-2 text-xs font-normal normal-case tracking-normal outline-none focus:border-olive"
                >
                  <option value="">All sizes</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label className="flex flex-col gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-charcoal lg:mt-5">
              Sort by
              <select
                value={sortBy}
                onChange={(event) => updateParam('sort', event.target.value)}
                className="h-10 min-w-0 border border-charcoal/15 bg-ivory px-2 text-xs font-normal normal-case tracking-normal outline-none focus:border-olive"
              >
                <option value="popular">Popularity</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="discount">Discount: high to low</option>
              </select>
            </label>

            <button
              type="button"
              onClick={clearFilters}
              className="col-span-2 mt-1 w-fit text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-olive hover:text-bronze sm:col-span-1 lg:mt-6"
            >
              Clear all filters
            </button>
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-charcoal/10 pb-3">
              <p className="text-xs text-muted">
                Showing {visibleProducts.length ? (visiblePage - 1) * pageSize + 1 : 0}–
                {Math.min(visiblePage * pageSize, filteredProducts.length)} of{' '}
                {filteredProducts.length} pieces
              </p>
              {collection === 'deals' && (
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-olive">
                  Demo offers · No countdown
                </p>
              )}
            </div>

            {visibleProducts.length > 0 ? (
              <motion.div
                key={`${selectedCategory}-${query}-${visiblePage}`}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: reducedMotion ? 0 : 0.045,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-3 lg:gap-6"
              >
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <div className="border-y border-charcoal/10 py-12">
                <h2 className="font-serif text-2xl text-charcoal">
                  No pieces found
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Try a different search or widen your filters.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-olive hover:text-bronze"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {filteredProducts.length > pageSize && (
              <nav
                aria-label="Product pages"
                className="mt-10 flex items-center justify-center gap-2"
              >
                <button
                  type="button"
                  disabled={visiblePage <= 1}
                  onClick={() => updateParam('page', String(visiblePage - 1))}
                  className="min-h-10 border border-charcoal/15 px-3 text-xs text-charcoal disabled:opacity-40"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      aria-current={page === visiblePage ? 'page' : undefined}
                      onClick={() => updateParam('page', String(page))}
                      className={`grid size-10 place-items-center text-xs ${
                        page === visiblePage
                          ? 'bg-charcoal text-white'
                          : 'border border-charcoal/15 text-charcoal hover:border-olive'
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  disabled={visiblePage >= totalPages}
                  onClick={() => updateParam('page', String(visiblePage + 1))}
                  className="min-h-10 border border-charcoal/15 px-3 text-xs text-charcoal disabled:opacity-40"
                >
                  Next
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductListingPage
