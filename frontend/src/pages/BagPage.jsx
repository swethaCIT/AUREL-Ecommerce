import { Link } from 'react-router-dom'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import { useShop } from '../hooks/useShop.js'
import { products } from '../data/products.js'
import { formatCurrency } from '../utils/formatCurrency.js'

function BagPage() {
  const {
    bagItems,
    bagCount,
    bagSubtotal,
    updateBagQuantity,
    removeFromBag,
  } = useShop()
  const bagLines = bagItems.map((item) => {
    const product = products.find((entry) => entry.id === item.productId)

    if (!product) {
      throw new Error(`Bag item "${item.productId}" is missing from the catalog`)
    }

    return { ...item, product }
  })

  return (
    <main id="main-content" className="mx-auto min-h-[65vh] max-w-[90rem] px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
      <header className="border-b border-charcoal/10 pb-6">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-olive">
          AUREL
        </p>
        <h1 className="mt-2 font-serif text-4xl tracking-[-0.04em] text-charcoal sm:text-5xl">
          Your shopping bag
        </h1>
        <p className="mt-3 text-sm text-muted">
          {bagCount} {bagCount === 1 ? 'piece' : 'pieces'} selected
        </p>
      </header>

      {bagLines.length > 0 ? (
        <div className="grid gap-8 py-8 lg:grid-cols-[1fr_21rem] lg:gap-14">
          <div className="divide-y divide-charcoal/10">
            {bagLines.map((item) => (
              <article
                key={`${item.productId}-${item.size ?? 'one-size'}-${item.variant ?? ''}`}
                className="grid grid-cols-[5.5rem_1fr] gap-4 py-5 first:pt-0 sm:grid-cols-[7rem_1fr_auto] sm:gap-6"
              >
                <Link
                  to={`/product/${item.product.id}`}
                  aria-label={`View ${item.product.name}`}
                  className="aspect-[0.8] overflow-hidden bg-paper"
                >
                  <ImageWithFallback
                    src={item.product.image}
                    alt={item.product.imageAlt}
                    className="size-full object-cover"
                  />
                </Link>
                <div className="min-w-0">
                  <p className="text-[0.58rem] uppercase tracking-[0.15em] text-muted">
                    {item.product.brand} · {item.product.category}
                  </p>
                  <h2 className="mt-1 font-serif text-lg text-charcoal">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="hover:text-olive"
                    >
                      {item.product.name}
                    </Link>
                  </h2>
                  {item.size && (
                    <p className="mt-1 text-xs text-muted">
                      Size: {item.size}
                    </p>
                  )}
                  {item.variant && (
                    <p className="mt-1 text-xs text-muted">
                      {item.product.variantLabel}: {item.variant}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={`Decrease ${item.product.name} quantity`}
                      onClick={() =>
                        updateBagQuantity(
                          item.productId,
                          item.size,
                          item.variant,
                          item.quantity - 1,
                        )
                      }
                      className="grid size-8 place-items-center border border-charcoal/20 text-charcoal hover:border-olive"
                    >
                      −
                    </button>
                    <span
                      className="min-w-6 text-center text-xs"
                      aria-label={`Quantity ${item.quantity}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase ${item.product.name} quantity`}
                      onClick={() =>
                        updateBagQuantity(
                          item.productId,
                          item.size,
                          item.variant,
                          item.quantity + 1,
                        )
                      }
                      className="grid size-8 place-items-center border border-charcoal/20 text-charcoal hover:border-olive"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        removeFromBag(
                          item.productId,
                          item.size,
                          item.variant,
                        )
                      }
                      className="ml-2 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-muted hover:text-charcoal"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="col-start-2 text-sm text-charcoal sm:col-start-auto sm:pt-1">
                  {formatCurrency(item.product.sellingPrice * item.quantity)}
                </p>
              </article>
            ))}
          </div>

          <aside className="h-fit border border-charcoal/10 bg-paper p-5 sm:p-6">
            <h2 className="font-serif text-2xl text-charcoal">Order summary</h2>
            <div className="mt-5 flex justify-between border-b border-charcoal/10 pb-4 text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="text-charcoal">{formatCurrency(bagSubtotal)}</span>
            </div>
            <p className="mt-4 text-xs leading-5 text-muted">
              Delivery and taxes are not calculated in this demo.
            </p>
            <p className="mt-3 text-xs leading-5 text-muted">
              Checkout and payment are not available. Your bag is saved in this
              browser only.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center border border-charcoal px-4 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-charcoal transition-colors hover:bg-charcoal hover:text-white"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      ) : (
        <div className="py-14 text-center">
          <p className="font-serif text-2xl text-charcoal">
            Your bag is taking a little breather.
          </p>
          <p className="mt-2 text-sm text-muted">
            Find something considered for your everyday.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex min-h-11 items-center justify-center bg-olive px-6 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-white hover:bg-charcoal"
          >
            Shop all products
          </Link>
        </div>
      )}
    </main>
  )
}

export default BagPage
