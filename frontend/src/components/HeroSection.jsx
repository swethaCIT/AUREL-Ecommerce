import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ImageWithFallback from './ImageWithFallback.jsx'

const MotionLink = motion.create(Link)
const campaignSlides = [
  {
    label: 'THE GLOBAL EDIT',
    title: 'A world of good things, thoughtfully found.',
    description: 'Discover considered pieces from independent favourites and established names.',
    cta: 'SHOP FASHION',
    to: '/shop',
    offerAmount: '$20',
    offerDetails: 'Off orders of $100 or more',
    image:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Global fashion campaign portrait in a softly sunlit setting',
  },
  {
    label: 'THE EVERYDAY EDIT',
    title: 'Little things. Better everyday.',
    description: 'Explore beauty, lifestyle and everyday essentials worth discovering.',
    cta: 'EXPLORE THE EDIT',
    to: '/category/beauty',
    offerAmount: '$15',
    offerDetails: 'Off orders of $75 or more',
    image:
      'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Premium skincare essentials arranged in a calm, sunlit setting',
  },
  {
    label: 'THE STYLE EDIT',
    title: 'Find your next favourite.',
    description: 'Discover statement footwear and accessories to complete your look.',
    cta: 'SHOP NOW',
    to: '/shop',
    offerAmount: '$20',
    offerDetails: 'Off orders of $100 or more',
    image:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Elegant footwear styled with accessories in warm natural light',
  },
]

function HeroSection() {
  const heroRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDocumentVisible, setIsDocumentVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  )
  const activeSlide = campaignSlides[activeIndex]
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const imageOffset = useTransform(scrollYProgress, [0, 1], [0, 18])
  const copyVariants = reducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.12, delayChildren: 0.08 },
        },
        exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
      }
  const itemVariants = reducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }

  useEffect(() => {
    function updateVisibility() {
      setIsDocumentVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', updateVisibility)
    updateVisibility()

    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  useEffect(() => {
    if (!isDocumentVisible) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % campaignSlides.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [isDocumentVisible])

  return (
    <section
      id="top"
      ref={heroRef}
      role="region"
      aria-label="Featured AUREL campaigns"
      aria-roledescription="carousel"
      className="overflow-hidden bg-ivory"
    >
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 lg:min-h-[38rem] lg:grid-cols-[2fr_3fr]">
        <div className="grid items-center px-6 py-12 sm:px-10 sm:py-14 lg:px-10 lg:py-6 xl:px-14">
          <AnimatePresence initial={false}>
            <motion.div
              key={activeIndex}
              role="group"
              aria-roledescription="slide"
              aria-label={`${activeIndex + 1} of ${campaignSlides.length}: ${activeSlide.label}`}
              variants={copyVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="col-start-1 row-start-1 w-full"
            >
              <motion.p
                variants={itemVariants}
                className="text-[0.62rem] font-semibold uppercase tracking-[0.23em] text-olive"
              >
                {activeSlide.label}
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="mt-4 text-[0.58rem] font-medium uppercase tracking-[0.13em] text-muted"
              >
                Fashion · Beauty · Accessories · Home
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="mt-4 max-w-[34rem] font-serif text-[clamp(2.8rem,4.6vw,4.7rem)] font-normal leading-[0.98] tracking-[-0.045em] text-charcoal"
              >
                {activeSlide.title}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="mt-4 max-w-lg text-sm leading-6 text-muted sm:text-[0.94rem] sm:leading-7"
              >
                {activeSlide.description}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="mt-5 flex items-center gap-4 border border-olive/20 bg-paper px-4 py-3.5 sm:px-5"
              >
                <span className="grid size-11 shrink-0 place-items-center bg-olive font-serif text-lg text-ivory">
                  {activeSlide.offerAmount}
                </span>
                <div>
                  <p className="text-[0.56rem] font-semibold uppercase tracking-[0.17em] text-olive">
                    Demo offer
                  </p>
                  <p className="mt-1 text-xs font-medium tracking-wide text-charcoal">
                    {activeSlide.offerDetails}
                  </p>
                  <p className="mt-1 text-[0.6rem] text-muted">
                    Demo only · Not redeemable at checkout
                  </p>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="mt-6">
                <MotionLink
                  to={activeSlide.to}
                  whileHover={reducedMotion ? undefined : { y: -2 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="group inline-flex min-h-14 items-center gap-10 bg-charcoal px-7 text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-ivory transition-colors duration-300 hover:bg-olive"
                >
                  {activeSlide.cta}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </MotionLink>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative aspect-[4/3] min-h-[18rem] overflow-hidden sm:aspect-[16/10] sm:min-h-[26rem] lg:aspect-auto lg:min-h-[38rem]">
          <AnimatePresence initial={false}>
            <motion.div
              key={activeSlide.image}
              className="absolute inset-0"
              initial={reducedMotion ? false : { opacity: 0, scale: 1.035 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      opacity: { duration: 1.1, ease: 'easeInOut' },
                      scale: { duration: 1.25, ease: [0.22, 1, 0.36, 1] },
                    }
              }
            >
              <motion.div className="size-full" style={{ y: reducedMotion ? 0 : imageOffset }}>
                <ImageWithFallback
                  src={activeSlide.image}
                  alt={activeSlide.imageAlt}
                  fetchPriority="high"
                  className="size-full object-cover object-[center_30%]"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
          <p className="absolute right-5 top-5 bg-ivory/90 px-4 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.17em] text-charcoal backdrop-blur-sm sm:right-8 sm:top-8">
            Considered finds, from everywhere
          </p>
          <p className="absolute bottom-6 left-6 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-white sm:bottom-8 sm:left-8">
            Fashion · Beauty · Accessories · Home
          </p>
          <div
            aria-hidden="true"
            className="absolute bottom-5 right-5 z-10 flex items-center gap-1.5 border border-white/30 bg-charcoal/35 px-3 py-3.5 backdrop-blur-sm sm:bottom-7 sm:right-7"
          >
            {campaignSlides.map((slide, index) => (
              <span
                key={slide.label}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
