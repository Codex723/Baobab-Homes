# Baobab Homes

A Nigerian real estate marketplace frontend focused on trust and vetting. Browse verified buy and rent listings across Lagos and Abuja, explore the live map, connect with licensed agents, and submit a property of your own.

Every listing is reviewed before it goes live. Every agent is licensed with LASRERA or ESVARBON and tied to one patch. No fees to browse, no sign-up wall to see a real address.

---

## Screenshots

> Drop screenshots into the `docs/screenshots/` directory (create it if it doesn't exist) and update the paths below.

### Cinematic landing page

The full-bleed front door at `/` with scroll-linked parallax, an area filmstrip, feature cards, a stats band computed from live data, and an agent spotlight.

<img src="docs/screenshots/landing-hero.png" alt="Cinematic landing page hero" width="800" />

### App home

The app home at `/app` with the search widget, trust strip, latest listings, neighbourhood browse, and agent preview.

<img src="docs/screenshots/app-home.png" alt="App home page with search widget" width="800" />

### Search with filters

`/app/search` supports grid and list views, price range, beds, baths, property type, furnished, verified, and parking filters, plus URL-driven querystring filters.

<img src="docs/screenshots/search-grid.png" alt="Search results with filters sidebar" width="800" />

### Listing detail

`/app/listing/:id` features a gallery with thumbnails, full specs, amenities, location link, the listing agent with call and WhatsApp actions, and an inline viewing request form.

<img src="docs/screenshots/listing-detail.png" alt="Listing detail page" width="800" />

### Live map view

`/app/map` renders a real Google Maps JavaScript API map with custom markers, a buy/rent toggle, an info window, and a scrollable property sidebar.

<img src="docs/screenshots/map-view.png" alt="Map view with property markers" width="800" />

### Agent profile

`/app/agent/:id` shows the agent's bio, license, direct contact channels, their active listings, and a message form.

<img src="docs/screenshots/agent-profile.png" alt="Agent profile page" width="800" />

### Agent dashboard (preview)

`/app/agent/:id/dashboard` is a UI preview of an agent document manager with per-listing file uploads held in browser-local state only.

<img src="docs/screenshots/agent-dashboard.png" alt="Agent dashboard preview" width="800" />

### List your property

A 4-step wizard at `/app/list-property` covering property info, photos, pricing, and contact details, ending in a submitted confirmation screen.

<img src="docs/screenshots/list-property.png" alt="Property submission wizard" width="800" />

### Neighborhood guides

`/app/neighborhoods` and `/app/neighborhoods/:slug` offer editorial guides for each covered area with live price ranges and the area's current listings.

<img src="docs/screenshots/neighborhood-guides.png" alt="Neighborhood guides grid" width="800" />

### Market notes

`/app/market-notes` computes headline stats directly from the current listings: active counts, sale and rent ranges, verified share, and breakdowns by property type and area.

<img src="docs/screenshots/market-notes.png" alt="Market notes dashboard" width="800" />

---

## Features

- **Cinematic landing page** at `/`. Full-bleed hero with a scroll-linked parallax band, neighbourhood filmstrip, feature cards, a stats band computed from real data (not invented numbers), and an agent spotlight. No Navbar on this page so the hero runs edge to edge.
- **Real multi-page routing** via React Router. Every route is a bookmarkable, refresh-safe URL (`/app`, `/app/search`, `/app/listing/:id`, `/app/map`, `/app/agent/:id`, `/app/neighborhoods/:slug`, `/app/market-notes`, and more).
- **Search with rich filters** across buy and rent. Price range, min beds and baths, property type, furnished only, verified only, and parking required. Grid and list view modes with sorting. Filters also work through shareable query strings like `/app/search?type=rent` and `/app/search?suburb=Lekki%20Phase%201`.
- **Listing detail pages** with an image gallery, thumbnails, full spec grid, amenities, description, a link to the live map, save-to-favourites, direct agent contact (phone and WhatsApp), and a viewing request form.
- **Live Google Maps view** with custom terracotta markers, buy/rent toggle, click-to-highlight side panel, and info windows. Reads its API key from the environment.
- **Agent profiles** with license details, direct contact, active listings, and a general enquiry form. An agent switcher lets you jump between profiles.
- **Agent dashboard preview** for each agent with a per-listing document manager. Files are held in browser-local React state only; nothing is uploaded anywhere.
- **Neighborhood guides** with editorial copy written from the listings themselves and live price ranges, plus a shortcut to search all listings in an area.
- **Market notes** with statistics computed live from the current listings. No fabricated market claims.
- **Multistep property submission flow**. Property info, photos, pricing, and contact details, with a progress indicator and a confirmation screen.
- **Legal and support pages** for privacy policy, terms of use, and fees and commissions.
- **No fabricated metrics anywhere**. Stats on the landing, home, and market notes pages are computed live from the mock dataset. Qualitative claims ("licensed agents only") are used; invented review counts and testimonials are not.
- **Fully responsive.** Every page adapts between desktop and mobile, including the mobile hamburger menus, sticky action bars, and stacked card layouts.

---

## Tech stack

- **React 19** with TypeScript (strict mode)
- **React Router v7** (`react-router-dom`) for real per-page URLs
- **Vite 8** for the build tool
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (used for the CSS reset/base layer only)
- **No component library, no icon library.** All icons are hand-written inline SVG in `src/lib/icons.tsx`
- **No animation library.** The landing page parallax is a lightweight scroll listener with a transform, and it respects `prefers-reduced-motion`
- **Google Maps JavaScript API** for the live map on `/app/map`

---

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm (or pnpm/yarn)

### Install

```bash
npm install
```

### Environment variables

Copy the example environment file and add a Google Maps JavaScript API key:

```bash
cp .env.example .env
```

Then open `.env` and paste in your key:

```
VITE_GOOGLE_MAPS_API_KEY=your_key_here
```

> Google Maps JS API keys are meant to be restricted by HTTP referrer in the Google Cloud Console rather than kept secret. Committing a restricted key is fine. The map page shows a friendly error state when no key is present, so the rest of the site still works without one.

### Run the dev server

```bash
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`) in your browser.

