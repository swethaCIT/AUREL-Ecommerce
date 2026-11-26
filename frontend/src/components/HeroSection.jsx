import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowRight } from 'lucide-react'
import { useRef } from 'react'

function HeroSection() {
  const heroRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imageOffset = useTransform(scrollYProgress, [0, 1], [0, 42])

  return (
    <section
      id="top"
      ref={heroRef}
      className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-[90rem] items-center gap-10 px-5 pb-12 pt-8 sm:px-8 lg:min-h-[min(48rem,calc(100svh-5rem))] lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:px-14 lg:py-12"
    >
      <div className="order-2 max-w-xl lg:order-1 lg:pl-8">
        <motion.div
          initial={reducedMotion ? false : 'hidden'}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reducedMotion ? 0 : 0.12,
                delayChildren: reducedMotion ? 0 : 0.18,
              },
            },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: reducedMotion ? 0 : 0.65 },
              },
            }}
            className="mb-6 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-olive"
          >
            Fashion · Objects · Everyday rituals
          </motion.p>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: reducedMotion ? 0 : 0.75 },
              },
            }}
            className="font-serif text-[clamp(3.35rem,8vw,6.6rem)] font-normal leading-[0.98] tracking-[-0.055em] text-charcoal"
          >
            The Art of
            <br />
            <span className="italic text-olive">Everyday Living.</span>
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: reducedMotion ? 0 : 0.65 },
              },
            }}
            className="mt-7 max-w-md text-sm leading-7 text-muted sm:text-base sm:leading-8"
          >
            A thoughtful collection of lasting pieces for the way you dress,
            gather and find beauty in the everyday.
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: reducedMotion ? 0 : 0.65 },
              },
            }}
            className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
          >
            <a
              href="#trending"
              className="group inline-flex min-h-12 items-center gap-3 bg-olive px-6 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-charcoal active:scale-[0.98]"
            >
              Explore the edit
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#journal"
              className="group inline-flex items-center gap-2 text-xs font-medium text-charcoal"
            >
              Our point of view
              <ArrowDownRight
                size={15}
                className="text-bronze transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={reducedMotion ? false : { clipPath: 'inset(0 0 0 100%)' }}
        animate={{ clipPath: 'inset(0 0 0 0)' }}
        transition={{
          duration: reducedMotion ? 0 : 1.2,
          delay: reducedMotion ? 0 : 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="order-1 relative min-h-[22rem] overflow-hidden bg-paper sm:min-h-[30rem] lg:order-2 lg:min-h-[38rem]"
      >
        <motion.img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1800&q=88"
          alt="Editorial street style in a powder-blue coat outside a historic city landmark"
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover object-[center_35%]"
          style={{ y: reducedMotion ? 0 : imageOffset }}
        />
        <div className="absolute inset-0 bg-charcoal/5" aria-hidden="true" />
        <div className="absolute bottom-5 left-5 flex items-center gap-3 text-white sm:bottom-7 sm:left-7">
          <span className="h-px w-8 bg-white/70" />
          <span className="text-[0.58rem] uppercase tracking-[0.22em]">
            The quiet confidence edit
          </span>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
