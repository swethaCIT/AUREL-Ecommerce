import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { slugify } from '../data/products.js'

function MobileMenu({ isOpen, items, onClose }) {
  const reducedMotion = useReducedMotion()

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.nav
          key="mobile-navigation"
          id="mobile-navigation"
          aria-label="Mobile navigation"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden border-t border-charcoal/10 bg-ivory xl:hidden"
        >
          <div className="flex flex-col px-6 pb-5 pt-2">
            {items.map((item, index) => (
              <motion.div
                key={item.label}
                initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.25,
                  delay: reducedMotion ? 0 : index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-b border-charcoal/10"
              >
                <div className="flex items-center justify-between gap-4">
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className="block py-4 font-serif text-2xl text-charcoal"
                  >
                    {item.label}
                  </Link>
                  {item.subcategories?.length > 0 && (
                    <details className="group py-4">
                      <summary className="cursor-pointer list-none text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-olive">
                        Browse
                      </summary>
                      <div className="absolute left-0 right-0 z-10 grid grid-cols-2 gap-3 border-y border-charcoal/10 bg-ivory px-6 py-4 shadow-lg">
                        {item.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory}
                            to={`${item.to}?subcategory=${encodeURIComponent(slugify(subcategory))}`}
                            onClick={onClose}
                            className="py-1 text-xs text-charcoal"
                          >
                            {subcategory}
                          </Link>
                        ))}
                        <Link
                          to="/category/footwear"
                          onClick={onClose}
                          className="py-1 text-xs text-charcoal"
                        >
                          Footwear
                        </Link>
                      </div>
                    </details>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
