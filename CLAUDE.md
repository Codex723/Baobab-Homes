# CLAUDE.md

## What this is
Baobab Homes is a Nigerian real estate marketplace frontend: search, browse, and enquire about property listings across buy/rent, plus agent profiles, neighborhood guides, market notes, and a property submission flow. Currently frontend-only with mock data; no backend or database is wired up yet.

## Tech stack
- React 19 + TypeScript, strict mode
- React Router v7 (`react-router-dom`) for real per-page URLs
- Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`, not the old PostCSS plugin)
- No component library, no icon library. All icons are hand-written inline SVG in `src/lib/icons.tsx`.
- Google Maps JavaScript API for the live map on `/app/map` (loaded via `src/lib/googleMaps.ts`)

## Commands
- Dev server: `npm run dev`
- Type-check + production build: `npm run build`
- Preview a production build: `npm run preview`
- There is no test suite and no lint script configured yet.

## Architecture
```
src/
  lib/
    types.ts        Listing and Agent interfaces, Mode type (buy | rent)
    theme.ts         Design tokens (colors, fonts, radius, shadows) as one C object; also BRAND name
    data.ts           Mock LISTINGS and AGENTS arrays. Replace with real API data during backend integration.
    content.ts        Neighborhood editorial guides with listingsIn() and priceRange() helpers
    utils.ts          fmt() naira price formatter, img() unsplash URL builder, useMobile() breakpoint hook
    icons.tsx         All SVG icons, exported as the I object
    nav.ts             useAppNav() hook and ROUTES map: logical page names to real router paths
    usePageTitle.ts   Sets document.title, meta description, canonical URL, and OG/Twitter tags per page
    googleMaps.ts     Loads the Google Maps JS API once and exposes a useGoogleMaps() hook
  context/
    AppState.tsx      Cross-page state: saved listings (Set<string>) and buy/rent mode, via React Context
  components/
    Navbar.tsx, Card.tsx, Footer.tsx, AgentSwitcher.tsx
  pages/
    One file per route: LandingPage, HomePage, SearchPage, DetailPage, MapPage, AgentPage,
    AgentDashboardPage, ListPropertyPage, NeighborhoodsPage, NeighborhoodPage, MarketNotesPage,
    ContactPage, PrivacyPolicyPage, TermsPage, FeesPage, NotFoundPage
  App.tsx             Router shell: BrowserRouter + AppStateProvider + conditional Navbar + Routes + Footer
```

Routing is real, not simulated. The cinematic landing page lives at `/` (no Navbar, full-bleed hero). The actual app lives under `/app`: `/app`, `/app/search`, `/app/listing/:id`, `/app/map`, `/app/agent/:id`, `/app/agent/:id/dashboard`, `/app/list-property`, `/app/neighborhoods`, `/app/neighborhoods/:slug`, `/app/market-notes`, `/app/contact`, `/app/privacy`, `/app/terms`, `/app/fees`, plus a catch-all 404. Each route works on a direct load or hard refresh, not just via in-app navigation.

## Code conventions actually used here
- Every styled element uses inline `style={{ ... }}` objects referencing tokens from `C` (`src/lib/theme.ts`). No Tailwind utility classes are used for one-off component styling; Tailwind is only pulled in for the CSS reset/base layer in `index.css`.
- One `C.r` corner-radius value is used everywhere except literal circles (`50%`) and one directional map-pin shape. Don't introduce a second radius value without discussing it first.
- One shadow scale: `C.sh0` (resting), `C.sh1` (hover), `C.sh2` (modal/popover). Don't add ad hoc `boxShadow` strings.
- Cross-page state goes in `context/AppState.tsx`. Route-local state (form inputs, toggles) stays in the page component with `useState`.
- Navigation from inside components uses `useAppNav()` (`nav('search')`, `nav('detail', { lid })`, etc.), not raw `useNavigate()` calls, so the mapping to real paths stays in one place (`src/lib/nav.ts`).
- Primary navigational elements (navbar links, listing cards, agent switcher) render real `<Link>` components, not `onClick`-only divs, so they are crawlable and keyboard-accessible.
- Every page calls `usePageTitle(title, { description, path })` to set a unique title, meta description, canonical URL, and Open Graph/Twitter tags. The `path` should match the real route for that page.
- No fabricated metrics, review counts, or testimonials anywhere in copy. If a number isn't real, don't display it. General qualitative claims are fine ("licensed agents only"); specific invented statistics are not. Stats on the landing, home, and market notes pages are computed live from the mock dataset.
- No em dashes in any copy or code comments. Use a period, comma, or colon instead.

## Hard rules, don't touch without asking
- Don't reintroduce a component/icon library (Lucide, Radix, shadcn, etc.) without checking first. The custom icon set and inline-style system are intentional, not an oversight.
- Don't add `localStorage`/`sessionStorage` calls; none are used, and this project may run in an environment where they're unavailable.
- Don't change `src/lib/data.ts` shape without checking whether it maps to a real backend schema first, once one exists.
- Don't add a second font family, radius value, or shadow style. The cinematic feel comes from layout, pacing, and imagery, not a new visual language.

## Gotchas
- `src/lib/data.ts` is mock data. Listing photos are Unsplash IDs run through `img()`, not real property photos. Do not treat any of it as real inventory. Listing coordinates are real Lagos/Abuja locations used to demo the live map; they are not tied to the (fictional) addresses.
- `MapPage` renders a real Google Maps JavaScript API map (roadmap/satellite/street view), loaded via `src/lib/googleMaps.ts`. It reads `VITE_GOOGLE_MAPS_API_KEY` from the environment. Maps JS API keys are meant to be restricted by HTTP referrer in the Google Cloud Console rather than kept secret, so committing a restricted key is fine, but `.env` is gitignored by default here regardless.
- The landing page at `/` is a UI-only distinction, not a security boundary. There is no backend, so nothing stops a visitor from loading `/app/search` directly. The same applies to `/app/agent/:id/dashboard`: anyone who knows an agent id can open it. Real gating needs an actual auth/session layer.
- The "List your property" and enquiry/viewing forms are UI-only; submitting them sets local `sent`/`done` state and does not send anything anywhere yet.
- The agent dashboard document uploads are real browser `File` objects held in page-local React state. They are never uploaded, and they are lost on refresh or navigation.
- `AgentPage`, `DetailPage`, `NeighborhoodPage`, and `AgentDashboardPage` render a `NotFound` fallback (not a redirect) when the URL id doesn't match any record, so bad links degrade gracefully instead of crashing.
- Production builds have source maps disabled and manual chunk splitting (react-vendor and router chunks) configured in `vite.config.ts` to keep bundles small.