import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../data/products.js'
import ImageWithFallback from './ImageWithFallback.jsx'
import SectionHeading from './SectionHeading.jsx'

const primaryCategories = categories.filter((category) =>
  ['men', 'women', 'kids'].includes(category.slug),
)

function CategorySection() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="shop-by-category"
      className="bg-paper px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-24"
    >
      <div className="mx-auto max-w-[90rem]">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reducedMotion ? 0 : 0.55 }}
        >
          <SectionHeading
            eyebrow="Shop by category"
            title="A good place to begin."
            description="Find thoughtful everyday pieces for you and the people you love."
          />
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-10 lg:gap-6">
          {primaryCategories.map((category, index) => (
            <motion.article
              key={category.slug}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: reducedMotion ? 0 : 0.5,
                delay: reducedMotion ? 0 : index * 0.07,
              }}
              className="group relative"
            >
              <Link
                to={`/category/${category.slug}`}
                aria-label={`Shop ${category.name}`}
                className="block"
              >
                <div className="relative aspect-[0.86] overflow-hidden bg-ivory sm:aspect-[0.74]">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.alt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-4 text-white sm:p-5 lg:p-6">
                    <div>
                      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/75">
                        0{index + 1} · AUREL collection
                      </p>
                      <h3 className="mt-2 font-serif text-3xl sm:text-4xl">
                        {category.name}
                      </h3>
                      <p className="mt-1 text-xs text-white/80">
                        {category.detail}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 border border-white/70 px-3 py-2 text-[0.55rem] font-semibold uppercase tracking-[0.12em]">
                      Shop now
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
