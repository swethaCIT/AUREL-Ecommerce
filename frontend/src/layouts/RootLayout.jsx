import { useEffect, useState } from 'react'
import AnnouncementBar from '../components/AnnouncementBar.jsx'
import CartDrawer from '../components/CartDrawer.jsx'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import { useShop } from '../hooks/useShop.js'

function RootLayout() {
  const { dismissPersistenceNotice, persistenceNotice } = useShop()
  const [storageError, setStorageError] = useState(null)

  useEffect(() => {
    function handlePersistenceError(event) {
      setStorageError(event.detail)
    }

    window.addEventListener('aurel:persistence-error', handlePersistenceError)
    return () =>
      window.removeEventListener(
        'aurel:persistence-error',
        handlePersistenceError,
      )
  }, [])

  const visibleNotice = persistenceNotice || storageError

  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[60] bg-ivory p-3 text-charcoal focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Navbar />
      {visibleNotice && (
        <div
          role="alert"
          className="flex items-center justify-between gap-4 bg-bronze/10 px-5 py-3 text-xs text-charcoal sm:px-8 lg:px-14"
        >
          <p>{visibleNotice}</p>
          <button
            type="button"
            onClick={() => {
              dismissPersistenceNotice()
              setStorageError(null)
            }}
            className="shrink-0 font-semibold uppercase tracking-[0.12em] text-olive"
          >
            Dismiss
          </button>
        </div>
      )}
      <Outlet />
      <Footer />
      <CartDrawer />
    </>
  )
}

export default RootLayout
