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
      className="bg-paper px-5 py-12 sm:px-8 sm:py-14 lg:px-14"
    >
      <div className="mx-auto grid max-w-[90rem] gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-end">
        <div className="max-w-xl">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.23em] text-olive">
            The AUREL note
          </p>
          <h2 className="mt-3 font-serif text-2xl font-normal leading-tight tracking-[-0.03em] text-charcoal sm:text-3xl">
            Considered finds, occasionally.
          </h2>
          <p className="mt-2 text-xs leading-6 text-muted">
            New arrivals and a few things worth keeping close.
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
