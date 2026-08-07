import { useState, useEffect } from 'react'
import type { Listing } from './types'

export const img = (id: string, w: number, h: number) => {
  if (id.startsWith('/') || id.startsWith('http://') || id.startsWith('https://')) {
    return id
  }
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`
}

// Nigerian rents are conventionally quoted per annum rather than monthly,
// so rent listings show "/yr" here rather than the "/mo" a US or UK site
// would use.
export function fmt(l: Listing) {
  const naira = l.price >= 1e6 ? `\u20a6${(l.price / 1e6).toFixed(l.price % 1e6 === 0 ? 0 : 2)}M` : `\u20a6${l.price.toLocaleString()}`
  return l.type === 'sale' ? naira : `${naira}/yr`
}

export function useMobile(bp = 768) {
  const [m, set] = useState(() => typeof window !== 'undefined' && window.innerWidth < bp)
  useEffect(() => {
    const fn = () => set(window.innerWidth < bp)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [bp])
  return m
}
