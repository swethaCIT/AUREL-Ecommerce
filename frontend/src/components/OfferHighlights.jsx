import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductGridSection from './ProductGridSection.jsx'
import ImageWithFallback from './ImageWithFallback.jsx'
import SectionHeading from './SectionHeading.jsx'
import { formatCurrency } from '../utils/formatCurrency.js'
import { products } from '../data/products.js'

const byDiscount = [...products].sort(
  (first, second) =>
    second.discountPercentage - first.discountPercentage ||
    second.popularity - first.popularity,
)
const topOffers = byDiscount.slice(0, 3)
const dailyDeals = byDiscount.slice(3, 7)
const bestDiscounts = byDiscount.slice(7, 11)

function OfferCard({ product, index }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : index * 0.06 }}
      className="group grid grid-cols-[5.5rem_1fr] gap-3 border border-charcoal/10 bg-ivory p-3 sm:grid-cols-[7rem_1fr] sm:gap-4 sm:p-4"
    >
      <Link
        to={`/product/${product.id}`}
        aria-label={`View ${product.name} offer`}
        className="aspect-[0.8] overflow-hidden bg-paper"
      >
        <ImageWithFallback
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex min-w-0 flex-col justify-center">
        <p className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-olive">
          Demo offer · {product.discountPercentage}% off
        </p>
        <h3 className="mt-1 truncate font-serif text-base text-charcoal sm:text-lg">
          <Link to={`/product/${product.id}`} className="hover:text-olive">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 truncate text-[0.62rem] text-muted">
          {product.brand} · {product.category}
        </p>
        <div className="mt-2 flex flex-wrap items-baseline gap-2 text-xs">
          <span className="font-semibold text-charcoal">
            {formatCurrency(product.sellingPrice)}
          </span>
          <span className="text-muted line-through">
            {formatCurrency(product.originalPrice)}
          </span>
        </div>
        <Link
          to={`/product/${product.id}`}
          className="mt-2 inline-flex items-center gap-1 text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-olive hover:text-bronze"
        >
          Shop this offer
          <ArrowUpRight size={12} aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  )
}

function OfferHighlights() {
  return (
    <div className="bg-ivory">
      <section
        id="top-offers"
        className="px-5 py-14 sm:px-8 sm:py-16 lg:px-14"
      >
        <div className="mx-auto max-w-[90rem]">
          <SectionHeading
            eyebrow="Demo offers"
            title="Top offers."
            description="Example offers only. Prices are illustrative and no bank or payment offers apply."
          />
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {topOffers.map((product, index) => (
              <OfferCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <ProductGridSection
        id="deals-of-the-day"
        eyebrow="Demo pricing · No countdown"
        title="Deals of the day."
        description="A few more pieces to discover, with discounts calculated from their demo MRP."
        items={dailyDeals}
        viewAllTo="/shop?collection=deals"
      />

      <section
        id="best-discounts"
        className="bg-charcoal px-5 py-14 text-ivory sm:px-8 sm:py-16 lg:px-14"
      >
        <div className="mx-auto max-w-[90rem]">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ivory/70">
                Best discounts · Demo offers
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.03em] text-ivory sm:text-4xl">
                More value, thoughtfully chosen.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-ivory/70">
                Savings are calculated from original and demo selling prices.
              </p>
            </div>
            <Link
              to="/shop?sort=discount"
              className="inline-flex w-fit items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ivory hover:text-white"
            >
              Shop all offers
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {bestDiscounts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group border border-white/15 bg-white/5 p-3 transition-colors hover:bg-white/10 sm:p-4"
              >
                <p className="font-serif text-2xl text-white sm:text-3xl">
                  {product.discountPercentage}% off
                </p>
                <p className="mt-2 truncate text-xs font-medium text-ivory">
                  {product.brand}
                </p>
                <p className="mt-1 truncate text-[0.62rem] text-ivory/65">
                  {product.name}
                </p>
                <p className="mt-3 text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-ivory/75 group-hover:text-white">
                  Explore offer
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default OfferHighlights
