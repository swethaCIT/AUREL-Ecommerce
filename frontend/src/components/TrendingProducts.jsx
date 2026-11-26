import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { products } from '../data/products.js'
import ProductCard from './ProductCard.jsx'
import SectionHeading from './SectionHeading.jsx'

function TrendingProducts({ searchTerm }) {
  const reducedMotion = useReducedMotion()
  const normalizedSearch = searchTerm.trim().toLowerCase()
  const visibleProducts = normalizedSearch
    ? products.filter((product) =>
        `${product.name} ${product.category} ${product.label}`
          .toLowerCase()
          .includes(normalizedSearch),
      )
    : products

  return (
    <section
      id="trending"
      className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28"
    >
      <div className="mx-auto max-w-[90rem]">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="The AUREL edit"
            title={normalizedSearch ? 'Your considered selection.' : 'Loved, and for good reason.'}
            description={
              normalizedSearch
                ? `A few thoughtful finds for “${searchTerm.trim()}”.`
                : 'Well-made favourites, selected to become part of your everyday.'
            }
          />
          <a
            href="#categories"
            className="group inline-flex w-fit items-center gap-2 pb-1 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-olive"
          >
            Explore all
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        {visibleProducts.length > 0 ? (
          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reducedMotion ? 0 : 0.1,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="mt-9 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:mt-12 lg:grid-cols-4 lg:gap-6"
          >
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <p
            role="status"
            className="mt-10 border-y border-charcoal/10 py-10 text-sm text-muted"
          >
            No pieces found. Try another search.
          </p>
        )}
      </div>
    </section>
  )
}

export default TrendingProducts
