import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { getBrands } from '../services/brandService.js'
import { getCategories } from '../services/categoryService.js'
import { getApiErrorMessage } from '../services/apiClient.js'
import { getProducts } from '../services/productService.js'

const pageSize = 12

function getApiSort(searchParams) {
  const sortBy = searchParams.get('sort_by')
  if (sortBy) {
    return {
      sortBy,
      order: searchParams.get('order') || 'desc',
    }
  }

  const legacySort = searchParams.get('sort')
  if (legacySort === 'price-low') return { sortBy: 'price', order: 'asc' }
  if (legacySort === 'price-high') return { sortBy: 'price', order: 'desc' }
  if (legacySort === 'popular') return { sortBy: 'popularity', order: 'desc' }
  if (legacySort === 'discount') return { sortBy: 'discount', order: 'desc' }
  return { sortBy: 'newest', order: 'desc' }
}

function titleFromSlug(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function ProductListingPage() {
  const { categorySlug: routeCategory } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const selectedCategory = routeCategory || searchParams.get('category') || ''
  const selectedBrand = searchParams.get('brand') || ''
  const query = (searchParams.get('search') || '').trim()
  const minPrice = searchParams.get('min_price') ?? searchParams.get('minPrice') ?? ''
  const maxPrice = searchParams.get('max_price') ?? searchParams.get('maxPrice') ?? ''
  const requestedPage = Math.max(
    1,
    Number.parseInt(searchParams.get('page') || '1', 10) || 1,
  )
  const { sortBy, order } = getApiSort(searchParams)
  const [searchDraft, setSearchDraft] = useState({ query, value: query })
  const [productRetry, setProductRetry] = useState(0)
  const [optionsRetry, setOptionsRetry] = useState(0)
  const [productResult, setProductResult] = useState(null)
  const [optionsResult, setOptionsResult] = useState(null)
  const searchValue = searchDraft.query === query ? searchDraft.value : query

  const requestParams = useMemo(() => {
    const params = {
      page: requestedPage,
      per_page: pageSize,
      sort_by: sortBy,
      order,
    }
    if (query) params.search = query
    if (selectedCategory) params.category = selectedCategory
    if (selectedBrand) params.brand = selectedBrand
    if (minPrice) params.min_price = minPrice
    if (maxPrice) params.max_price = maxPrice
    return params
  }, [
    maxPrice,
    minPrice,
    order,
    query,
    requestedPage,
    selectedBrand,
    selectedCategory,
    sortBy,
  ])
  const requestKey = `${JSON.stringify(requestParams)}:${productRetry}`
  const activeProductResult =
    productResult?.key === requestKey ? productResult : null
  const products = activeProductResult?.products ?? []
  const pagination = activeProductResult?.pagination ?? null
  const productError = activeProductResult?.error ?? ''
  const isLoading = !activeProductResult
  const activeOptionsResult =
    optionsResult?.retry === optionsRetry ? optionsResult : null
  const categories = activeOptionsResult?.categories ?? []
  const brands = activeOptionsResult?.brands ?? []
  const optionsError = activeOptionsResult?.error ?? ''
  const areOptionsLoading = !activeOptionsResult

  useEffect(() => {
    const controller = new AbortController()

    getProducts(requestParams, { signal: controller.signal })
      .then(({ products: fetchedProducts, pagination: pageData }) => {
        if (controller.signal.aborted) return
        setProductResult({
          key: requestKey,
          products: fetchedProducts,
          pagination: pageData,
          error: '',
        })
      })
      .catch((error) => {
        if (controller.signal.aborted) return
        setProductResult({
          key: requestKey,
          products: [],
          pagination: null,
          error: getApiErrorMessage(error),
        })
      })

    return () => controller.abort()
  }, [requestKey, requestParams])

  useEffect(() => {
    const controller = new AbortController()

    Promise.all([
      getCategories({ signal: controller.signal }),
      getBrands({ signal: controller.signal }),
    ])
      .then(([categoryData, brandData]) => {
        if (controller.signal.aborted) return
        setOptionsResult({
          retry: optionsRetry,
          categories: categoryData,
          brands: brandData,
          error: '',
        })
      })
      .catch((error) => {
        if (controller.signal.aborted) return
        setOptionsResult({
          retry: optionsRetry,
          categories: [],
          brands: [],
          error: getApiErrorMessage(error),
        })
      })

    return () => controller.abort()
  }, [optionsRetry])

  useEffect(() => {
    if (searchValue.trim() === query) return undefined

    const timeoutId = window.setTimeout(() => {
      const nextParams = new URLSearchParams(searchParams)
      const nextSearch = searchValue.trim()
      if (nextSearch) nextParams.set('search', nextSearch)
      else nextParams.delete('search')
      nextParams.delete('page')
      setSearchParams(nextParams, { replace: true })
    }, 350)

    return () => window.clearTimeout(timeoutId)
  }, [query, searchParams, searchValue, setSearchParams])

  useEffect(() => {
    if (!pagination || requestedPage <= pagination.total_pages) return
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('page', String(pagination.total_pages || 1))
    setSearchParams(nextParams, { replace: true })
  }, [pagination, requestedPage, searchParams, setSearchParams])

  function updateParam(name, value) {
    const nextParams = new URLSearchParams(searchParams)
    const aliases = {
      min_price: 'minPrice',
      max_price: 'maxPrice',
    }
    if (value) nextParams.set(name, value)
    else nextParams.delete(name)
    if (aliases[name]) nextParams.delete(aliases[name])
    if (name !== 'page') nextParams.delete('page')
    setSearchParams(nextParams, { replace: true })
  }

  function changeSort(value) {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('sort')
    nextParams.delete('page')
    if (value === 'price-low') {
      nextParams.set('sort_by', 'price')
      nextParams.set('order', 'asc')
    } else if (value === 'price-high') {
      nextParams.set('sort_by', 'price')
      nextParams.set('order', 'desc')
    } else {
      nextParams.set('sort_by', 'newest')
      nextParams.set('order', 'desc')
    }
    setSearchParams(nextParams, { replace: true })
  }

  function changeCategory(value) {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('category')
    nextParams.delete('page')
    const suffix = nextParams.toString()
    if (value) navigate(`/category/${value}${suffix ? `?${suffix}` : ''}`)
    else {
      nextParams.delete('subcategory')
      navigate(`/shop${nextParams.toString() ? `?${nextParams}` : ''}`)
    }
  }

  function clearFilters() {
    if (routeCategory) navigate('/shop')
    else setSearchParams({}, { replace: true })
  }

  const categoryName =
    categories.find((item) => item.slug === selectedCategory)?.name ||
    (selectedCategory ? titleFromSlug(selectedCategory) : '')
  const collection = searchParams.get('collection') || ''
  const collectionTitle = {
    new: 'New arrivals',
    'best-sellers': 'Most wanted',
    deals: 'Offers',
  }[collection]
  const title =
    categoryName || (query ? 'Search results' : collectionTitle || 'Shop all')
  const isSupportedSort = sortBy === 'price' || sortBy === 'newest'
  const displayedSort = isSupportedSort
    ? sortBy === 'price'
      ? order === 'asc'
        ? 'price-low'
        : 'price-high'
      : 'newest'
    : sortBy
  const total = pagination?.total ?? 0
  const visiblePage = pagination?.page ?? requestedPage
  const totalPages = Math.max(1, pagination?.total_pages ?? 1)
  const resultStart = total ? (visiblePage - 1) * pageSize + 1 : 0
  const resultEnd = Math.min(visiblePage * pageSize, total)
  const unknownCategory =
    selectedCategory &&
    categories.length > 0 &&
    !categories.some((item) => item.slug === selectedCategory)

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
            {isLoading
              ? 'Loading products…'
              : productError
                ? 'Catalogue unavailable'
                : `${total} ${total === 1 ? 'piece' : 'pieces'}`}
          </p>
        </header>

        {collectionTitle && (
          <p className="mt-4 text-xs leading-5 text-muted">
            This live catalogue does not yet include collection labels; products are
            shown from the available catalogue.
          </p>
        )}

        <div className="mt-6 grid gap-7 lg:grid-cols-[16rem_1fr] lg:gap-9">
          <aside
            aria-label="Product filters"
            className="grid grid-cols-2 gap-3 border-b border-charcoal/10 pb-5 sm:grid-cols-3 lg:block lg:border-b-0 lg:border-r lg:pr-7"
          >
            <label className="col-span-2 flex flex-col gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-charcoal sm:col-span-1 lg:col-span-2 lg:mt-0">
              Search products and brands
              <input
                type="search"
                value={searchValue}
                onChange={(event) =>
                  setSearchDraft({ query, value: event.target.value })
                }
                placeholder="Find a product or brand"
                className="h-10 min-w-0 border border-charcoal/15 bg-transparent px-3 text-xs font-normal normal-case tracking-normal outline-none transition-colors focus:border-olive"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-charcoal lg:mt-5">
              Category
              <select
                value={selectedCategory}
                onChange={(event) => changeCategory(event.target.value)}
                disabled={areOptionsLoading}
                className="h-10 min-w-0 border border-charcoal/15 bg-ivory px-2 text-xs font-normal normal-case tracking-normal outline-none focus:border-olive disabled:opacity-60"
              >
                <option value="">All categories</option>
                {unknownCategory && (
                  <option value={selectedCategory}>{categoryName}</option>
                )}
                {categories.map((item) => (
                  <option key={item.id ?? item.slug} value={item.slug}>
                    {item.name}
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
                    value={minPrice}
                    placeholder="0"
                    onChange={(event) => updateParam('min_price', event.target.value)}
                    className="mt-1 h-10 w-full border border-charcoal/15 bg-transparent px-2 text-xs text-charcoal outline-none focus:border-olive"
                  />
                </label>
                <label className="text-[0.58rem] text-muted">
                  Max
                  <input
                    type="number"
                    min="0"
                    aria-label="Maximum price"
                    value={maxPrice}
                    placeholder="Any"
                    onChange={(event) => updateParam('max_price', event.target.value)}
                    className="mt-1 h-10 w-full border border-charcoal/15 bg-transparent px-2 text-xs text-charcoal outline-none focus:border-olive"
                  />
                </label>
              </div>
            </div>

            <label className="flex flex-col gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-charcoal lg:mt-5">
              Brand
              <select
                value={selectedBrand}
                onChange={(event) => updateParam('brand', event.target.value)}
                disabled={areOptionsLoading}
                className="h-10 min-w-0 border border-charcoal/15 bg-ivory px-2 text-xs font-normal normal-case tracking-normal outline-none focus:border-olive disabled:opacity-60"
              >
                <option value="">All brands</option>
                {brands.map((brand) => (
                  <option key={brand.id ?? brand.slug ?? brand.name} value={brand.slug || brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-charcoal lg:mt-5">
              Sort by
              <select
                value={displayedSort}
                onChange={(event) => changeSort(event.target.value)}
                className="h-10 min-w-0 border border-charcoal/15 bg-ivory px-2 text-xs font-normal normal-case tracking-normal outline-none focus:border-olive"
              >
                {!isSupportedSort && (
                  <option value={sortBy} disabled>
                    Unsupported sort: {sortBy}
                  </option>
                )}
                <option value="newest">Newest</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>

            {optionsError && (
              <div className="col-span-2 text-xs text-red-800 sm:col-span-3 lg:mt-5">
                <p role="alert">Could not load category and brand filters: {optionsError}</p>
                <button
                  type="button"
                  onClick={() => setOptionsRetry((attempt) => attempt + 1)}
                  className="mt-2 font-semibold underline"
                >
                  Retry filters
                </button>
              </div>
            )}

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
              <p className="text-xs text-muted" aria-live="polite">
                {isLoading
                  ? 'Loading catalogue…'
                  : productError
                    ? 'Catalogue results unavailable'
                    : `Showing ${resultStart}–${resultEnd} of ${total} pieces`}
              </p>
            </div>

            {productError ? (
              <div className="border-y border-charcoal/10 py-12">
                <h2 className="font-serif text-2xl text-charcoal">
                  Catalogue unavailable
                </h2>
                <p role="alert" className="mt-2 text-sm text-muted">
                  {productError}
                </p>
                <button
                  type="button"
                  onClick={() => setProductRetry((attempt) => attempt + 1)}
                  className="mt-5 border border-charcoal/20 px-4 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-charcoal hover:border-olive hover:bg-olive hover:text-white"
                >
                  Retry
                </button>
              </div>
            ) : isLoading ? (
              <p role="status" className="border-y border-charcoal/10 py-12 text-sm text-muted">
                Loading products…
              </p>
            ) : products.length > 0 ? (
              <>
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
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>

                {totalPages > 1 && (
                  <nav
                    aria-label="Product pages"
                    className="mt-10 flex flex-wrap items-center justify-center gap-2"
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
              </>
            ) : (
              <div className="border-y border-charcoal/10 py-12">
                <h2 className="font-serif text-2xl text-charcoal">No pieces found</h2>
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
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductListingPage
