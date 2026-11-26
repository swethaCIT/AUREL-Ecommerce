import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Search, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../hooks/useShop.js'
import MobileMenu from './MobileMenu.jsx'

const navItems = [
  { label: 'NEW IN', to: '/shop?collection=new' },
  { label: 'FASHION', to: '/category/fashion' },
  { label: 'ACCESSORIES', to: '/category/accessories' },
  { label: 'BEAUTY', to: '/category/beauty' },
  { label: 'LIVING', to: '/category/living' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const { bagCount, wishlistIds } = useShop()

  function submitSearch(event) {
    event.preventDefault()
    const query = searchTerm.trim()
    navigate(query ? `/shop?search=${encodeURIComponent(query)}` : '/shop')
    setSearchOpen(false)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-ivory/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between gap-3 px-4 sm:px-8 lg:h-20 lg:px-14">
        <Link
          to="/"
          className="flex items-baseline gap-2"
          aria-label="AUREL home"
        >
          <span className="font-serif text-2xl font-medium tracking-[0.12em] text-charcoal sm:text-[1.65rem]">
            AUREL
          </span>
          <span className="hidden text-[0.55rem] uppercase tracking-[0.18em] text-muted xl:inline">
            The Art of Everyday Living.
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex xl:gap-7"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="whitespace-nowrap text-[0.62rem] font-medium tracking-[0.12em] text-charcoal/80 transition-colors hover:text-olive xl:text-xs"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              setSearchOpen((open) => !open)
              setMenuOpen(false)
            }}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            aria-expanded={searchOpen}
            className="grid size-9 place-items-center text-charcoal transition-colors hover:text-olive sm:size-10"
          >
            {searchOpen ? <X size={19} strokeWidth={1.5} /> : <Search size={19} strokeWidth={1.5} />}
          </button>
          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${wishlistIds.length} saved items`}
            className="relative grid size-9 place-items-center text-charcoal transition-colors hover:text-olive sm:size-10"
          >
            <Heart size={19} strokeWidth={1.5} />
            {wishlistIds.length > 0 && (
              <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-olive text-[0.55rem] text-white">
                {wishlistIds.length}
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
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="grid size-9 place-items-center text-charcoal lg:hidden sm:size-10"
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
            <motion.form
              key="search"
              role="search"
              onSubmit={submitSearch}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full flex items-center gap-3 border-t border-charcoal/10 bg-ivory px-5 py-4 shadow-lg shadow-charcoal/5 sm:px-8 lg:px-14"
            >
              <Search size={18} className="shrink-0 text-muted" aria-hidden="true" />
              <label className="sr-only" htmlFor="site-search">
                Search the collection
              </label>
              <input
                autoFocus
                id="site-search"
                type="search"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setSearchOpen(false)
                }}
                placeholder="Search the collection"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-charcoal outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-olive transition-colors hover:text-bronze"
              >
                View results
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <MobileMenu
        isOpen={menuOpen}
        items={navItems}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  )
}

export default Navbar
