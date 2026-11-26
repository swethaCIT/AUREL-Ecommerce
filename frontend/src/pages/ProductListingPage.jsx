import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { categories, products } from '../data/products.js'
import { formatCurrency } from '../utils/formatCurrency.js'

const maximumAvailablePrice = Math.max(...products.map((product) => product.price))

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
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') ?? '')
  const categorySlug = routeCategory || searchParams.get('category') || ''
  const category = categories.find((item) => item.slug === categorySlug)
  const collection = searchParams.get('collection') ?? ''
  const sortBy = searchParams.get('sort') ?? 'popular'
  const minPrice = readPrice(searchParams.get('minPrice'), 0)
  const maxPrice = readPrice(
    searchParams.get('maxPrice'),
    maximumAvailablePrice,
  )
  const query = (searchParams.get('search') ?? '').trim().toLowerCase()

  function updateParam(name, value) {
    const nextParams = new URLSearchParams(searchParams)
    if (value) nextParams.set(name, value)
    else nextParams.delete(name)
    setSearchParams(nextParams, { replace: true })
  }

  const visibleProducts = products
    .filter((product) => {
      const matchesCategory =
        !categorySlug || product.categorySlug === categorySlug
      const matchesCollection =
        collection === 'new'
          ? product.isNew
          : collection === 'best-sellers'
            ? product.isBestSeller
            : true
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice
      const matchesQuery =
        !query ||
        `${product.name} ${product.category} ${product.description} ${product.label ?? ''}`
          .toLowerCase()
          .includes(query)

      return (
        matchesCategory && matchesCollection && matchesPrice && matchesQuery
      )
    })
    .sort((first, second) => {
      if (sortBy === 'price-low') return first.price - second.price
      if (sortBy === 'price-high') return second.price - first.price
      if (sortBy === 'newest') {
        return Number(second.isNew) - Number(first.isNew) ||
          second.popularity - first.popularity
      }
      return second.popularity - first.popularity
    })

  const title = category?.name
    ? `${category.name} collection`
    : collection === 'new'
      ? 'New arrivals'
      : collection === 'best-sellers'
        ? 'Most wanted'
        : query
          ? 'Search results'
          : 'Shop all'

  function changeCategory(value) {
    if (routeCategory) {
      navigate(value ? `/category/${value}` : '/shop')
      return
    }

    updateParam('category', value)
  }

  function clearFilters() {
    setSearchTerm('')
    if (routeCategory) navigate('/shop')
    else setSearchParams({}, { replace: true })
  }

  return (
    <main id="main-content" className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-[90rem] px-5 pb-20 pt-9 sm:px-8 sm:pt-12 lg:px-14 lg:pb-24">
        <nav aria-label="Breadcrumb" className="text-[0.62rem] tracking-wide text-muted">
          <Link to="/" className="hover:text-olive">
            Home
          </Link>
          <span className="px-2">/</span>
          <span aria-current="page">{title}</span>
        </nav>

        <header className="mt-7 flex flex-col justify-between gap-4 border-b border-charcoal/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-olive">
              AUREL collection
            </p>
            <h1 className="mt-2 font-serif text-4xl font-normal tracking-[-0.04em] text-charcoal sm:text-5xl">
              {title}
            </h1>
          </div>
          <p className="text-sm text-muted" aria-live="polite">
            {visibleProducts.length}{' '}
            {visibleProducts.length === 1 ? 'piece' : 'pieces'}
          </p>
        </header>

        <div className="mt-7 grid gap-8 lg:grid-cols-[15rem_1fr] lg:gap-10">
          <aside
            aria-label="Product filters"
            className="grid grid-cols-2 gap-4 border-b border-charcoal/10 pb-6 sm:grid-cols-4 lg:block lg:border-b-0 lg:border-r lg:pr-8"
          >
            <label className="col-span-2 flex flex-col gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-charcoal sm:col-span-1">
              Search
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => {
                  const value = event.target.value
                  setSearchTerm(value)
                  updateParam('search', value.trim())
                }}
                placeholder="Find a piece"
                className="h-10 min-w-0 border border-charcoal/15 bg-transparent px-3 text-xs font-normal normal-case tracking-normal outline-none transition-colors focus:border-olive"
              />
            </label>

            <label className="flex flex-col gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-charcoal lg:mt-6">
              Category
              <select
                value={categorySlug}
                onChange={(event) => changeCategory(event.target.value)}
                className="h-10 border border-charcoal/15 bg-ivory px-3 text-xs font-normal normal-case tracking-normal outline-none focus:border-olive"
              >
                <option value="">All categories</option>
                {categories.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="col-span-2 sm:col-span-1 lg:mt-6">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-charcoal">
                Price range
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <label className="text-[0.58rem] text-muted">
                  Min
                  <input
                    type="number"
                    min="0"
                    max={maximumAvailablePrice}
                    aria-label="Minimum price"
                    value={searchParams.get('minPrice') ?? '0'}
                    onChange={(event) =>
                      updateParam('minPrice', event.target.value)
                    }
                    className="mt-1 h-10 w-full border border-charcoal/15 bg-transparent px-2 text-xs text-charcoal outline-none focus:border-olive"
                  />
                </label>
                <label className="text-[0.58rem] text-muted">
                  Max
                  <input
                    type="number"
                    min="0"
                    max={maximumAvailablePrice}
                    aria-label="Maximum price"
                    value={
                      searchParams.get('maxPrice') ??
                      String(maximumAvailablePrice)
                    }
                    onChange={(event) =>
                      updateParam('maxPrice', event.target.value)
                    }
                    className="mt-1 h-10 w-full border border-charcoal/15 bg-transparent px-2 text-xs text-charcoal outline-none focus:border-olive"
                  />
                </label>
              </div>
              <p className="mt-2 text-[0.6rem] text-muted">
                {formatCurrency(minPrice)} – {formatCurrency(maxPrice)}
              </p>
            </div>

            <label className="flex flex-col gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-charcoal lg:mt-6">
              Sort by
              <select
                value={sortBy}
                onChange={(event) => updateParam('sort', event.target.value)}
                className="h-10 border border-charcoal/15 bg-ivory px-3 text-xs font-normal normal-case tracking-normal outline-none focus:border-olive"
              >
                <option value="popular">Popularity</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>

            <button
              type="button"
              onClick={clearFilters}
              className="col-span-2 mt-1 w-fit text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-olive hover:text-bronze sm:col-span-1 lg:mt-7"
            >
              Clear filters
            </button>
          </aside>

          {visibleProducts.length > 0 ? (
            <motion.div
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: reducedMotion ? 0 : 0.08 },
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
            <div className="py-12">
              <h2 className="font-serif text-2xl text-charcoal">
                No pieces found
              </h2>
              <p className="mt-2 text-sm text-muted">
                Try a different search or widen your price range.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-olive hover:text-bronze"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default ProductListingPage
