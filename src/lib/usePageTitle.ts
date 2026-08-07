import { useEffect } from 'react'
import { BRAND } from './theme'

const SITE_URL = 'https://baobabhomes.ng'

interface PageMeta {
  description?: string
  path?: string
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Sets a unique <title> per page plus optional per-page meta description,
 *  canonical URL, and Open Graph/Twitter tags. Real, distinct titles per
 *  route matter both for users with many tabs open and for search engines
 *  indexing individual pages. */
export function usePageTitle(title: string, opts?: PageMeta) {
  useEffect(() => {
    const full = title ? `${title} | ${BRAND}` : BRAND
    document.title = full

    if (opts?.description) {
      setMeta('name', 'description', opts.description)
      setMeta('property', 'og:description', opts.description)
      setMeta('name', 'twitter:description', opts.description)
      setMeta('property', 'og:title', full)
      setMeta('name', 'twitter:title', full)
    }

    const url = opts?.path ? `${SITE_URL}${opts.path}` : SITE_URL
    setCanonical(url)
    setMeta('property', 'og:url', url)
  }, [title, opts?.description, opts?.path])
}