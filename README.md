# AUREL

**The Art of Everyday Living.**

AUREL is a premium lifestyle and fashion shopping single-page application. This repository contains an independently runnable React frontend and Flask API.

## Project status

- **Phase 01 — Project initialization:** Complete. React/Vite, Tailwind CSS v4, and the Flask application-factory foundation are configured.
- **Phase 02 — Premium homepage:** Complete. The responsive editorial homepage, reusable UI components, motion, and temporary product data are in place.
- **Phase 03 onward:** Not started.

The current homepage is presentation-only. Product data is temporary, wishlist state is local to the page, the bag is a visual placeholder, and the newsletter form validates input without storing or sending it. There is no authentication, checkout, database model, or external API integration.

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
      CategorySection.jsx
      EditorialBanner.jsx
      Footer.jsx
      HeroSection.jsx
      MobileMenu.jsx
      Navbar.jsx
      Newsletter.jsx
      ProductCard.jsx
      SectionHeading.jsx
      TrendingProducts.jsx
    data/
      products.js
    layouts/
    pages/
      Home.jsx
    context/
    hooks/
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

- The homepage includes fashion, accessories, beauty, and lifestyle categories; trending product cards; an editorial feature; and a newsletter sign-up preview.
- Search filters the temporary product list in the browser. Wishlist toggles are in-memory only.
- Motion responds to the user's reduced-motion preference.
- Editorial photography is loaded from Unsplash and the display fonts from Google Fonts.

Do not commit `backend/.env` or other secrets. The root `.gitignore` excludes environment files, virtual environments, installed packages, and build output.
