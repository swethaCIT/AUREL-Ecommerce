# AUREL

**The Art of Everyday Living.**

AUREL is a premium lifestyle and fashion shopping single-page application. This repository contains an independently runnable React frontend and Flask API.

## Project status

- **Phase 01 — Project initialization:** Complete. React/Vite, Tailwind CSS v4, and the Flask application-factory foundation are configured.
- **Phase 02 — Premium homepage:** Complete. The responsive editorial homepage, reusable UI components, motion, and temporary product data are in place.
- **Marketplace frontend transformation:** Complete. The homepage, catalogue, product details, filters, wishlist, shopping bag, and recently viewed experience are implemented with temporary browser-side data.
- **Phase 03 — Backend product catalogue:** Complete. Flask models, migrations, and product, category, and brand endpoints are available.
- **Phase 04 — External API import:** Complete. The backend imports DummyJSON products into its catalogue.
- **Phase 05 — Catalogue filters:** Complete. The product API supports search, category, brand, price, sorting, and pagination.
- **Phase 06 — Catalogue frontend integration:** Complete for the product listing page. Listing data and filter options come from the Flask API.

The homepage and product-detail, wishlist, and bag experiences still use the frontend's 48-product demonstration catalog. Ratings, reviews, offers, and brands in those experiences are demo data. Wishlist, bag, and recently viewed state persist in browser `localStorage`; this is not server-side storage. Checkout, payment, authentication, and newsletter submission are not implemented.

## Technology

**Frontend**

- React and JavaScript with Vite
- Tailwind CSS v4
- React Router DOM
- Axios, Framer Motion, and Lucide React
- Oxlint (`npm run lint`)

**Backend**

- Python with Flask and Flask-CORS
- Flask-SQLAlchemy, Flask-Migrate, and Flask-JWT-Extended
- python-dotenv and requests

## Project structure

```text
frontend/
  src/
    assets/
    components/
      AnnouncementBar.jsx
      AurelEdit.jsx
      BrandSection.jsx
      CartDrawer.jsx
      CategorySection.jsx
      DepartmentSection.jsx
      Footer.jsx
      HeroSection.jsx
      ImageWithFallback.jsx
      MobileMenu.jsx
      Navbar.jsx
      OfferHighlights.jsx
      ProductCard.jsx
      ProductGridSection.jsx
      RecommendedSection.jsx
      TrustSection.jsx
    context/
      ShopContext.js
      ShopProvider.jsx
    data/
      products.js
    hooks/
      useShop.js
    layouts/
      RootLayout.jsx
    pages/
      BagPage.jsx
      Home.jsx
      NotFoundPage.jsx
      ProductDetailPage.jsx
      ProductListingPage.jsx
      WishlistPage.jsx
    utils/
      formatCurrency.js
backend/
  app/
    models/
      brand.py
      category.py
      product.py
    routes/
      brands.py
      categories.py
      health.py
      products.py
    services/
      catalogue_service.py
      dummyjson_service.py
      product_import_service.py
    config.py
    extensions.py
  migrations/
    versions/
  tests/
    test_catalogue_api.py
    test_dummyjson_import.py
  .env.example
  requirements.txt
  run.py
```

## Requirements

- Node.js and npm
- Python 3.10+

## Run the frontend

From the project root, in PowerShell:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). If Vite reports that another server is already running, use that server's URL or stop it before launching another instance.

The listing page uses the Flask API at `http://127.0.0.1:5000/api` by default. To override it, copy `frontend/.env.example` to `frontend/.env.local`, set `VITE_API_BASE_URL`, and restart Vite. For example:

```text
VITE_API_BASE_URL=http://127.0.0.1:5000/api
```

Start the backend and import products using `POST /api/products/import` before expecting catalogue results. The listing supports the API's category, brand, search, price-range, sorting, and pagination features. Rating, popularity, subcategory, size, and discount-threshold filters are not available from the current backend schema. Men/Women/Kids department links may not match the backend's more specific category slugs; choose an exact category from the listing filter. Product detail, wishlist, and bag interactions for live catalogue records are not included in this listing-only integration.

To check the frontend:

```powershell
npm run lint
npm run build
```

Tailwind CSS v4 is integrated through `@tailwindcss/vite` in `vite.config.js` and imported in `src/index.css`.

## Run the backend

In a second PowerShell terminal, from the project root:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
flask --app run.py db upgrade
python run.py
```

The API starts at `http://127.0.0.1:5000`. Verify the health endpoint with:

