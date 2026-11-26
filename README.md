# AUREL

**The Art of Everyday Living.**

AUREL is a premium lifestyle and fashion shopping single-page application. This repository contains an independently runnable React frontend and Flask API.

## Project status

- **Phase 01 — Project initialization:** Complete. React/Vite, Tailwind CSS v4, and the Flask application-factory foundation are configured.
- **Phase 02 — Premium homepage:** Complete. The responsive editorial homepage, reusable UI components, motion, and temporary product data are in place.
- **Marketplace frontend transformation:** Complete. The homepage, catalogue, product details, filters, wishlist, shopping bag, and recently viewed experience are implemented with temporary browser-side data.
- **Backend integration:** Not started.

The 48-product catalog, ratings, reviews, offers, and brands are demonstration data. Wishlist, bag, and recently viewed state persist in browser `localStorage`; this is not server-side storage. Checkout, payment, authentication, and external API integration are not implemented. The newsletter validates input without storing or sending it.

## Technology

**Frontend**

- React and JavaScript with Vite
- Tailwind CSS v4
- React Router DOM
- Axios, Framer Motion, and Lucide React
- Oxlint (`npm run lint`)

**Backend**

- Python with Flask and Flask-CORS
- Flask-SQLAlchemy and Flask-JWT-Extended extensions are initialized; models and authentication are not implemented
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
    routes/
      health.py
    services/
    config.py
    extensions.py
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
python run.py
```

The API starts at `http://127.0.0.1:5000`. Verify the health endpoint with:

```powershell
Invoke-RestMethod http://127.0.0.1:5000/api/health
```

It returns JSON with `status: "ok"` and `service: "aurel-api"`. Flask-CORS allows the frontend origin configured by `FRONTEND_ORIGINS` in `backend/.env`.

## Marketplace frontend

- The homepage combines a four-campaign carousel, Men/Women/Kids shopping links, offers, new arrivals, trending products, departments, brands, The AUREL Edit, recommendations, service benefits, and newsletter signup.
- The temporary catalog is centralized in `frontend/src/data/products.js`: 10 Men, 12 Women, 8 Kids, 6 Beauty, 6 Accessories, and 6 Home & Living products. Product discounts are calculated from original and selling prices.
- Catalogue routes support product/brand search, department and subcategory, price, discount, brand, rating, and size filters; sorting; result counts; empty states; and pagination.
- Product detail pages include image galleries, variants, quantity selection, related products, wishlist controls, and add-to-bag feedback.
- Shared shopping state is stored in browser `localStorage`. The cart drawer and bag page show selected variants, quantities, and subtotals. Recently viewed products and wishlist are shared across SPA routes.
- Routes include `/shop`, `/category/:categorySlug`, `/product/:productId`, `/wishlist`, and `/bag`. Internal navigation uses React Router.
- Campaign offers and product information are demo data. There is no checkout, payment processing, authentication, backend catalog, or API integration.
- Failed product images use a local fallback. Motion respects the user's reduced-motion preference.
- Editorial photography is loaded from Unsplash and display fonts from Google Fonts.

Do not commit `backend/.env` or other secrets. The root `.gitignore` excludes environment files, virtual environments, installed packages, and build output.