### Production build and preview

```bash
npm run build        # Type-check + production build
npm run preview      # Preview the production build locally
```

---

## Scripts

| Command            | Description                                        |
| ------------------ | -------------------------------------------------- |
| `npm run dev`      | Start the Vite dev server                          |
| `npm run build`    | Run TypeScript check, then create a production build |
| `npm run preview`  | Preview the built site locally                     |

There is no test suite or lint script configured yet.

---

## Project structure

```
src/
  lib/
    types.ts              Listing and Agent interfaces, Mode type (buy | rent)
    theme.ts              Design tokens as one C object (colors, fonts, radius, shadows) plus BRAND
    data.ts               Mock LISTINGS and AGENTS arrays
    content.ts            Neighborhood editorial guides with helpers for listingsIn / priceRange
    utils.ts              fmt() naira price formatter, img() Unsplash URL builder, useMobile() hook
    icons.tsx             Hand-written inline SVG icons, exported as the I object
    nav.ts                useAppNav() hook and ROUTES map from logical page names to real paths
    usePageTitle.ts       Sets document.title per page
    googleMaps.ts         Loads the Google Maps JS API once and exposes a useGoogleMaps() hook
  context/
    AppState.tsx          Cross-page state: saved listings (Set<string>) and buy/rent mode, via React Context
  components/
    Navbar.tsx            Sticky top nav (hidden on the landing page)
    Card.tsx              Listing card, grid and hero variants
    Footer.tsx            Dark footer with explore, guides, company, and legal columns
    AgentSwitcher.tsx     Horizontal agent profile switcher used on agent pages
  pages/
    LandingPage.tsx       Cinematic marketing door at "/"
    HomePage.tsx          App home at "/app"
    SearchPage.tsx        Filterable search results at "/app/search"
    DetailPage.tsx        Listing detail and viewing request at "/app/listing/:id"
    MapPage.tsx           Live Google Maps view at "/app/map"
    AgentPage.tsx         Agent profile at "/app/agent/:id"
    AgentDashboardPage.tsx  Agent document manager preview at "/app/agent/:id/dashboard"
    ListPropertyPage.tsx  Multistep property submission at "/app/list-property"
    NeighborhoodsPage.tsx Guide index at "/app/neighborhoods"
    NeighborhoodPage.tsx  Single area guide at "/app/neighborhoods/:slug"
    MarketNotesPage.tsx   Stats computed from live listings at "/app/market-notes"
    ContactPage.tsx       Contact page with office details and form
    PrivacyPolicyPage.tsx, TermsPage.tsx, FeesPage.tsx  Legal and support pages
    NotFoundPage.tsx      Reusable 404 component and route-level page
  App.tsx                 Router shell: BrowserRouter + AppStateProvider + conditional Navbar + Routes + Footer
```

