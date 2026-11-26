import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function PromotionBanner() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="px-5 py-5 sm:px-8 lg:px-14">
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex min-h-[24rem] max-w-[90rem] items-center overflow-hidden bg-charcoal sm:min-h-[29rem]"
      >
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=85"
          alt="Quiet living room with natural textures and considered objects"
          loading="lazy"
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="relative z-10 max-w-2xl px-6 py-12 text-white sm:px-12 lg:px-16">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.23em] text-white/75">
            The AUREL selection
          </p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-[-0.035em] sm:text-5xl">
            A little more thought
            <br />
            in every detail.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/80">
            Discover pieces chosen to work together, and feel right at home in
            your everyday.
          </p>
          <Link
            to="/shop"
            className="group mt-7 inline-flex min-h-12 items-center gap-3 bg-ivory px-5 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-charcoal transition-colors hover:bg-white"
          >
            Explore Collection
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

export default PromotionBanner
