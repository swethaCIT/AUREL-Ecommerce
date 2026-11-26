# AUREL

**The Art of Everyday Living.**

AUREL is a premium lifestyle and fashion shopping single-page application. This repository contains an independently runnable React frontend and Flask API.

## Project status

- **Phase 01 — Project initialization:** Complete. React/Vite, Tailwind CSS v4, and the Flask application-factory foundation are configured.
- **Phase 02 — Premium homepage:** Complete. The responsive editorial homepage, reusable UI components, motion, and temporary product data are in place.
- **Shopping-first UX refinement:** Complete. Product discovery, product details, wishlist, shopping bag, and recently viewed are implemented using temporary browser-side data.
- **Phase 03 onward:** Not started.

The catalog is temporary and the wishlist, bag, and recently viewed state are held in memory; they reset after a full page reload. Checkout, payment, authentication, and external API integration are not implemented. The newsletter validates input without storing or sending it.

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
      AurelEdit.jsx
      CategorySection.jsx
      Footer.jsx
      HeroSection.jsx
      MobileMenu.jsx
      Navbar.jsx
      Newsletter.jsx
      ProductCard.jsx
      ProductGridSection.jsx
      PromotionBanner.jsx
      SectionHeading.jsx
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
    services/
    utils/
      formatCurrency.js
    services/
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

## Homepage notes

- The homepage includes a campaign hero, category links, new arrivals, best sellers, a promotion, The AUREL Edit, recently viewed products, service benefits, and a compact newsletter.
- Temporary products are defined in `frontend/src/data/products.js`. The catalog supports category and price filters, search, price/popularity sorting, and product detail routes.
- Wishlist, bag quantities/subtotals, and recently viewed products use shared in-memory state. The bag and wishlist are not persisted across full page reloads; checkout is unavailable.
- Routes include `/shop`, `/category/:categorySlug`, `/product/:productId`, `/wishlist`, and `/bag`.
- Motion responds to the user's reduced-motion preference.
- Editorial photography is loaded from Unsplash and the display fonts from Google Fonts.

Do not commit `backend/.env` or other secrets. The root `.gitignore` excludes environment files, virtual environments, installed packages, and build output.
