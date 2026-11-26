import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-5 text-center"
    >
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-olive">
        404 · Not found
      </p>
      <h1 className="mt-4 font-serif text-4xl text-charcoal">
        This page has wandered off.
      </h1>
      <Link
        to="/shop"
        className="mt-7 inline-flex min-h-11 items-center bg-olive px-6 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-white hover:bg-charcoal"
      >
        Shop all products
      </Link>
    </main>
  )
}

export default NotFoundPage
