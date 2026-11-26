import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../data/products.js'
import SectionHeading from './SectionHeading.jsx'

function CategorySection() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="categories"
      className="bg-paper px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28"
    >
      <div className="mx-auto max-w-[90rem]">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            eyebrow="Shop by category"
            title="Find your everyday favourite."
            description="Explore considered clothing, accessories, beauty and pieces for living."
          />
        </motion.div>

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
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:mt-14 lg:grid-cols-4 lg:gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reducedMotion ? 0 : 0.65 },
                },
              }}
              className="group"
            >
              <Link
                to={`/category/${category.slug}`}
                aria-label={`View all ${category.name}`}
                className="block"
              >
                <div className="relative aspect-[0.82] overflow-hidden bg-ivory">
                  <img
                    src={category.image}
                    alt={category.alt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 grid size-7 place-items-center rounded-full bg-ivory/90 text-[0.58rem] text-charcoal sm:left-4 sm:top-4">
                    0{index + 1}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2 pt-3 sm:pt-4">
                  <div>
                    <h3 className="font-serif text-lg text-charcoal sm:text-xl">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-[0.65rem] tracking-wide text-muted sm:text-xs">
                      {category.detail}
                    </p>
                    <span className="mt-3 inline-block text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-olive">
                      View all
                    </span>
                  </div>
                  <ArrowUpRight
                    size={17}
                    className="mt-1 shrink-0 text-bronze transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CategorySection
