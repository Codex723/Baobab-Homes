# CINEMATIC-LANDING-BRIEF.md

## Purpose
What imagery and content this page actually needs, and what it will run on
if that content isn't ready yet.

## Current state
The existing app (`HomePage.tsx`, `Card.tsx`, `data.ts`) uses Unsplash
photography, sourced through `img()` in `lib/utils.ts`. This is mock
content, explicitly flagged as such in `CLAUDE.md`: not real property
photos, not real inventory.

## Decision: what this page runs on
Default, unless you say otherwise: continue using curated Unsplash
photography for this page too, matching the existing site's approach, so
the marketing page and the app don't visually contradict each other. Swap
in real photography later without changing the page structure.

## What "curated" means here (this is the actual craft step)
The failure mode isn't "using stock photos," it's using stock photos that
look like stock photos: inconsistent lighting, mixed color temperature,
generic staging. For this page specifically:
- Every hero-weight image should share a warm, late-day light temperature
  consistent with `C.ink` and `C.terra` (the palette already leans warm
  dusk/terracotta, not cool daylight)
- No wide-angle real-estate-listing-style shots (the ones with visible lens
  distortion). Use tighter, editorial-style crops instead.
- Reuse the same handful of photo IDs already in `data.ts` and `HomePage.tsx`
  where possible, so the marketing page feels like it's showing the same
  properties the app has, not a disconnected stock library.

## Content inventory needed (beyond photography)
- [ ] Confirmed pitch and differentiator (see `POSITIONING.md`)
- [ ] 3 to 5 short section headlines (I can draft these once positioning is
      confirmed; they should sound like the existing trust-strip copy, not
      like ad copy)
- [ ] Decision on whether any real listing/agent data from `data.ts` should
      be featured on this page (e.g. one real-feeling example listing), or
      whether the page stays entirely conceptual with no specific numbers

## What this page will NOT include (per CLAUDE.md, carried over)
- No AI-generated cinematic video. No video asset currently exists in the
  repo, and an AI b-roll loop risks looking generic rather than premium.
  The cinematic feel comes from scroll pacing and layout instead.
- No invented review counts, "trusted by X users," or similar stats.
- No new component or animation library added silently. If GSAP or a
  similar scroll library turns out to be genuinely needed, that's a call to
  make explicitly, not a default.
