import { useEffect, useState } from 'react'

// Minimal shape of the bits of the Google Maps JS API this app touches.
// Avoids pulling in @types/google.maps just for a handful of calls; the
// actual google.maps.* objects are accessed as `any` in MapPage.tsx.
declare global {
  interface Window {
    google?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

let loadPromise: Promise<void> | null = null

/** Injects the Google Maps JS API script tag once (subsequent calls reuse
 *  the same promise) and resolves once `window.google.maps` is ready. The
 *  key comes from VITE_GOOGLE_MAPS_API_KEY (see .env / .env.example). Maps
 *  JS API keys are meant to be restricted by HTTP referrer in the Google
 *  Cloud Console, not kept secret, so shipping it in client code is normal
 *  here as long as it is restricted to this site's domain(s). */
function loadGoogleMaps(): Promise<void> {
  if (loadPromise) return loadPromise
  loadPromise = new Promise((resolve, reject) => {
    if (window.google?.maps) { resolve(); return }
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
    if (!key) { reject(new Error('missing-key')); return }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&v=weekly&loading=async`
    script.async = true
    script.onerror = () => reject(new Error('load-failed'))
    ;(window as unknown as { __gmapsCallback: () => void }).__gmapsCallback = () => resolve()
    script.src += '&callback=__gmapsCallback'
    document.head.appendChild(script)
  })
  return loadPromise
}

export type MapsStatus = 'loading' | 'ready' | 'error'

export function useGoogleMaps(): MapsStatus {
  const [status, setStatus] = useState<MapsStatus>(window.google?.maps ? 'ready' : 'loading')
  useEffect(() => {
    let cancelled = false
    loadGoogleMaps()
      .then(() => { if (!cancelled) setStatus('ready') })
      .catch(() => { if (!cancelled) setStatus('error') })
    return () => { cancelled = true }
  }, [])
  return status
}
