import { useEffect, useRef, useState } from 'react'
import { C } from '../lib/theme'
import { I } from '../lib/icons'
import { img, fmt, useMobile } from '../lib/utils'
import { LISTINGS } from '../lib/data'
import { useAppNav } from '../lib/nav'
import { useAppState } from '../context/AppState'
import { usePageTitle } from '../lib/usePageTitle'
import { useGoogleMaps } from '../lib/googleMaps'
import type { Mode } from '../lib/types'

// Google Maps JS types aren't installed as a dependency (this project has
// no other Google-specific packages), so the map/marker/info-window
// instances are held as `any`. Everything else on the page stays typed.
/* eslint-disable @typescript-eslint/no-explicit-any */

export function MapPage() {
  usePageTitle('Map view', {
    description: 'Explore verified properties for sale and rent across Lagos and Abuja on an interactive live map with custom markers and a property sidebar.',
    path: '/app/map',
  })
  const nav = useAppNav()
  const { mode, setMode } = useAppState()
  const mob = useMobile()
  const status = useGoogleMaps()
  const [sel, setSel] = useState<string | null>(null)

  const mapDiv = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<Record<string, any>>({})
  const infoWinRef = useRef<any>(null)

  const pins = LISTINGS.filter(l => l.type === (mode === 'buy' ? 'sale' : 'rent'))
  const selL = pins.find(l => l.id === sel)

  // Create the map once the JS API has loaded.
  useEffect(() => {
    if (status !== 'ready' || !mapDiv.current || mapRef.current) return
    const google = (window as any).google
    mapRef.current = new google.maps.Map(mapDiv.current, {
      center: { lat: 8.2, lng: 6.5 }, // roughly between Lagos and Abuja until markers fit the view
      zoom: 6,
      mapTypeControl: true,
      mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, position: google.maps.ControlPosition.TOP_LEFT },
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
      mapTypeId: 'roadmap',
    })
    infoWinRef.current = new google.maps.InfoWindow()
  }, [status])

  // Redraw markers whenever the buy/rent filter changes, and fit the map
  // to whatever is currently showing.
  useEffect(() => {
    if (status !== 'ready' || !mapRef.current) return
    const google = (window as any).google
    Object.values(markersRef.current).forEach((m: any) => m.setMap(null))
    markersRef.current = {}

    const bounds = new google.maps.LatLngBounds()
    pins.forEach(l => {
      const marker = new google.maps.Marker({
        position: { lat: l.lat, lng: l.lng },
        map: mapRef.current,
        title: l.title,
        icon: {
          path: 'M12 0C7 0 3 4 3 9c0 6.5 9 15 9 15s9-8.5 9-15c0-5-4-9-9-9z',
          fillColor: C.terra,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 1.5,
          scale: 1.5,
          anchor: new google.maps.Point(12, 24),
        },
      })
      marker.addListener('click', () => setSel(l.id))
      markersRef.current[l.id] = marker
      bounds.extend({ lat: l.lat, lng: l.lng })
    })

    if (pins.length > 0) mapRef.current.fitBounds(bounds, 60)
  }, [status, mode]) // eslint-disable-line react-hooks/exhaustive-deps

  // Pan to and highlight whichever listing is selected (from a marker
  // click or a click in the side panel), and show its info window.
  useEffect(() => {
    if (status !== 'ready' || !mapRef.current || !selL) return
    mapRef.current.panTo({ lat: selL.lat, lng: selL.lng })
    if (mapRef.current.getZoom() < 13) mapRef.current.setZoom(13)
    const marker = markersRef.current[selL.id]
    if (marker && infoWinRef.current) {
      infoWinRef.current.setContent(
        `<div style="font-family:${C.sans};min-width:170px">` +
        `<div style="font-family:${C.display};font-size:14px;font-weight:600;color:${C.ink};margin-bottom:2px">${fmt(selL)}</div>` +
        `<div style="font-size:11.5px;color:${C.ink};margin-bottom:2px">${selL.title}</div>` +
        `<div style="font-size:10.5px;color:${C.stone}">${selL.suburb}</div>` +
        `</div>`
      )
      infoWinRef.current.open({ map: mapRef.current, anchor: marker })
    }
  }, [status, selL]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ height: 'calc(100vh - 58px)', display: mob ? 'block' : 'flex', overflow: 'hidden' }}>
      {/* Map */}
      <div style={{ flex: 1, position: 'relative', background: C.sand, overflow: 'hidden', height: mob ? 340 : '100%' }}>
        <div ref={mapDiv} style={{ width: '100%', height: '100%' }} />

        {status !== 'ready' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.sand, textAlign: 'center', padding: 24 }}>
            {status === 'loading' ? (
              <div style={{ fontSize: 13, color: C.stone }}>Loading map...</div>
            ) : (
              <div style={{ maxWidth: 360 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.ink, marginBottom: 6 }}>Map couldn't load</div>
                <div style={{ fontSize: 12.5, color: C.stone, lineHeight: 1.6 }}>Check that a valid Google Maps API key is set in the site's environment configuration (VITE_GOOGLE_MAPS_API_KEY).</div>
              </div>
            )}
          </div>
        )}

        {/* Mode toggle, sits above the map */}
        <div style={{ position: 'absolute', top: 14, right: 14, background: C.white, borderRadius: C.r, overflow: 'hidden', boxShadow: C.sh1, display: 'flex', zIndex: 5 }}>
          {(['buy', 'rent'] as Mode[]).map(m => (
            <button key={m} onClick={() => { setMode(m); setSel(null) }} style={{ border: 'none', background: mode === m ? C.ink : 'none', cursor: 'pointer', padding: '8px 16px', fontSize: 12, fontWeight: 600, color: mode === m ? C.white : C.stone, fontFamily: C.sans, transition: 'all 0.13s' }}>
              {m === 'buy' ? 'For sale' : 'To rent'}
            </button>
          ))}
        </div>
      </div>

      {/* Panel */}
      <div style={{ width: mob ? '100%' : 360, height: mob ? 'calc(100vh - 398px)' : '100%', overflowY: 'auto', background: C.ground, borderLeft: mob ? 'none' : `1px solid ${C.sand}`, padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.stone, marginBottom: 4, paddingBottom: 10, borderBottom: `1px solid ${C.sand}` }}>{pins.length} properties &middot; live map</div>
        {pins.map(l => (
          <div key={l.id} onClick={() => setSel(l.id === sel ? null : l.id)} style={{ background: C.white, borderRadius: C.r, overflow: 'hidden', boxShadow: sel === l.id ? C.sh1 : C.sh0, cursor: 'pointer', border: `1.5px solid ${sel === l.id ? C.terra : 'transparent'}`, display: 'flex', transition: 'all 0.15s' }}>
            <img src={img(l.img, 180, 130)} alt={l.title} style={{ width: 84, objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ padding: '9px 11px', flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: C.display, fontSize: 14, fontWeight: 600, color: C.ink }}>{fmt(l)}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 1 }}>{l.title}</div>
              <div style={{ fontSize: 10, color: C.stone, marginBottom: 5, display: 'flex', alignItems: 'center', gap: 3 }}><I.Pin s={9} />{l.suburb}</div>
              <div style={{ display: 'flex', gap: 7, fontSize: 10, color: C.stone, marginBottom: sel === l.id ? 8 : 0 }}>
                <span>{l.beds === 0 ? 'Studio' : `${l.beds}bd`}</span>
                <span>{l.baths}ba</span>
                <span>{l.sqm}sqm</span>
              </div>
              {sel === l.id && (
                <button onClick={e => { e.stopPropagation(); nav('detail', { lid: l.id }) }} style={{ width: '100%', background: C.terra, color: C.white, border: 'none', cursor: 'pointer', padding: '7px', borderRadius: C.r, fontSize: 11.5, fontWeight: 600, fontFamily: C.sans }}>View listing</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
