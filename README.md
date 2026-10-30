# Nivti Market

Georgian-language ecommerce demo built with React, React Router, Tailwind CSS, and Vite.

## Run locally

```sh
npm install
npm run dev
```

## Checks

```sh
npm run lint
npm run build
```

## Project structure

- `src/pages/` contains catalog, order, account, and admin screens.
- `src/components/Storefront.jsx` contains shared navigation and product components.
- `src/store/` contains the context provider, mock API, seed data, and persistence helpers.
- `src/App.jsx` wires the routes and application shell.
- `src/App.css` contains layout styles; `src/theme.css` contains the visual theme.

The demo persists products, cart, favorites, orders, profile, notifications, and reviews in `localStorage`. Authentication, checkout payment, and product data use local mock behavior; connect a backend before production use.
