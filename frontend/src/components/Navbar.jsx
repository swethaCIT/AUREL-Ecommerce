import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Heart, Search, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { brands, categories, products, slugify } from '../data/products.js'
import { useShop } from '../hooks/useShop.js'
import MobileMenu from './MobileMenu.jsx'

const navigationItems = [
  { label: 'NEW ARRIVALS', to: '/shop?collection=new' },
  ...categories
    .filter((category) => !category.isSubcategory)
    .map((category) => ({
      label: category.name === 'Home & Living' ? 'HOME & LIVING' : category.name.toUpperCase(),
      to: `/category/${category.slug}`,
      subcategories: [
        ...new Set(
          products
            .filter((product) => product.categorySlug === category.slug)
            .map((product) => product.subcategory),
        ),
      ].sort(),
    })),
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [openMenu, setOpenMenu] = useState('')
  const navigate = useNavigate()
  const { bagCount, wishlistCount } = useShop()
  const query = searchTerm.trim().toLowerCase()
  const suggestions = (query
    ? products.filter((product) =>
        `${product.name} ${product.brand} ${product.category} ${product.subcategory}`
          .toLowerCase()
          .includes(query),
      )
    : products.filter((product) => product.isTrending)
  ).slice(0, 5)
  const matchingBrands = query
    ? brands.filter((brand) => brand.toLowerCase().includes(query)).slice(0, 3)
    : []

  function submitSearch(event) {
    event.preventDefault()
    const search = searchTerm.trim()
    navigate(search ? `/shop?search=${encodeURIComponent(search)}` : '/shop')
    setSearchOpen(false)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-ivory/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between gap-3 px-4 sm:px-8 lg:h-20 lg:px-10 2xl:px-14">
        <Link
          to="/"
          className="flex shrink-0 items-baseline gap-2"
          aria-label="AUREL home"
          onClick={() => setOpenMenu('')}
        >
          <span className="font-serif text-2xl font-medium tracking-[0.12em] text-charcoal sm:text-[1.65rem]">
            AUREL
          </span>
          <span className="hidden text-[0.52rem] uppercase tracking-[0.15em] text-muted 2xl:inline">
            The Art of Everyday Living.
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 xl:flex 2xl:gap-[1.1rem]"
        >
          {navigationItems.map((item) =>
            item.subcategories ? (
              <div
                key={item.label}
                className="h-full"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu('')}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openMenu === item.label}
                  onClick={() =>
                    setOpenMenu((current) =>
                      current === item.label ? '' : item.label,
                    )
                  }
                  onFocus={() => setOpenMenu(item.label)}
                  className="inline-flex items-center gap-1 whitespace-nowrap py-7 text-[0.59rem] font-semibold tracking-[0.1em] text-charcoal/85 transition-colors hover:text-olive 2xl:text-[0.65rem]"
                >
                  {item.label}
                  <ChevronDown size={12} aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {openMenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 7 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 7 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full z-50 w-[min(34rem,90vw)] -translate-x-1/2 border border-charcoal/10 bg-ivory p-6 shadow-xl"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-olive">
                            Discover {item.label.toLowerCase()}
                          </p>
                          <Link
                            to={item.to}
                            onClick={() => setOpenMenu('')}
                            className="mt-3 inline-flex text-sm font-medium text-charcoal hover:text-olive"
                          >
                            Shop all {item.label.toLowerCase()} →
                          </Link>
                        </div>
                        <div className="grid min-w-48 grid-cols-2 gap-x-6 gap-y-3">
                          {item.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory}
                              to={`${item.to}?subcategory=${encodeURIComponent(slugify(subcategory))}`}
                              onClick={() => setOpenMenu('')}
                              className="text-xs text-muted transition-colors hover:text-olive"
                            >
                              {subcategory}
                            </Link>
                          ))}
                          <Link
                            to="/category/footwear"
                            onClick={() => setOpenMenu('')}
                            className="text-xs text-muted transition-colors hover:text-olive"
                          >
                            Footwear
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className="whitespace-nowrap text-[0.59rem] font-semibold tracking-[0.1em] text-charcoal/85 transition-colors hover:text-olive 2xl:text-[0.65rem]"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            onClick={() => {
              setSearchOpen((open) => !open)
              setMenuOpen(false)
              setOpenMenu('')
            }}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            aria-expanded={searchOpen}
            className="grid size-9 place-items-center text-charcoal transition-colors hover:text-olive sm:size-10"
          >
            {searchOpen ? <X size={19} strokeWidth={1.5} /> : <Search size={19} strokeWidth={1.5} />}
          </button>
          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${wishlistCount} saved items`}
            className="relative grid size-9 place-items-center text-charcoal transition-colors hover:text-olive sm:size-10"
          >
            <Heart size={19} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-olive text-[0.55rem] text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/bag"
            aria-label={`Shopping bag, ${bagCount} items`}
            title={`Shopping bag · ${bagCount} items`}
            className="relative grid size-9 place-items-center text-charcoal transition-colors hover:text-olive sm:size-10"
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-olive text-[0.55rem] text-white">
              {bagCount}
            </span>
          </Link>
          <button
            type="button"
            onClick={() => {
              setMenuOpen((open) => !open)
              setSearchOpen(false)
              setOpenMenu('')
            }}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="grid size-9 place-items-center text-charcoal xl:hidden sm:size-10"
          >
            {menuOpen ? (
              <X size={20} strokeWidth={1.5} />
            ) : (
              <span className="text-[0.62rem] uppercase tracking-[0.12em]">
                Menu
              </span>
            )}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {searchOpen && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full z-50 border-t border-charcoal/10 bg-ivory shadow-lg shadow-charcoal/5"
            >
              <form
                role="search"
                onSubmit={submitSearch}
                className="flex items-center gap-3 px-5 py-4 sm:px-8 lg:px-10 2xl:px-14"
              >
                <Search size={18} className="shrink-0 text-muted" aria-hidden="true" />
                <label className="sr-only" htmlFor="site-search">
                  Search products and brands
                </label>
                <input
                  autoFocus
                  id="site-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') setSearchOpen(false)
                  }}
                  placeholder="Search products and brands"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-charcoal outline-none placeholder:text-muted"
                />
                <button
                  type="submit"
                  className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-olive transition-colors hover:text-bronze"
                >
                  View results
                </button>
              </form>
              {(suggestions.length > 0 || matchingBrands.length > 0) && (
                <div className="border-t border-charcoal/10 px-5 py-4 sm:px-8 lg:px-10 2xl:px-14">
                  <p className="text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-muted">
                    {query ? 'Suggestions' : 'Popular right now'}
                  </p>
                  <ul className="mt-2 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
                    {suggestions.map((product) => (
                      <li key={product.id}>
                        <Link
                          to={`/product/${product.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex justify-between gap-3 py-2 text-xs text-charcoal hover:text-olive"
                        >
                          <span>{product.brand} · {product.name}</span>
                          <span className="shrink-0 text-muted">
                            {product.category}
                          </span>
                        </Link>
                      </li>
                    ))}
                    {matchingBrands.map((brand) => (
                      <li key={brand}>
                        <Link
                          to={`/shop?brand=${encodeURIComponent(brand)}`}
                          onClick={() => setSearchOpen(false)}
                          className="py-2 text-xs text-olive hover:text-bronze"
                        >
                          Shop {brand}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MobileMenu
        isOpen={menuOpen}
        items={navigationItems}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  )
}

export default Navbar
