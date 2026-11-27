import apiClient from './apiClient.js'

function mapProduct(product) {
  const brand = product.brand?.name
  const category = product.category?.name
  const sellingPrice = Number(product.price)
  const originalPrice = Number(product.original_price)
  const discountPercentage = Number(product.discount)

  if (
    !product.id ||
    typeof product.name !== 'string' ||
    typeof brand !== 'string' ||
    typeof category !== 'string' ||
    typeof product.image_url !== 'string' ||
    !Number.isFinite(sellingPrice) ||
    !Number.isFinite(originalPrice) ||
    !Number.isFinite(discountPercentage)
  ) {
    throw new Error('The catalogue returned a product with invalid fields.')
  }

  return {
    id: product.id,
    externalId: product.external_id,
    name: product.name,
    description: product.description ?? '',
    brand,
    category,
    categorySlug: product.category.slug,
    subcategory: '',
    sellingPrice,
    originalPrice,
    discountPercentage: Math.round(discountPercentage),
    image: product.image_url,
    imageAlt: `${brand} ${product.name}, product photograph`,
    wishlistEnabled: false,
    detailsEnabled: false,
    isNew: false,
    available: product.stock_quantity > 0,
    availability: product.stock_quantity > 0 ? 'In stock' : 'Out of stock',
  }
}

export async function getProducts(params, { signal } = {}) {
  const response = await apiClient.get('/products', { params, signal })
  const payload = response.data

  if (
    payload?.success !== true ||
    !Array.isArray(payload.data) ||
    !payload.pagination
  ) {
    throw new Error('The catalogue returned an invalid product list response.')
  }

  return {
    products: payload.data.map(mapProduct),
    pagination: payload.pagination,
  }
}
