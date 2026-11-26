import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

function Newsletter() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="newsletter"
      className="bg-paper px-5 py-16 sm:px-8 sm:py-20 lg:px-14"
    >
      <div className="mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
        <div className="max-w-xl">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-olive">
            A note from AUREL
          </p>
          <h2 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-[-0.03em] text-charcoal sm:text-4xl">
            Good things, thoughtfully delivered.
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Occasional notes on new finds, considered living and the little
            things worth keeping.
          </p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className="flex border-b border-charcoal/40 focus-within:border-olive"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Your email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={submitted}
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent py-4 text-sm text-charcoal outline-none placeholder:text-muted disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={submitted}
              className="group inline-flex shrink-0 items-center gap-2 pl-4 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-olive transition-colors hover:text-bronze disabled:cursor-default"
            >
              {submitted ? 'Thank you' : 'Sign me up'}
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </form>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.p
                key="success"
                role="status"
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-3 text-xs leading-5 text-olive"
              >
                Thank you for your interest. Sign-up will be available soon.
              </motion.p>
            ) : (
              <p className="mt-3 text-[0.67rem] leading-5 text-muted">
                A quiet inbox is a good inbox. This preview does not store or
                send your email.
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
