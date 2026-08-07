# CLAUDE.md

## What this is
Havenmark is a real estate marketplace frontend: search, browse, and enquire about property listings across buy/rent, plus agent profiles and a property submission flow. Currently frontend-only with mock data; no backend or database is wired up yet.

## Tech stack
- React 19 + TypeScript, strict mode
- React Router v7 (`react-router-dom`) for real per-page URLs
- Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`, not the old PostCSS plugin)
- No component library, no icon library. All icons are hand-written inline SVG in `src/lib/icons.tsx`.

## Commands
- Dev server: `npm run dev`
- Type-check + production build: `npm run build`
- Preview a production build: `npm run preview`
- There is no test suite and no lint script configured yet.

## Architecture
```
src/
  lib/
    types.ts        Listing and Agent interfaces, Mode type
    theme.ts         Design tokens (colors, fonts, radius, shadows) as one C object; also BRAND name
    data.ts           Mock LISTINGS and AGENTS arrays. Replace with real API data during backend integration.
    utils.ts          fmt() price formatter, img() unsplash URL builder, useMobile() breakpoint hook
    icons.tsx         All SVG icons, exported as the I object
    nav.ts             useAppNav() hook: maps logical page names to real router paths
    usePageTitle.ts   Sets document.title per page
  context/
    AppState.tsx      Cross-page state: saved listings (Set<string>) and buy/rent mode, via React Context
  components/
    Navbar.tsx, Card.tsx, Footer.tsx, AgentSwitcher.tsx
  pages/
    One file per route: HomePage, SearchPage, DetailPage, MapPage, AgentPage, ListPropertyPage, NotFoundPage
  App.tsx             Router shell: BrowserRouter + Routes + AppStateProvider + Navbar/Footer layout
```

Routing is real, not simulated: `/`, `/search`, `/listing/:id`, `/map`, `/agent/:id`, `/list-property`, plus a catch-all 404. Each route works on a direct load or hard refresh, not just via in-app navigation.

## Code conventions actually used here
- Every styled element uses inline `style={{ ... }}` objects referencing tokens from `C` (`src/lib/theme.ts`). No Tailwind utility classes are used for one-off component styling; Tailwind is only pulled in for the CSS reset/base layer in `index.css`.
- One `C.r` corner-radius value is used everywhere except literal circles (`50%`) and one directional map-pin shape. Don't introduce a second radius value without discussing it first.
- One shadow scale: `C.sh0` (resting), `C.sh1` (hover), `C.sh2` (modal/popover). Don't add ad hoc `boxShadow` strings.
- Cross-page state goes in `context/AppState.tsx`. Route-local state (form inputs, toggles) stays in the page component with `useState`.
- Navigation from inside components uses `useAppNav()` (`nav('search')`, `nav('detail', { lid })`, etc.), not raw `useNavigate()` calls, so the mapping to real paths stays in one place (`src/lib/nav.ts`).
- Primary navigational elements (navbar links, listing cards, agent switcher) render real `<Link>` components, not `onClick`-only divs, so they are crawlable and keyboard-accessible.
- No fabricated metrics, review counts, or testimonials anywhere in copy. If a number isn't real, don't display it. General qualitative claims are fine ("licensed agents only"); specific invented statistics are not.
- No em dashes in any copy or code comments. Use a period, comma, or colon instead.

## Hard rules, don't touch without asking
- Don't reintroduce a component/icon library (Lucide, Radix, shadcn, etc.) without checking first. The custom icon set and inline-style system are intentional, not an oversight.
- Don't add `localStorage`/`sessionStorage` calls; none are used, and this project may run in an environment where they're unavailable.
- Don't change `src/lib/data.ts` shape without checking whether it maps to a real backend schema first, once one exists.

## Gotchas
- `src/lib/data.ts` is mock data. Listing photos are Unsplash IDs run through `img()`, not real property photos. Do not treat any of it as real inventory.
- `MapPage` uses a static image with percentage-positioned pins (`mx`/`my` on each listing), not a real map SDK. Swapping in a real map provider will require reworking the pin/popup positioning logic.
- The "List your property" and inquiry forms are UI-only; submitting them sets local `sent`/`done` state and does not send anything anywhere yet.
- `AgentPage` and `DetailPage` render a `NotFound` fallback (not a redirect) when the URL id doesn't match any record, so bad links degrade gracefully instead of crashing.
