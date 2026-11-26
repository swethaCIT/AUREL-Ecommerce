import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, Leaf, PackageCheck } from 'lucide-react'

const benefits = [
  {
    icon: BadgeCheck,
    title: 'Thoughtful selection',
    description: 'A considered edit, chosen to work beautifully together.',
  },
  {
    icon: PackageCheck,
    title: 'Clear product details',
    description: 'Fit, materials and care notes to help you choose well.',
  },
  {
    icon: Leaf,
    title: 'Made for everyday',
    description: 'Useful, well-made pieces with a place in your daily rituals.',
  },
]

function TrustSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="px-5 py-14 sm:px-8 sm:py-16 lg:px-14">
      <div className="mx-auto grid max-w-[90rem] divide-y divide-charcoal/10 border-y border-charcoal/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {benefits.map(({ icon: Icon, title, description }, index) => (
          <motion.article
            key={title}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: reducedMotion ? 0 : 0.5,
              delay: reducedMotion ? 0 : index * 0.06,
            }}
            className="flex items-start gap-4 py-5 sm:px-5 sm:py-7 lg:px-8"
          >
            <Icon
              size={20}
              strokeWidth={1.4}
              className="mt-0.5 shrink-0 text-olive"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-serif text-lg text-charcoal">{title}</h2>
              <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default TrustSection
