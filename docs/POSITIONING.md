# POSITIONING.md

## Purpose
This doc anchors the copy and tone for the new marketing/cinematic page so it
reads like the same company as the app home, not a different project. Fill in
the TODO sections with your own words before we write final copy. Draft
placeholders below are based only on what the existing app already implies.

## What the existing site already tells us (inferred, not invented)
Pulled directly from copy already live in `HomePage.tsx`:
- "Verified listings, reviewed before they go live"
- "Every listing checked before publishing"
- "Licensed agents only"
- "No fees for buyers or renters to browse"
- "No sign-up required to browse"

Pattern: Baobab Homes' implied differentiator is trust and vetting, not
inventory size or price. The existing voice is calm, factual, no
superlatives, no invented numbers. The marketing page should extend this,
not replace it with generic luxury-brand copy.

## TODO: fill these in (your words, not mine)
- **One-line pitch**: What is Baobab Homes, in one sentence, to someone who has
  never seen it?
- **Primary differentiator**: Why Baobab Homes over a generic listings
  aggregator? (Vetting? Local agents? Something else?)
- **Who it's for**: Buyers, renters, both? Any specific market or region?
- **Tagline candidates** (optional): any phrase you already like, even
  rough.

## Draft direction (based on inferred pattern above, needs your confirmation)
Working headline direction: something that names the vetting/trust angle
without a stat attached to it, e.g. "Every listing here has been checked by
a person, not just a script." (placeholder, not final, replace once pitch
is confirmed)

## Voice rules (carried over from CLAUDE.md, apply to this page too)
- No fabricated metrics, review counts, or testimonials. If a number isn't
  real, it doesn't appear.
- General qualitative claims are fine ("licensed agents only"). Specific
  invented statistics are not.
- No em dashes in copy. Use a period, comma, or colon instead.
- Calm register throughout. No exclamation points, no "unlock," "elevate,"
  "seamless" style filler adjectives.

## Typography and palette (already defined, reuse as-is)
- Display font: Fraunces (serif) via `C.display`
- Body font: Inter via `C.sans`
- Palette: `C.ink` (#0F1E17 dark green-black), `C.terra` (#C05628 accent),
  `C.ground` (#F5F2EC warm off-white), `C.sand` / `C.stone` neutrals
- One radius token (`C.r`, 6px), one shadow scale (`C.sh0/1/2`)
- Do not introduce a second font family, radius value, or shadow style for
  this page. The cinematic feel should come from layout, pacing, and
  imagery, not a new visual language.
