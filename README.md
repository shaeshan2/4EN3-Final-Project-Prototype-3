# CoolRoute

A **presentation-ready, mobile-first frontend prototype** for a climate navigation concept: help people find **cooler areas nearby** during extreme heat. The interface blends a compact weather-style dashboard with a map-first flow similar to turn-by-turn navigation apps.

This repository is **frontend only**. There is no backend, authentication, database, or live weather API. Environmental values and zones are **mocked in code** so the demo runs anywhere with a single `npm install`.

---

## Features

- Centered **phone-style** shell with header (greeting, user label, search field), environment cards, and a highlighted **recommended action** panel.
- **Interactive map** via [Leaflet](https://leafletjs.com/) / [React Leaflet](https://react-leaflet.js.org/) using **OpenStreetMap** raster tiles (not Google Maps).
- **Hot** and **cool** zones as circle overlays with popups (temperature, comfort, notes).
- **Walking route** polyline from the user to the recommended cool zone after **Find Coolest Area**.
- Map controls: emphasize heat zones, emphasize cool zones, and run the “coolest area” flow.

---

## Tech stack

| Layer | Choice |
|--------|--------|
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Map | Leaflet 1.9, React Leaflet 5 |
| Tooling | Vite 8, ESLint |

---

## Requirements

- **Node.js** 18+ (20+ recommended)
- **npm** (ships with Node)

---

## Getting started

Clone the repository and install dependencies:

```bash
git clone https://github.com/shaeshan2/4EN3-Final-Project-Prototype-3.git
cd 4EN3-Final-Project-Prototype-3
npm install
```

Start the dev server:

```bash
npm run dev
```

Open the URL printed in the terminal (typically **http://localhost:5173**). A network connection is only needed for **map tiles** (OpenStreetMap); all app data is local.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Typecheck and produce production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Project structure

```
src/
  App.tsx                 # Phone layout, map mode state, “navigation active” flag
  main.tsx
  index.css               # Tailwind + Leaflet base styles
  data/
    mockData.ts           # **Edit mock content here** (see below)
  components/
    AppHeader.tsx
    EnvironmentDashboard.tsx
    RecommendedAction.tsx
    CoolRouteMap.tsx      # Map, zones, route polyline, popups
    MapActionBar.tsx
    BottomSummary.tsx
    icons.tsx
```

---

## Customizing mock data

All editable demo content lives in **`src/data/mockData.ts`**:

- **User profile** — greeting and username
- **`USER_POSITION`** — map center and user marker (`[latitude, longitude]`)
- **`DASHBOARD`** — temperature, condition, humidity, wind, heat-risk label
- **`HOT_ZONES` / `COOL_ZONES`** — zone centers, radii (meters), popup copy; set **`isBest: true`** on one cool zone for the **Find Coolest Area** button
- **Routes** — when you tap a zone or use **Find Coolest Area**, the app draws a **straight-line path** from **`USER_POSITION`** to that zone’s center (no external routing API)
- **`ZONE_FORECASTS` / `FORECAST_SLIDER_MAX_HOURS`** — mock hourly anchors for the **forecast slider** after a zone is selected; add or edit entries per zone id
- **`RECOMMENDATION_IDLE` / `RECOMMENDATION_ACTIVE`** — copy before vs after **Find Coolest Area**
- **`BOTTOM_SUMMARY`** — footer strip text

After changing coordinates, reload the app and use the map buttons to verify overlays and the route.

---

## License

This project is provided as coursework / prototype material unless you add a separate license.
