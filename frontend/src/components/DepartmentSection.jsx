import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { departments } from '../data/products.js'
import ImageWithFallback from './ImageWithFallback.jsx'
import SectionHeading from './SectionHeading.jsx'

function DepartmentSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="shop-by-department"
      className="bg-paper px-5 py-16 sm:px-8 sm:py-20 lg:px-14"
    >
      <div className="mx-auto max-w-[90rem]">
        <SectionHeading
          eyebrow="More to explore"
          title="Shop by department."
          description="Small rituals, finishing touches and pieces for home."
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5 lg:mt-10">
          {departments.map((department, index) => (
            <motion.article
              key={department.slug}
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reducedMotion ? 0 : 0.45,
                delay: reducedMotion ? 0 : index * 0.05,
              }}
            >
              <Link
                to={`/category/${department.slug}`}
                className="group block"
              >
                <div className="aspect-[0.95] overflow-hidden bg-ivory">
                  <ImageWithFallback
                    src={department.image}
                    alt={department.alt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 pt-3">
                  <div>
                    <h3 className="font-serif text-lg text-charcoal sm:text-xl">
                      {department.name}
                    </h3>
                    <p className="mt-1 text-[0.62rem] text-muted">
                      {department.detail}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-olive transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DepartmentSection
