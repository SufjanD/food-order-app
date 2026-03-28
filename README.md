# 🍽 BiteBridge — Food Order App

A single-page food ordering application built with **Vanilla JavaScript + Vite**.

## ✅ Features Implemented

| Concept | Implementation |
|---|---|
| **Authentication** | Register, Login, Logout via LocalStorage |
| **Dashboard** | Order entity with stats table, filter form |
| **API Consumption** | TheMealDB free API (https://www.themealdb.com) via **axios** |
| **LocalStorage** | Cart, session, users, orders all persisted |
| **Render / HTML gen** | All pages built by JS functions that return/inject HTML |
| **Modules (ES6)** | `auth.js`, `cart.js`, `orders.js`, `api.js`, `router.js`, `storage.js` |
| **Helper functions** | `helpers.js` — formatPrice, debounce, toast, render, etc. |
| **npm Package** | `axios` for HTTP, `vite` for dev server & bundling |
| **Search & Filter** | Menu search (debounced), category pills, sort; Dashboard order filter |
| **5 Pages** | Home, Menu, Cart, Orders, Dashboard |

---

## 📁 Project Structure

```
food-order-app/
├── index.html                  ← HTML entry point
├── package.json                ← npm config (axios + vite)
├── vite.config.js              ← Vite dev server config
└── src/
    ├── main.js                 ← App entry, router setup
    ├── styles/
    │   └── main.css            ← All styles (CSS variables, dark theme)
    ├── modules/
    │   ├── api.js              ← TheMealDB API calls (axios)
    │   ├── auth.js             ← Register / Login / Logout
    │   ├── cart.js             ← Cart state (LocalStorage)
    │   ├── orders.js           ← Orders CRUD (LocalStorage)
    │   ├── router.js           ← Hash-based SPA router
    │   └── storage.js          ← LocalStorage wrapper
    ├── helpers/
    │   └── helpers.js          ← Utility functions
    ├── components/
    │   └── navbar.js           ← Navbar component
    └── pages/
        ├── home.js             ← Landing page
        ├── login.js            ← Login form
        ├── register.js         ← Register form
        ├── menu.js             ← Food menu + search/filter
        ├── cart.js             ← Shopping cart + checkout
        ├── orders.js           ← Order history
        └── dashboard.js        ← Stats + order management
```

---

## 🚀 Step-by-Step Setup in Visual Studio Code

### STEP 1 — Install Prerequisites

1. **Install Node.js** (includes npm):
   - Go to https://nodejs.org
   - Download the **LTS version** (e.g. 20.x)
   - Run the installer — click Next through all steps
   - ✅ Verify: open any terminal and type `node -v` → should print a version number

2. **Install Visual Studio Code**:
   - Go to https://code.visualstudio.com
   - Download for your OS and install it

---

### STEP 2 — Open the Project in VS Code

1. Extract the `food-order-app` zip folder to a location on your computer (e.g. Desktop)
2. Open **VS Code**
3. Click **File → Open Folder...**
4. Navigate to the `food-order-app` folder and click **Select Folder**
5. The project files will appear in the left sidebar (Explorer panel)

---

### STEP 3 — Open the Integrated Terminal

In VS Code:
- Press **Ctrl + `** (backtick) on Windows/Linux
- Or press **Cmd + `** on Mac
- Or go to **Terminal → New Terminal** from the top menu

A terminal panel will open at the bottom of VS Code, already inside the project folder.

---

### STEP 4 — Install npm Packages

In the terminal, type:

```bash
npm install
```

This will:
- Read `package.json`
- Download **axios** (HTTP client) and **vite** (dev server + bundler)
- Create a `node_modules/` folder automatically

You should see output like: `added 35 packages`

---

### STEP 5 — Start the Development Server

```bash
npm run dev
```

You should see output like:
```
  VITE v5.x  ready in 300ms

  ➜  Local:   http://localhost:3000/
```

- The browser may **open automatically**
- If not, open your browser and go to: **http://localhost:3000**

✅ The app is now running live!

---

### STEP 6 — Use the App

1. You'll land on the **Home page** with featured dishes loaded from the API
2. Click **Sign Up** → create an account (or use demo: `demo@bitebridge.com` / `demo1234`)
3. Go to **Menu** → search dishes, filter by category, add items to cart
4. Go to **Cart** → adjust quantities, enter an address, place an order
5. Go to **My Orders** → view your order history
6. Go to **Dashboard** → view stats and filter/manage your orders

---

### STEP 7 — Recommended VS Code Extensions

Install these for a better development experience:

1. **ESLint** — JavaScript linting
   - Open Extensions panel: `Ctrl+Shift+X`
   - Search "ESLint" → Install

2. **Prettier** — Code formatter
   - Search "Prettier - Code formatter" → Install

3. **Live Server** *(optional, not needed since Vite handles it)*

4. **Path Intellisense** — Autocomplete for import paths

---

### STEP 8 — Build for Production (optional)

When you're ready to deploy:

```bash
npm run build
```

This creates a `dist/` folder with optimized, minified files ready to upload to any static hosting (Netlify, Vercel, GitHub Pages, etc.).

To preview the production build locally:

```bash
npm run preview
```

---

## 🔑 Demo Login

| Field | Value |
|---|---|
| Email | `demo@bitebridge.com` |
| Password | `demo1234` |

---

## 🌐 Free API Used

**TheMealDB** — https://www.themealdb.com/api.php
- Free, no API key required
- Endpoints used:
  - `GET /categories.php` — all food categories
  - `GET /filter.php?c={category}` — meals by category
  - `GET /lookup.php?i={id}` — meal details
  - `GET /search.php?s={query}` — search meals

---

## 📦 npm Packages Used

| Package | Version | Purpose |
|---|---|---|
| `axios` | ^1.6.0 | HTTP requests to TheMealDB API |
| `vite` | ^5.0.0 | Dev server, hot reload, and production bundler |

---

## 🧩 Concepts Reference

### LocalStorage
Used in: `src/modules/storage.js`, `auth.js`, `cart.js`, `orders.js`
```js
localStorage.setItem('key', JSON.stringify(data));
localStorage.getItem('key');
```

### API Consumption (axios)
Used in: `src/modules/api.js`
```js
import axios from 'axios';
const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
```

### ES6 Modules
Every file uses `export` and `import`:
```js
// helpers.js
export function formatPrice(amount) { ... }

// menu.js
import { formatPrice } from '../helpers/helpers.js';
```

### HTML Rendering via JS
Used throughout all pages:
```js
function foodCardHTML(meal) {
  return `<div class="card">${meal.name}</div>`;
}
document.getElementById('food-grid').innerHTML = foodCardHTML(meal);
```

### Debounce Helper
Used in: `menu.js` for the search input
```js
const debouncedSearch = debounce((val) => { ... }, 350);
searchInput.addEventListener('input', e => debouncedSearch(e.target.value));
```

### Hash Router
Navigation between pages without page reloads:
```js
router.register('/menu', renderMenu);
router.navigate('/menu'); // changes URL to /#/menu
```
