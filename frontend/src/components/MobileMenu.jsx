import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

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
          className="overflow-hidden border-t border-charcoal/10 bg-ivory md:hidden"
        >
          <div className="flex flex-col px-6 pb-5 pt-2">
            {items.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={onClose}
                initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.25,
                  delay: reducedMotion ? 0 : index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-b border-charcoal/10 py-4 font-serif text-2xl text-charcoal"
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
