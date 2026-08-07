import { useNavigate } from 'react-router-dom'

// Logical page names used throughout the UI components. Each one maps to
// a real, bookmarkable, server-addressable URL below. This is what makes
// the site a genuine multi-page app rather than a single screen with
// JS-only view-swapping.
export type Page = 'home' | 'search' | 'detail' | 'map' | 'agent' | 'agentDashboard' | 'list' | 'about' | 'neighborhoods' | 'neighborhood' | 'market' | 'contact' | 'privacy' | 'terms' | 'fees'
export type Nav = (page: Page, opts?: { lid?: string; aid?: string; slug?: string }) => void

export const ROUTES: Record<Page, (opts?: { lid?: string; aid?: string; slug?: string }) => string> = {
  home: () => '/app',
  search: () => '/app/search',
  detail: (opts) => `/app/listing/${opts?.lid ?? ''}`,
  map: () => '/app/map',
  agent: (opts) => `/app/agent/${opts?.aid ?? ''}`,
  agentDashboard: (opts) => `/app/agent/${opts?.aid ?? ''}/dashboard`,
  list: () => '/app/list-property',
  about: () => '/',
  neighborhoods: () => '/app/neighborhoods',
  neighborhood: (opts) => `/app/neighborhoods/${opts?.slug ?? ''}`,
  market: () => '/app/market-notes',
  contact: () => '/app/contact',
  privacy: () => '/app/privacy',
  terms: () => '/app/terms',
  fees: () => '/app/fees',
}

/** Turns a logical page + options into real browser navigation (pushes a
 *  real URL, so back/forward, refresh, and bookmarking all work). */
export function useAppNav(): Nav {
  const navigate = useNavigate()
  return (page, opts) => {
    navigate(ROUTES[page](opts))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
