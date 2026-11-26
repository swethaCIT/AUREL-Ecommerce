import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
import { formatCurrency } from '../utils/formatCurrency.js'
import SectionHeading from './SectionHeading.jsx'

const curatedLooks = [
  {
    title: 'Layers for the in-between',
    detail: 'A relaxed layer, a good carryall, and the finishing touch.',
    image:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Editorial outfit in a softly tailored blue layer',
    productIds: ['studio-blazer', 'forma-tote', 'sculpted-hoops'],
  },
  {
    title: 'A slower morning',
    detail: 'Soft layers and a simple ritual to ease into the day.',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
    alt: 'A calm arrangement of neutral wardrobe essentials',
    productIds: ['linen-weekend-shirt', 'still-life-serum', 'everyday-knit'],
  },
  {
    title: 'Good things at home',
    detail: 'A few quiet objects for the places you return to.',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85',
    alt: 'Warm, natural-toned living space with thoughtful details',
    productIds: ['objects-vessel', 'hand-poured-candle', 'woven-throw'],
  },
]

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
          transition={{ duration: reducedMotion ? 0 : 0.65 }}
        >
          <SectionHeading
            eyebrow="The AUREL Edit"
            title="Thoughtful things, together."
            description="A few considered combinations to make choosing what you love a little easier."
          />
        </motion.div>

        <div className="mt-9 grid gap-5 md:grid-cols-3 lg:mt-12 lg:gap-6">
          {curatedLooks.map((look, index) => {
            const lookProducts = look.productIds.map((id) =>
              products.find((product) => product.id === id),
            )

            return (
              <motion.article
                key={look.title}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.6,
                  delay: reducedMotion ? 0 : index * 0.08,
                }}
                className="bg-ivory"
              >
                <Link
                  to={`/product/${lookProducts[0].id}`}
                  aria-label={`View the ${look.title} edit`}
                  className="group relative block aspect-[1.08] overflow-hidden bg-charcoal"
                >
                  <img
                    src={look.image}
                    alt={look.alt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
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
                          <span>{product.name}</span>
                          <span className="shrink-0 text-muted">
                            {formatCurrency(product.price)}
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
