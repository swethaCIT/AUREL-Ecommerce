import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { curatedLooks, products } from '../data/products.js'
import { formatCurrency } from '../utils/formatCurrency.js'
import ImageWithFallback from './ImageWithFallback.jsx'
import SectionHeading from './SectionHeading.jsx'

function AurelEdit() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="aurel-edit"
      className="bg-paper px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-24"
    >
      <div className="mx-auto max-w-[90rem]">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reducedMotion ? 0 : 0.55 }}
        >
          <SectionHeading
            eyebrow="The AUREL Edit"
            title="Good things, together."
            description="Curated combinations that make it easier to find pieces you will reach for."
          />
        </motion.div>

        <div className="mt-8 grid gap-5 md:grid-cols-3 lg:mt-10 lg:gap-6">
          {curatedLooks.map((look, index) => {
            const lookProducts = look.productIds.map((id) =>
              products.find((product) => product.id === id),
            )
            const coverProduct = lookProducts[0]

            return (
              <motion.article
                key={look.title}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.5,
                  delay: reducedMotion ? 0 : index * 0.07,
                }}
                className="bg-ivory"
              >
                <Link
                  to={`/product/${coverProduct.id}`}
                  aria-label={`View the ${look.title} edit`}
                  className="group relative block aspect-[1.05] overflow-hidden bg-charcoal"
                >
                  <ImageWithFallback
                    src={coverProduct.image}
                    alt={coverProduct.imageAlt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-ivory/95 px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.13em] text-charcoal">
                    Explore edit
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </Link>
                <div className="p-5 sm:p-6">
                  <h3 className="font-serif text-xl text-charcoal">
                    {look.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    {look.detail}
                  </p>
                  <ul className="mt-4 divide-y divide-charcoal/10">
                    {lookProducts.map((product) => (
                      <li key={product.id}>
                        <Link
                          to={`/product/${product.id}`}
                          className="flex items-center justify-between gap-3 py-3 text-xs text-charcoal transition-colors hover:text-olive"
                        >
                          <span className="min-w-0">
                            <span className="block text-[0.55rem] uppercase tracking-[0.1em] text-muted">
                              {product.brand}
                            </span>
                            <span className="mt-1 block truncate">
                              {product.name}
                            </span>
                          </span>
                          <span className="shrink-0 text-right">
                            <span className="block font-medium">
                              {formatCurrency(product.sellingPrice)}
                            </span>
                            <span className="mt-1 block text-[0.58rem] text-muted line-through">
                              {formatCurrency(product.originalPrice)}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AurelEdit
