import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../data/products.js'
import ImageWithFallback from './ImageWithFallback.jsx'
import SectionHeading from './SectionHeading.jsx'

const MotionLink = motion.create(Link)
const categoryImageOverrides = {
  men: {
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1200&q=85',
    alt: 'Men’s fashion editorial in a softly lit urban setting',
  },
  women: {
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
    alt: 'Women’s contemporary fashion in warm natural light',
  },
  kids: {
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=85',
    alt: 'Children enjoying a bright outdoor day together',
    imagePosition: 'center 18%',
  },
}
const primaryCategories = categories.filter((category) =>
  ['men', 'women', 'kids'].includes(category.slug),
).map((category) => ({
  ...category,
  ...categoryImageOverrides[category.slug],
}))

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.045, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  tap: { scale: 1.015, transition: { duration: 0.2 } },
}
const overlayVariants = {
  rest: { opacity: 0.86 },
  hover: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  tap: { opacity: 1, transition: { duration: 0.2 } },
}
const copyVariants = {
  rest: { y: 0 },
  hover: { y: -5, transition: { duration: 0.35, ease: 'easeOut' } },
  tap: { y: -2, transition: { duration: 0.2 } },
}
const ctaVariants = {
  rest: { x: 0 },
  hover: { x: 3, transition: { duration: 0.3, ease: 'easeOut' } },
  tap: { x: 1, transition: { duration: 0.2 } },
}

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
              className="relative"
            >
              <MotionLink
                to={`/category/${category.slug}`}
                aria-label={`Shop ${category.name}`}
                variants={{ rest: { scale: 1 }, hover: { scale: 1 }, tap: { scale: 0.99 } }}
                initial="rest"
                whileHover={reducedMotion ? undefined : 'hover'}
                whileFocus={reducedMotion ? undefined : 'hover'}
                whileTap={reducedMotion ? undefined : 'tap'}
                className="group block rounded-sm focus-visible:outline"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
                  <motion.div
                    variants={imageVariants}
                    className="absolute inset-0"
                  >
                    <ImageWithFallback
                      src={category.image}
                      alt={category.alt}
                      loading="lazy"
                      style={{ objectPosition: category.imagePosition ?? 'center' }}
                      className="size-full object-cover object-center"
                    />
                  </motion.div>
                  <motion.div
                    variants={overlayVariants}
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-charcoal/5"
                  />
                  <motion.div
                    variants={copyVariants}
                    className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-4 text-white sm:p-5 lg:p-6"
                  >
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
                    <motion.span
                      variants={ctaVariants}
                      className="inline-flex shrink-0 items-center gap-2 border border-white/70 px-3 py-2 text-[0.55rem] font-semibold uppercase tracking-[0.12em] transition-colors group-hover:bg-white group-hover:text-charcoal group-focus-visible:bg-white group-focus-visible:text-charcoal"
                    >
                      Shop now
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </motion.span>
                  </motion.div>
                </div>
              </MotionLink>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
