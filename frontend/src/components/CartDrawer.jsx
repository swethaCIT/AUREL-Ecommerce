import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
import { useShop } from '../hooks/useShop.js'
import { formatCurrency } from '../utils/formatCurrency.js'
import ImageWithFallback from './ImageWithFallback.jsx'

function CartDrawer() {
  const reducedMotion = useReducedMotion()
  const closeButtonRef = useRef(null)
  const {
    bagItems,
    bagCount,
    bagSubtotal,
    cartDrawerOpen,
    closeCartDrawer,
    drawerProductId,
  } = useShop()
  const lastProduct = products.find((product) => product.id === drawerProductId)
  const lastBagLine = [...bagItems]
    .reverse()
    .find((item) => item.productId === drawerProductId)

  useEffect(() => {
    if (!cartDrawerOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') closeCartDrawer()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [cartDrawerOpen, closeCartDrawer])

  return (
    <AnimatePresence>
      {cartDrawerOpen && (
        <motion.div
          className="fixed inset-0 z-[70] bg-charcoal/35"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeCartDrawer()
          }}
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-heading"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-2xl"
            initial={{ x: reducedMotion ? 0 : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: reducedMotion ? 0 : '100%' }}
            transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-charcoal/10 px-5 py-5 sm:px-7">
              <div>
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-olive">
                  AUREL
                </p>
                <h2
                  id="cart-drawer-heading"
                  className="mt-1 font-serif text-2xl text-charcoal"
                >
                  Added to your bag
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeCartDrawer}
                aria-label="Close shopping bag panel"
                className="grid size-10 place-items-center text-charcoal hover:text-olive"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
              {lastProduct && lastBagLine && (
                <article className="flex gap-4">
                  <Link
                    to={`/product/${lastProduct.id}`}
                    onClick={closeCartDrawer}
                    className="aspect-[0.78] w-24 shrink-0 overflow-hidden bg-paper"
                  >
                    <ImageWithFallback
                      src={lastProduct.image}
                      alt={lastProduct.imageAlt}
                      className="size-full object-cover"
                    />
                  </Link>
                  <div className="min-w-0 pt-1">
                    <p className="text-[0.58rem] uppercase tracking-[0.15em] text-muted">
                      {lastProduct.brand}
                    </p>
                    <h3 className="mt-1 font-serif text-lg text-charcoal">
                      <Link
                        to={`/product/${lastProduct.id}`}
                        onClick={closeCartDrawer}
                        className="hover:text-olive"
                      >
                        {lastProduct.name}
                      </Link>
                    </h3>
                    {lastBagLine.size && (
                      <p className="mt-1 text-xs text-muted">
                        Size: {lastBagLine.size}
                      </p>
                    )}
                    {lastBagLine.variant && (
                      <p className="mt-1 text-xs text-muted">
                        {lastProduct.variantLabel}: {lastBagLine.variant}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-charcoal">
                      {formatCurrency(lastProduct.sellingPrice)}
                    </p>
                  </div>
                </article>
              )}
              <p role="status" className="mt-6 border-y border-charcoal/10 py-4 text-sm text-charcoal">
                Your bag has {bagCount} {bagCount === 1 ? 'piece' : 'pieces'}.
              </p>
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium text-charcoal">
                  {formatCurrency(bagSubtotal)}
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-muted">
                Delivery and taxes are not included in this demo.
              </p>
            </div>

            <footer className="grid gap-3 border-t border-charcoal/10 px-5 py-5 sm:px-7">
              <Link
                to="/bag"
                onClick={closeCartDrawer}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-olive px-5 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-charcoal"
              >
                View shopping bag
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={closeCartDrawer}
                className="min-h-11 border border-charcoal/20 px-5 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-charcoal hover:border-charcoal"
              >
                Continue shopping
              </button>
            </footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
