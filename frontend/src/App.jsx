import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BagPage from './pages/BagPage.jsx'
import Home from './pages/Home.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import ProductListingPage from './pages/ProductListingPage.jsx'
import WishlistPage from './pages/WishlistPage.jsx'
import { ShopProvider } from './context/ShopProvider.jsx'
import RootLayout from './layouts/RootLayout.jsx'

function App() {
  return (
    <ShopProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<ProductListingPage />} />
              <Route
                path="category/:categorySlug"
                element={<ProductListingPage />}
              />
              <Route
                path="product/:productId"
                element={<ProductDetailPage />}
              />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="bag" element={<BagPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </ShopProvider>
  )
}

export default App
