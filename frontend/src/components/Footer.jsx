import { Camera, MoveUpRight } from 'lucide-react'

const currentYear = new Date().getFullYear()

const footerLinks = [
  { label: 'Fashion', href: '#categories' },
  { label: 'Our edit', href: '#trending' },
  { label: 'Journal', href: '#journal' },
  { label: 'Newsletter', href: '#newsletter' },
]

function Footer() {
  return (
    <footer className="bg-charcoal px-5 pb-7 pt-12 text-ivory sm:px-8 sm:pt-14 lg:px-14">
      <div className="mx-auto max-w-[90rem]">
        <div className="grid gap-10 border-b border-white/15 pb-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.7fr] lg:pb-12">
          <div className="max-w-md">
            <a
              href="#top"
              className="font-serif text-3xl tracking-[0.12em]"
              aria-label="AUREL home"
            >
              AUREL
            </a>
            <p className="mt-3 max-w-xs text-sm leading-6 text-ivory/65">
              The Art of Everyday Living. A considered collection for the life
              you make your own.
            </p>
          </div>
          <div>
            <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ivory/50">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-ivory/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ivory/50">
              Stay connected
            </h2>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-ivory/80 transition-colors hover:text-white"
            >
              <Camera size={16} strokeWidth={1.5} aria-hidden="true" />
              Instagram
              <MoveUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-5 text-[0.62rem] tracking-wide text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} AUREL. Made for everyday living.</p>
          <p>Thoughtful by nature.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
