import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function AnnouncementBar() {
  return (
    <div className="bg-charcoal px-4 py-2 text-center text-ivory">
      <Link
        to="/shop?collection=deals"
        className="inline-flex items-center justify-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.14em] sm:text-[0.65rem] sm:tracking-[0.2em]"
      >
        <span>Season sale</span>
        <span aria-hidden="true" className="text-bronze">|</span>
        <span>Up to 60% off</span>
        <span className="hidden sm:inline">· Demo offers</span>
        <span className="hidden items-center gap-1 text-ivory/70 sm:inline-flex">
          Shop now
          <ArrowRight size={12} aria-hidden="true" />
        </span>
      </Link>
    </div>
  )
}

export default AnnouncementBar
