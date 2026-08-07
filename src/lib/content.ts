import { LISTINGS } from './data'
import type { Listing } from './types'

export interface Neighborhood {
  slug: string
  name: string
  tagline: string
  blurb: string
  character: string[]
  heroImg: string
}

/** Editorial copy for each area we currently have listings in. Written to
 *  match what is already true in `data.ts` (property types, features,
 *  setting), not invented demographic or market statistics. If a claim
 *  needs a number attached to it (walk score, school rating, population),
 *  it does not belong here: use MARKET NOTES below instead, which computes
 *  its numbers live from real listing data rather than stating any as
 *  fact about the area itself. */
export const NEIGHBORHOODS: Neighborhood[] = [
  {
    slug: 'lekki-phase-1',
    name: 'Lekki Phase 1',
    tagline: 'Gated closes, larger plots',
    blurb: "Lekki Phase 1 is mostly detached duplexes on gated, private closes, the kind of streets with a security post at the entrance. Plots here tend to be larger than average, which is why it's where you'll find compounds big enough for a pool rather than a courtyard.",
    character: ['Detached duplexes on gated closes', 'Larger-than-average plots', 'Estate security at entry points'],
    heroImg: 'photo-1762811054947-605b20298615',
  },
  {
    slug: 'ikoyi',
    name: 'Ikoyi',
    tagline: 'High-rise, waterfront',
    blurb: "Ikoyi is the high-rise part of town: towers along the waterfront with concierge desks and residents' amenities in the building rather than the street. It suits people who want lock-up-and-leave living over a garden.",
    character: ['High-rise apartment towers', 'Building amenities (concierge, gym, terrace)', 'Waterfront aspect'],
    heroImg: 'photo-1564078516393-cf04bd966897',
  },
  {
    slug: 'ikeja-gra',
    name: 'Ikeja GRA',
    tagline: 'Colonial-era bungalows, tree-lined',
    blurb: "Ikeja GRA is a low-density, tree-lined layout built up around colonial-era bungalows, so plots are generous and a lot of original detail survives indoors: louvre windows, wide verandas, high ceilings. Extensions and updates happen carefully here, not wholesale.",
    character: ['Colonial-era bungalow housing', 'Tree-lined, low-density layout', 'Period features common indoors'],
    heroImg: 'photo-1721815693498-cc28507c0ba2',
  },
  {
    slug: 'victoria-island',
    name: 'Victoria Island',
    tagline: 'Mixed high-rise and low-rise, central',
    blurb: "Victoria Island mixes commercial towers with pockets of low-rise residential blocks, some with their own small gardens rather than a shared one. It's a popular choice for renters who want to be close to the business district and still find a pet-friendly building.",
    character: ['Mix of high-rise and low-rise blocks', 'Central, close to the business district', 'Occasional ground-floor gardens'],
    heroImg: 'photo-1691272477702-0a2edae135f2',
  },
  {
    slug: 'maitama',
    name: 'Maitama',
    tagline: 'New-build, architect-designed',
    blurb: "Maitama is Abuja's premium diplomatic district: newer construction on larger plots, mostly architect-commissioned rather than developer-built in bulk. Houses here are more likely to have been designed for one family specifically than adapted from an older layout.",
    character: ['Architect-designed new builds', 'Larger plots (half-acre and up)', 'Purpose-built rather than converted'],
    heroImg: 'photo-1757356657991-c3fd6e2e812e',
  },
  {
    slug: 'wuse-2',
    name: 'Wuse 2',
    tagline: 'Central, well served, compact',
    blurb: "Wuse 2's housing stock leans toward compact apartments and studios close to the district's shopping streets and the Central Business District. It sits close to major arterial roads, which is most of why smaller lets are concentrated here first.",
    character: ['Compact apartments and studios', 'Close to shopping and the CBD', 'Well served by major roads'],
    heroImg: 'photo-1685514823717-7e1ff6ee0563',
  },
]

export function listingsIn(suburb: string): Listing[] {
  return LISTINGS.filter(l => l.suburb === suburb)
}

export function priceRange(listings: Listing[], type: 'sale' | 'rent'): { min: number; max: number } | null {
  const prices = listings.filter(l => l.type === type).map(l => l.price)
  if (prices.length === 0) return null
  return { min: Math.min(...prices), max: Math.max(...prices) }
}