---

## Routing

| Route                        | Page                    | Notes                                   |
| ---------------------------- | ----------------------- | --------------------------------------- |
| `/`                          | LandingPage             | Cinematic door, no Navbar               |
| `/about`                     | redirect to `/`         | Kept so old links don't 404             |
| `/app`                       | HomePage                | App home with search widget             |
| `/app/search`                | SearchPage              | Supports `?type=buy\|rent` and `?suburb=` |
| `/app/listing/:id`           | DetailPage              | 404 fallback for unknown ids            |
| `/app/map`                   | MapPage                 | Live Google Maps view                   |
| `/app/agent/:id`             | AgentPage               | 404 fallback for unknown ids            |
| `/app/agent/:id/dashboard`   | AgentDashboardPage      | Agent document manager preview          |
| `/app/list-property`         | ListPropertyPage        | Multistep submission wizard             |
| `/app/neighborhoods`         | NeighborhoodsPage       | Guide index                             |
| `/app/neighborhoods/:slug`   | NeighborhoodPage        | Single area guide, 404 fallback         |
| `/app/market-notes`          | MarketNotesPage         | Stats computed from live listings       |
| `/app/contact`               | ContactPage             |                                         |
| `/app/privacy`               | PrivacyPolicyPage       |                                         |
| `/app/terms`                 | TermsPage               |                                         |
| `/app/fees`                  | FeesPage                |                                         |
| `*`                          | NotFoundPage            | Catch-all 404                           |

---

## Design system

All visual tokens live in `src/lib/theme.ts` and are consumed as a single `C` object. Every styled element uses inline styles referencing these tokens.

| Token      | Value               | Usage                        |
| ---------- | ------------------- | ---------------------------- |
| `C.ink`    | `#0F1E17`           | Dark green-black, text/dark bg |
| `C.terra`  | `#C05628`           | Terracotta accent            |
| `C.ground` | `#F5F2EC`           | Warm off-white               |
| `C.stone`  | `#6A6058`           | Muted body text              |
| `C.sand`   | `#E5DED4`           | Soft neutral border/fill     |
| `C.display`| `'Fraunces', Georgia, serif` | Display/heading font    |
| `C.sans`   | `'Inter', system-ui, sans-serif` | Body font           |
| `C.r`      | `6px`               | The one corner-radius value  |
| `C.sh0`    | resting              | Card resting shadow          |
| `C.sh1`    | hover                | Card hover shadow            |
| `C.sh2`    | popover              | Modal/popover shadow         |

The system intentionally uses a single radius value, a single shadow scale, and two font families. The cinematic feel comes from layout, pacing, and imagery, not from a second visual language.

---

## Notes and limitations

- `src/lib/data.ts` is mock data. Listing photos are Unsplash IDs run through `img()`, not real property photos. Do not treat any of it as real inventory. The listing coordinates are real Lagos and Abuja locations used to demo the live map; they are not tied to the (fictional) addresses.
- The landing page at `/` is a UI-only distinction, not a security boundary. There is no backend, so nothing stops a visitor from loading `/app/search` directly. The same applies to `/app/agent/:id/dashboard`: anyone who knows an agent id can open it. Real gating needs an actual auth/session layer.
- The "List your property" and enquiry/viewing forms are UI-only. Submitting them sets local `sent`/`done` state and does not send anything anywhere yet.
- The agent dashboard document uploads are real browser `File` objects held in page-local React state. They are never uploaded, and they are lost on refresh or navigation.
- `AgentPage` and `DetailPage` render a 404 fallback (not a redirect) when the URL id doesn't match a record, so bad links degrade gracefully.
- No `localStorage` or `sessionStorage` is used anywhere, by design.

---

## Documentation

Additional design and decision notes live in the `docs/` directory:

- [`docs/POSITIONING.md`](docs/POSITIONING.md): brand positioning and voice rules for the marketing page
- [`docs/CINEMATIC-LANDING-BRIEF.md`](docs/CINEMATIC-LANDING-BRIEF.md): imagery and content brief for the landing page
- [`docs/ROUTING-DECISION.md`](docs/ROUTING-DECISION.md): history of the routing structure decision between the cinematic page and the app

---

## License

Private project. All rights reserved.