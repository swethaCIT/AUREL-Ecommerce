import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function EditorialBanner() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="journal" className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-14 lg:pb-28">
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex min-h-[28rem] max-w-[90rem] items-end overflow-hidden bg-charcoal sm:min-h-[34rem] lg:min-h-[38rem]"
      >
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=85"
          alt="Sun-washed living space with natural textures and considered objects"
          loading="lazy"
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/15 to-transparent" />
        <div className="relative z-10 max-w-2xl px-6 pb-8 pt-24 text-white sm:px-10 sm:pb-12 lg:px-16 lg:pb-16">
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-white/75">
            The slower days journal
          </p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Make room for
            <br />
            what matters.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/80">
            A few reflections on thoughtful spaces, meaningful rituals and
            choosing less, beautifully.
          </p>
          <a
            href="#newsletter"
            className="group mt-7 inline-flex min-h-12 items-center gap-3 border border-white/60 px-5 text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-white transition-colors hover:bg-white hover:text-charcoal"
          >
            Read the journal
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default EditorialBanner
