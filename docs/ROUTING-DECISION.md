# ROUTING-DECISION.md

## Status: superseded
The original decision below (cinematic page at `/about`, app stays at `/`)
was reversed. Keeping the history since the reasoning for each stage is
still useful context.

## Current structure
- `/` — the cinematic landing page (`LandingPage.tsx`). No Navbar (the hero
  carries its own wordmark instead), but it does render the standard
  Footer, full-bleed hero, single entry point into the app.
- `/about` — redirects to `/` (kept so old links don't 404).
- `/app` and everything under it (`/app/search`, `/app/listing/:id`,
  `/app/map`, `/app/agent/:id`, `/app/agent/:id/dashboard`,
  `/app/list-property`, `/app/neighborhoods`, `/app/neighborhoods/:slug`,
  `/app/market-notes`) — the actual product, unchanged apart from the URL
  prefix. Standard Navbar/Footer render here.

## Why the reversal
The requirement changed from "add a marketing page alongside the app" to
"show the cinematic page first, the app is what's behind it." That's a
front-door change, not an additive one, so `/` had to become the landing
page rather than the app.

## Important limitation: this is not authentication
There is no backend. Nothing stops a visitor from typing `/app/search`
directly into the address bar; the "gate" is purely about what shows up
by default, not an access control. If real gating is ever needed (e.g. a
signed-in-only app), that requires an actual auth/session layer, which is
a separate, larger decision, not a routing change.

The same limitation applies to `/app/agent/:id/dashboard`: it is a UI
preview of an agent document manager, reachable by anyone who knows or
guesses an agent id, with an in-page notice saying so. It is not
agent-specific access control. Real per-agent gating needs the same
auth/session layer as above, plus actual file storage (there is none:
"documents" added there are real browser `File` objects held in page-local
React state, never uploaded, and lost on refresh or navigation).

## What changed in the codebase
- `AboutPage.tsx` renamed to `LandingPage.tsx`, mounted at `/`
- `nav.ts` ROUTES updated: `home` now resolves to `/app`, `search` to
  `/app/search`, etc. `about` now resolves to `/`
- `App.tsx` restructured: a `Shell` component conditionally hides
  Navbar/Footer when `pathname === '/'`
- Hardcoded links in `Card.tsx`, `AgentSwitcher.tsx`, `Navbar.tsx`, and
  `Footer.tsx` updated to the `/app` prefix (these don't go through
  `useAppNav()`, so they needed manual updates)
- Navbar logo now links to `/app` (return to the app's own home while
  browsing), not back out to the landing gate
