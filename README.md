# ⬡ CryptoVault

A clean, production-ready cryptocurrency market dashboard built with React.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter)
![Axios](https://img.shields.io/badge/Axios-1.6-5A29E4)

---

## Features

- **Live market data** — Top 100 coins by market cap, auto-refreshed every 60s
- **Global stats bar** — Total market cap, volume, BTC/ETH dominance
- **Search** — Instant client-side filter by name or symbol
- **Detail view** — Full stats, price ranges, sparkline chart, description & links
- **Skeleton loaders** — No layout shift while data is loading
- **Error handling** — Friendly error states with retry buttons
- **Responsive** — Works on mobile, tablet, and desktop
- **Code-split routes** — Each page is lazy-loaded for performance

---

## Quick Start

### 1. Prerequisites

- Node.js ≥ 16
- npm or yarn

### 2. Clone & Install

```bash
git clone <your-repo>
cd cryptovault
npm install
```

### 3. Configure API Key

Get a **free** API key from [CoinGecko](https://www.coingecko.com/en/api).

```bash
cp .env.example .env
```

Open `.env` and paste your key:

```env
REACT_APP_COINGECKO_API_KEY=your_actual_key_here
```

> ⚠️ Never commit `.env` to version control. It is already in `.gitignore`.

### 4. Run

```bash
npm start
```

App runs at [http://localhost:3000](http://localhost:3000).

### 5. Build for Production

```bash
npm run build
```

Outputs to `/build` — ready to deploy to Vercel, Netlify, or any static host.

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CoinTable.jsx    # Main market table with search
│   ├── ErrorMessage.jsx # Error display with retry
│   ├── Footer.jsx       # Page footer
│   ├── GlobalStats.jsx  # Market ticker bar
│   ├── Navbar.jsx       # Top navigation
│   ├── Skeleton.jsx     # Loading skeleton rows
│   └── Sparkline.jsx    # SVG sparkline chart
│
├── hooks/
│   └── useCryptoData.js # Custom data-fetching hooks
│
├── pages/
│   ├── CoinDetailPage.jsx  # Single coin detail view
│   ├── HomePage.jsx        # Market listing page
│   └── NotFoundPage.jsx    # 404 page
│
├── services/
│   └── cryptoApi.js     # Axios API client & all API calls
│
├── styles/              # Component-scoped CSS files
│   ├── global.css       # CSS variables, reset, animations
│   ├── CoinTable.css
│   ├── CoinDetailPage.css
│   ├── ErrorMessage.css
│   ├── Footer.css
│   ├── GlobalStats.css
│   ├── HomePage.css
│   ├── Navbar.css
│   ├── NotFoundPage.css
│   ├── Skeleton.css
│   └── Sparkline.css
│
├── utils/
│   └── formatters.js    # Pure formatting utility functions
│
├── App.js               # Root component + routing
└── index.js             # Entry point
```

---

## Design Decisions

| Decision | Rationale |
|---|---|
| CoinGecko API | Free tier, no credit card, generous rate limits |
| Axios | Interceptors for clean error normalization |
| React Router v6 | Industry-standard, file-based mental model |
| CSS files (no CSS-in-JS) | Zero runtime overhead, easy to override |
| `React.memo` on CoinRow | Prevents re-renders when only search changes |
| `React.lazy` + Suspense | Page-level code splitting out of the box |
| Custom hooks | Business logic decoupled from presentation |
| 60s auto-refresh | Balance between freshness and API rate limits |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `REACT_APP_COINGECKO_API_KEY` | Recommended | CoinGecko Demo API key |

The app works without an API key (uses the public endpoint) but will be heavily rate-limited.

---

## API Reference

All API calls are in `src/services/cryptoApi.js`:

| Function | Endpoint | Description |
|---|---|---|
| `fetchCoins(perPage, page)` | `/coins/markets` | Top coins with sparkline |
| `fetchCoinDetail(coinId)` | `/coins/:id` | Full coin detail |
| `fetchGlobalStats()` | `/global` | Market-wide statistics |
| `searchCoins(query)` | `/search` | Coin search |

---

## License

MIT
