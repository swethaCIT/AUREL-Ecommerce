import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useState } from 'react'

function ProductCard({ product }) {
  const [saved, setSaved] = useState(false)

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="group min-w-0"
    >
      <div className="relative aspect-[0.8] overflow-hidden bg-paper">
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.045] group-hover:opacity-0"
        />
        <img
          src={product.secondaryImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 size-full scale-[1.02] object-cover opacity-0 transition duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
        />
        <span className="absolute left-3 top-3 bg-ivory/90 px-2.5 py-1.5 text-[0.54rem] font-medium uppercase tracking-[0.12em] text-charcoal sm:left-4 sm:top-4">
          {product.label}
        </span>
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => setSaved((isSaved) => !isSaved)}
          aria-label={`${saved ? 'Remove' : 'Add'} ${product.name} ${saved ? 'from' : 'to'} wishlist`}
          aria-pressed={saved}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-ivory/90 text-charcoal transition-colors hover:text-bronze sm:right-4 sm:top-4"
        >
          <Heart
            size={17}
            strokeWidth={1.5}
            className={saved ? 'fill-bronze text-bronze' : ''}
          />
        </motion.button>
      </div>
      <div className="flex items-start justify-between gap-3 pt-3.5">
        <div className="min-w-0">
          <p className="text-[0.58rem] uppercase tracking-[0.15em] text-muted">
            {product.category}
          </p>
          <h3 className="mt-1.5 truncate font-serif text-base text-charcoal sm:text-lg">
            {product.name}
          </h3>
        </div>
        <p className="shrink-0 pt-4 text-xs text-charcoal">{product.price}</p>
      </div>
    </motion.article>
  )
}

export default ProductCard
