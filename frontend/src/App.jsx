import { lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ShopProvider } from './context/ShopProvider.jsx'
import RootLayout from './layouts/RootLayout.jsx'

const BagPage = lazy(() => import('./pages/BagPage.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage.jsx'))
const ProductListingPage = lazy(() => import('./pages/ProductListingPage.jsx'))
const WishlistPage = lazy(() => import('./pages/WishlistPage.jsx'))

function PageLoading() {
  return (
    <main
      id="main-content"
      role="status"
      className="mx-auto min-h-[45vh] max-w-[90rem] px-5 py-20 text-sm text-muted sm:px-8 lg:px-14"
    >
      Loading the AUREL collection…
    </main>
  )
}

function App() {
  return (
    <ShopProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route
                index
                element={
                  <Suspense fallback={<PageLoading />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="shop"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <ProductListingPage />
                  </Suspense>
                }
              />
              <Route
                path="category/:categorySlug"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <ProductListingPage />
                  </Suspense>
                }
              />
              <Route
                path="product/:productId"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <ProductDetailPage />
                  </Suspense>
                }
              />
              <Route
                path="wishlist"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <WishlistPage />
                  </Suspense>
                }
              />
              <Route
                path="bag"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <BagPage />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <NotFoundPage />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </ShopProvider>
  )
}

export default App
