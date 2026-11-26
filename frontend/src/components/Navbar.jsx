import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Search, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import MobileMenu from './MobileMenu.jsx'

const navItems = [
  { label: 'Fashion', href: '#categories' },
  { label: 'Objects', href: '#categories' },
  { label: 'Our edit', href: '#trending' },
  { label: 'Journal', href: '#journal' },
]

function Navbar({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  function submitSearch(event) {
    event.preventDefault()
    document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth' })
    setSearchOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-ivory/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-14">
        <a
          href="#top"
          className="flex items-baseline gap-2"
          aria-label="AUREL home"
        >
          <span className="font-serif text-[1.65rem] font-medium tracking-[0.12em] text-charcoal">
            AUREL
          </span>
          <span className="hidden text-[0.55rem] uppercase tracking-[0.18em] text-muted sm:inline">
            The art of living
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs tracking-wide text-charcoal/80 transition-colors hover:text-olive"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            aria-expanded={searchOpen}
            className="grid size-10 place-items-center text-charcoal transition-colors hover:text-olive"
          >
            {searchOpen ? <X size={19} strokeWidth={1.5} /> : <Search size={19} strokeWidth={1.5} />}
          </button>
          <a
            href="#trending"
            aria-label="Browse pieces to add to your wishlist"
            className="hidden size-10 place-items-center text-charcoal transition-colors hover:text-olive sm:grid"
          >
            <Heart size={19} strokeWidth={1.5} />
          </a>
          <button
            type="button"
            aria-label="Shopping bag, 0 items"
            title="Shopping bag · 0 items"
            className="relative grid size-10 place-items-center text-charcoal transition-colors hover:text-olive"
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            <span className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-olive text-[0.55rem] text-white">
              0
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="grid size-10 place-items-center text-charcoal md:hidden"
          >
            {menuOpen ? <X size={20} strokeWidth={1.5} /> : <span className="text-xs uppercase tracking-[0.12em]">Menu</span>}
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
                  onSearch(event.target.value)
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