```powershell
Invoke-RestMethod http://127.0.0.1:5000/api/health
```

It returns JSON with `status: "ok"` and `service: "aurel-api"`. Flask-CORS allows the frontend origin configured by `FRONTEND_ORIGINS` in `backend/.env`.

The database URL is read from `DATABASE_URL`; the default is a local SQLite database. Do not put database credentials in source code. To create and apply a schema change, update the models, then run:

```powershell
flask --app run.py db migrate -m "Describe schema change"
flask --app run.py db upgrade
```

The external product source and request timeout are configurable with `DUMMYJSON_PRODUCTS_URL` and `DUMMYJSON_TIMEOUT` in `backend/.env`.

## Product catalogue API

All endpoints are under `/api` and return JSON with a `success` boolean. Successful resource responses include `data`; product lists also include `pagination`. Errors include an `error` object with a stable `code` and readable `message`.

| Method and path | Description |
| --- | --- |
| `GET /api/products` | Paginated product list. Optional `page` (default 1), `per_page` (default 12, maximum 100), `category`, `brand`, `search`, `min_price`, `max_price`, `sort_by`, and `order` query parameters. Category and brand accept a name or slug. Search checks product name, description, and brand. |
| `GET /api/products/<id>` | Product detail, or `404` if no product exists. |
| `GET /api/categories` | Categories ordered by name. |
| `GET /api/brands` | Brands ordered by name. |
| `POST /api/products/import` | Fetch all DummyJSON product pages and import new products. Existing external IDs are skipped; existing products are not updated. |

Example requests for Postman:

```text
GET http://127.0.0.1:5000/api/products?page=1&per_page=12&category=men&brand=northline&search=cotton&min_price=25&max_price=100&sort_by=price&order=asc
GET http://127.0.0.1:5000/api/products?sort_by=newest&page=2&per_page=12
GET http://127.0.0.1:5000/api/products/1
GET http://127.0.0.1:5000/api/categories
GET http://127.0.0.1:5000/api/brands
```

`sort_by` supports `price` and `newest`; `order=asc|desc` applies to price sorting, while newest is always descending. Rating filters/sorting and popularity sorting return a clear `400` response because the backend schema has no rating or popularity fields. Invalid query values, including negative prices or a minimum above the maximum, also return `400`.

To import products in Postman, send a `POST` request to `http://127.0.0.1:5000/api/products/import` with no body. A successful response reports fetched, imported, invalid, and previously imported product counts. Missing brand names are stored as `Unknown`; invalid product records are skipped. A timeout returns `504`, an upstream API error returns `502`, and a database import error returns `500`.

Products are not fetched automatically when the server starts; trigger imports explicitly with the endpoint above. Imported products include their DummyJSON `external_id`; it is nullable for other catalogue products and uniquely indexed to make repeated imports idempotent. Run backend checks from `backend/` with `python -m unittest discover -s tests`.

## Marketplace frontend

- The homepage combines a four-campaign carousel, Men/Women/Kids shopping links, offers, new arrivals, trending products, departments, brands, The AUREL Edit, recommendations, service benefits, and newsletter signup.
- The temporary catalog is centralized in `frontend/src/data/products.js`: 10 Men, 12 Women, 8 Kids, 6 Beauty, 6 Accessories, and 6 Home & Living products. Product discounts are calculated from original and selling prices. Homepage and shopping-state views continue using this demo data.
- The catalogue listing fetches live products, categories, and brands from Flask. It supports product/brand search, backend categories and brands, price filters, price/newest sorting, result counts, loading/error/empty states, retry, and server pagination.
- Product detail pages include image galleries, variants, quantity selection, related products, wishlist controls, and add-to-bag feedback.
- Shared shopping state is stored in browser `localStorage`. The cart drawer and bag page show selected variants, quantities, and subtotals. Recently viewed products and wishlist are shared across SPA routes.
- Routes include `/shop`, `/category/:categorySlug`, `/product/:productId`, `/wishlist`, and `/bag`. Internal navigation uses React Router.
- Campaign offers and product information outside the catalogue listing are demo data. There is no checkout, payment processing, or authentication.
- Failed product images use a local fallback. Motion respects the user's reduced-motion preference.
- Editorial photography is loaded from Unsplash and display fonts from Google Fonts.

Do not commit `backend/.env` or other secrets. The root `.gitignore` excludes environment files, virtual environments, installed packages, and build output.
