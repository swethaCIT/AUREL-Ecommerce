import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear()

const footerLinks = [
  { label: 'New arrivals', to: '/shop?collection=new' },
  { label: 'Men', to: '/category/men' },
  { label: 'Women', to: '/category/women' },
  { label: 'Kids', to: '/category/kids' },
  { label: 'Beauty', to: '/category/beauty' },
  { label: 'Accessories', to: '/category/accessories' },
  { label: 'Footwear', to: '/category/footwear' },
  { label: 'Home & Living', to: '/category/home-living' },
  { label: 'Shop all', to: '/shop' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Shopping bag', to: '/bag' },
]

function Footer() {
  return (
    <footer className="bg-charcoal px-5 pb-7 pt-12 text-ivory sm:px-8 sm:pt-14 lg:px-14">
      <div className="mx-auto max-w-[90rem]">
        <div className="grid gap-10 border-b border-white/15 pb-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_0.8fr] lg:pb-12">
          <div className="max-w-md">
            <Link
              to="/"
              className="font-serif text-3xl tracking-[0.12em]"
              aria-label="AUREL home"
            >
              AUREL
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-ivory/65">
              The Art of Everyday Living. Considered pieces for the life you
              make your own.
            </p>
          </div>
          <nav aria-label="Footer shopping links">
            <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ivory/50">
              Explore
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-ivory/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ivory/50">
              AUREL
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ivory/65">
              A considered edit of pieces to wear, use and keep close.
            </p>
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
