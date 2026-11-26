import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard.jsx'
import SectionHeading from './SectionHeading.jsx'

function ProductGridSection({
  id,
  eyebrow,
  title,
  description,
  items,
  viewAllTo,
  emptyMessage,
  emptyLinkTo = '/shop',
}) {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id={id}
      className="px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-24"
    >
      <div className="mx-auto max-w-[90rem]">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          {viewAllTo && (
            <Link
              to={viewAllTo}
              className="group inline-flex w-fit items-center gap-2 pb-1 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-olive"
            >
              View All
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          )}
        </div>

        {items.length > 0 ? (
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
            className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:mt-10 lg:grid-cols-4 lg:gap-6"
          >
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <div className="mt-8 border-y border-charcoal/10 py-8">
            <p className="text-sm text-muted">{emptyMessage}</p>
            <Link
              to={emptyLinkTo}
              className="mt-4 inline-flex text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-olive hover:text-bronze"
            >
              Shop all products
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductGridSection
