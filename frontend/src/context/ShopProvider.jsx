import { useCallback, useEffect, useMemo, useState } from 'react'
import { products } from '../data/products.js'
import { ShopContext } from './ShopContext.js'

const storageKey = 'aurel-marketplace-state-v1'
const productById = new Map(products.map((product) => [product.id, product]))
const emptyShoppingState = {
  wishlistIds: [],
  bagItems: [],
  recentlyViewedIds: [],
}

function restoreShoppingState() {
  try {
    const savedState = window.localStorage.getItem(storageKey)
    if (!savedState) return { state: emptyShoppingState, notice: null }

    const parsedState = JSON.parse(savedState)
    if (
      !parsedState ||
      !Array.isArray(parsedState.wishlistIds) ||
      !Array.isArray(parsedState.bagItems) ||
      !Array.isArray(parsedState.recentlyViewedIds)
    ) {
      throw new Error('Saved shopping state has an invalid structure')
    }

    const wishlistIds = [...new Set(parsedState.wishlistIds)].filter((id) =>
      productById.has(id),
    )
    const recentlyViewedIds = [...new Set(parsedState.recentlyViewedIds)]
      .filter((id) => productById.has(id))
      .slice(0, 12)
    const bagItems = parsedState.bagItems.flatMap((item) => {
      const product = productById.get(item?.productId)
      const quantity = Number(item?.quantity)
      const sizeIsValid =
        !product?.sizeOptions.length ||
        product.sizeOptions.includes(item?.size)
      const variant = item?.variant ?? product?.variantOptions[0] ?? null
      const variantIsValid =
        !product?.variantOptions.length ||
        product.variantOptions.includes(variant)

      if (
        !product?.available ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        !sizeIsValid ||
        !variantIsValid
      ) {
        return []
      }

      return [
        {
          productId: product.id,
          size: item.size ?? null,
          variant,
          quantity,
          unitPrice: product.sellingPrice,
        },
      ]
    })

    return {
      state: { wishlistIds, bagItems, recentlyViewedIds },
      notice: null,
    }
  } catch (error) {
    console.error('Unable to restore AUREL shopping state from localStorage.', error)
    return {
      state: emptyShoppingState,
      notice:
        'Saved shopping data could not be restored. Your current browsing session starts fresh.',
    }
  }
}

export function ShopProvider({ children }) {
  const [restoredState] = useState(restoreShoppingState)
  const [shoppingState, setShoppingState] = useState(restoredState.state)
  const [persistenceNotice, setPersistenceNotice] = useState(
    restoredState.notice,
  )
  const [drawerProductId, setDrawerProductId] = useState(null)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const { wishlistIds, bagItems, recentlyViewedIds } = shoppingState

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(shoppingState))
    } catch (error) {
      console.error('Unable to save AUREL shopping state to localStorage.', error)
      window.dispatchEvent(
        new CustomEvent('aurel:persistence-error', {
          detail:
            'This browser could not save your bag or wishlist. Changes may not remain after you leave.',
        }),
      )
    }
  }, [shoppingState])

  const toggleWishlist = useCallback((productId) => {
    if (!productById.has(productId)) {
      throw new Error(`Cannot save unknown product "${productId}" to the wishlist`)
    }

    setShoppingState((current) => ({
      ...current,
      wishlistIds: current.wishlistIds.includes(productId)
        ? current.wishlistIds.filter((id) => id !== productId)
        : [...current.wishlistIds, productId],
    }))
  }, [])

  const addToBag = useCallback((productId, size = null, quantity = 1, variant = null) => {
    const product = productById.get(productId)
    if (!product) {
      throw new Error(`Cannot add unknown product "${productId}" to the bag`)
    }
    if (!product.available) {
      throw new Error(`Product "${productId}" is not available`)
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error('Bag quantity must be a positive whole number')
    }
    if (product.sizeOptions.length && !product.sizeOptions.includes(size)) {
      throw new Error(`Choose a valid size for "${productId}" before adding it`)
    }

    const selectedVariant = variant ?? product.variantOptions[0] ?? null
    if (
      product.variantOptions.length &&
      !product.variantOptions.includes(selectedVariant)
    ) {
      throw new Error(`Choose a valid variant for "${productId}" before adding it`)
    }

    setShoppingState((current) => {
      const existingItem = current.bagItems.find(
        (item) =>
          item.productId === productId &&
          item.size === size &&
          item.variant === selectedVariant,
      )

      return {
        ...current,
        bagItems: existingItem
          ? current.bagItems.map((item) =>
              item === existingItem
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            )
          : [
              ...current.bagItems,
              {
                productId,
                size,
                variant: selectedVariant,
                quantity,
                unitPrice: product.sellingPrice,
              },
            ],
      }
    })
    setDrawerProductId(productId)
    setCartDrawerOpen(true)
  }, [])

  const updateBagQuantity = useCallback(
    (productId, size, variant, quantity) => {
      setShoppingState((current) => ({
        ...current,
        bagItems:
          quantity < 1
            ? current.bagItems.filter(
                (item) =>
                  !(
                    item.productId === productId &&
                    item.size === size &&
                    item.variant === variant
                  ),
              )
            : current.bagItems.map((item) =>
                item.productId === productId &&
                item.size === size &&
                item.variant === variant
                  ? { ...item, quantity }
                  : item,
              ),
      }))
    },
    [],
  )

  const removeFromBag = useCallback((productId, size, variant) => {
    setShoppingState((current) => ({
      ...current,
      bagItems: current.bagItems.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.size === size &&
            item.variant === variant
          ),
      ),
    }))
  }, [])

  const recordRecentlyViewed = useCallback((productId) => {
    if (!productById.has(productId)) {
      throw new Error(`Cannot record unknown product "${productId}" as viewed`)
    }

    setShoppingState((current) => ({
      ...current,
      recentlyViewedIds: [
        productId,
        ...current.recentlyViewedIds.filter((id) => id !== productId),
      ].slice(0, 12),
    }))
  }, [])

  const closeCartDrawer = useCallback(() => setCartDrawerOpen(false), [])
  const dismissPersistenceNotice = useCallback(
    () => setPersistenceNotice(null),
    [],
  )

  const value = useMemo(
    () => ({
      wishlistIds,
      wishlistCount: wishlistIds.length,
      bagItems,
      bagCount: bagItems.reduce((total, item) => total + item.quantity, 0),
      bagSubtotal: bagItems.reduce(
        (total, item) => total + item.quantity * item.unitPrice,
        0,
      ),
      recentlyViewedIds,
      drawerProductId,
      cartDrawerOpen,
      persistenceNotice,
      toggleWishlist,
      addToBag,
      updateBagQuantity,
      removeFromBag,
      recordRecentlyViewed,
      closeCartDrawer,
      dismissPersistenceNotice,
    }),
    [
      wishlistIds,
      bagItems,
      recentlyViewedIds,
      drawerProductId,
      cartDrawerOpen,
      persistenceNotice,
      toggleWishlist,
      addToBag,
      updateBagQuantity,
      removeFromBag,
      recordRecentlyViewed,
      closeCartDrawer,
      dismissPersistenceNotice,
    ],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
