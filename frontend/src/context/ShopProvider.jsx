import { useCallback, useMemo, useState } from 'react'
import { ShopContext } from './ShopContext.js'
import { products } from '../data/products.js'

export function ShopProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState([])
  const [bagItems, setBagItems] = useState([])
  const [recentlyViewedIds, setRecentlyViewedIds] = useState([])

  const toggleWishlist = useCallback((productId) => {
    setWishlistIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
    )
  }, [])

  const addToBag = useCallback((productId, size = null, quantity = 1) => {
    const product = products.find((item) => item.id === productId)

    if (!product) {
      throw new Error(`Cannot add unknown product "${productId}" to the bag`)
    }

    setBagItems((currentItems) => {
      const existing = currentItems.find(
        (item) => item.productId === productId && item.size === size,
      )

      return existing
        ? currentItems.map((item) =>
            item === existing
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...currentItems, { productId, size, quantity, unitPrice: product.price }]
    })
  }, [])

  const updateBagQuantity = useCallback((productId, size, quantity) => {
    setBagItems((currentItems) =>
      quantity < 1
        ? currentItems.filter(
            (item) => !(item.productId === productId && item.size === size),
          )
        : currentItems.map((item) =>
            item.productId === productId && item.size === size
              ? { ...item, quantity }
              : item,
          ),
    )
  }, [])

  const removeFromBag = useCallback((productId, size) => {
    setBagItems((currentItems) =>
      currentItems.filter(
        (item) => !(item.productId === productId && item.size === size),
      ),
    )
  }, [])

  const recordRecentlyViewed = useCallback((productId) => {
    setRecentlyViewedIds((currentIds) =>
      [productId, ...currentIds.filter((id) => id !== productId)].slice(0, 8),
    )
  }, [])

  const value = useMemo(
    () => ({
      wishlistIds,
      bagItems,
      bagCount: bagItems.reduce((total, item) => total + item.quantity, 0),
      bagSubtotal: bagItems.reduce(
        (total, item) => total + item.quantity * item.unitPrice,
        0,
      ),
      recentlyViewedIds,
      toggleWishlist,
      addToBag,
      updateBagQuantity,
      removeFromBag,
      recordRecentlyViewed,
    }),
    [
      wishlistIds,
      bagItems,
      recentlyViewedIds,
      toggleWishlist,
      addToBag,
      updateBagQuantity,
      removeFromBag,
      recordRecentlyViewed,
    ],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
