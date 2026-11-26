import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
import SectionHeading from './SectionHeading.jsx'

const featuredBrands = Object.values(
  products.reduce((summary, product) => {
    const current = summary[product.brand] ?? {
      name: product.brand,
      count: 0,
      popularity: 0,
    }
    summary[product.brand] = {
      ...current,
      count: current.count + 1,
      popularity: current.popularity + product.popularity,
    }
    return summary
  }, {}),
)
  .sort((first, second) => second.count - first.count || second.popularity - first.popularity)
  .slice(0, 8)

function BrandSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="popular-brands" className="px-5 py-16 sm:px-8 sm:py-20 lg:px-14">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeading
          eyebrow="AUREL selection · Demo brands"
          title="Trending brands."
          description="Explore the makers and labels behind this demo collection."
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:mt-10">
          {featuredBrands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reducedMotion ? 0 : 0.4,
                delay: reducedMotion ? 0 : index * 0.04,
              }}
            >
              <Link
                to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                className="group flex min-h-24 flex-col justify-between border border-charcoal/10 bg-paper p-4 transition-colors hover:border-olive sm:min-h-28 sm:p-5"
              >
                <span className="font-serif text-lg text-charcoal sm:text-xl">
                  {brand.name}
                </span>
                <span className="flex items-center justify-between gap-2 text-[0.56rem] uppercase tracking-[0.12em] text-muted group-hover:text-olive">
                  Discover {brand.count} {brand.count === 1 ? 'piece' : 'pieces'}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandSection
