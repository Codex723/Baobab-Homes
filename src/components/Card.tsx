import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Listing } from '../lib/types'
import { C } from '../lib/theme'
import { I } from '../lib/icons'
import { fmt, img, useMobile } from '../lib/utils'

interface CardProps {
  l: Listing
  saved: Set<string>
  save: (id: string) => void
  hero?: boolean
}

export function Card({ l, saved, save, hero = false }: CardProps) {
  const mob = useMobile()
  const [hov, setHov] = useState(false)
  const on = saved.has(l.id)
  const beds = l.beds === 0 ? 'Studio' : `${l.beds} bd`
  const linkStyle = { textDecoration: 'none', color: 'inherit' } as const

  if (hero) {
    return (
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ background: C.white, borderRadius: C.r, overflow: 'hidden', boxShadow: hov ? C.sh1 : C.sh0, transition: 'box-shadow 0.2s, transform 0.2s', transform: hov ? 'translateY(-1px)' : 'none', display: 'flex', flexDirection: mob ? 'column' : 'row', height: mob ? 'auto' : 260 }}
      >
        <Link to={`/app/listing/${l.id}`} style={{ ...linkStyle, width: mob ? '100%' : '54%', height: mob ? 220 : 'auto', position: 'relative', background: C.sand, overflow: 'hidden', flexShrink: 0, display: 'block' }}>
          <img src={img(l.img, 800, 520)} alt={l.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s', transform: hov ? 'scale(1.04)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 5 }}>
            {l.verified && <span style={{ background: C.ink, color: C.white, fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: C.r, display: 'flex', alignItems: 'center', gap: 3, letterSpacing: '0.03em' }}><I.Check s={10} />Verified</span>}
            {l.tag && <span style={{ background: C.terra, color: C.white, fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: C.r }}>{l.tag}</span>}
          </div>
        </Link>
        <div style={{ flex: 1, padding: mob ? '18px 16px' : '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Link to={`/app/listing/${l.id}`} style={linkStyle}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.terra, marginBottom: 8 }}>{l.kind} · {l.type === 'sale' ? 'For sale' : 'To rent'}</div>
            <div style={{ fontFamily: C.display, fontSize: mob ? 22 : 26, fontWeight: 600, color: C.ink, lineHeight: 1.15, marginBottom: 4 }}>{fmt(l)}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: C.ink, marginBottom: 3 }}>{l.title}</div>
            <div style={{ fontSize: 12, color: C.stone, display: 'flex', alignItems: 'center', gap: 3 }}><I.Pin s={11} />{l.address}, {l.suburb}</div>
          </Link>
          <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${C.sand}`, flexWrap: 'wrap' }}>
              {[{ ico: <I.Bed s={13} />, v: beds }, { ico: <I.Bath s={13} />, v: `${l.baths} ba` }, { ico: <I.Area s={13} />, v: `${l.sqm} sqm` }, ...(l.parking > 0 ? [{ ico: <I.Car s={13} />, v: `${l.parking} parking` }] : [])].map((s, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: C.stone }}>{s.ico}{s.v}</span>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: C.stone }}>Listed {l.listed} · Ref {l.ref}</span>
              <button onClick={() => save(l.id)} aria-label={on ? 'Remove from saved' : 'Save listing'} style={{ border: 'none', background: on ? '#fdf0ea' : C.ground, cursor: 'pointer', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <I.Heart s={14} on={on} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: C.white, borderRadius: C.r, overflow: 'hidden', boxShadow: hov ? C.sh1 : C.sh0, transition: 'box-shadow 0.2s, transform 0.18s', transform: hov ? 'translateY(-2px)' : 'none' }}>
      <div style={{ position: 'relative', height: 200, background: C.sand, overflow: 'hidden' }}>
        <Link to={`/app/listing/${l.id}`} style={{ ...linkStyle, display: 'block', width: '100%', height: '100%' }}>
          <img src={img(l.img, 560, 400)} alt={l.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.32s', transform: hov ? 'scale(1.04)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 5 }}>
            {l.verified && <span style={{ background: C.ink, color: C.white, fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: C.r, display: 'flex', alignItems: 'center', gap: 3 }}><I.Check s={9} />Verified</span>}
            {l.tag && <span style={{ background: C.terra, color: C.white, fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: C.r }}>{l.tag}</span>}
          </div>
          <span style={{ position: 'absolute', bottom: 8, left: 10, background: 'rgba(15,30,23,0.55)', color: C.white, fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: C.r }}>{l.kind}</span>
        </Link>
        <button onClick={() => save(l.id)} aria-label={on ? 'Remove from saved' : 'Save listing'} style={{ position: 'absolute', top: 8, right: 8, background: on ? 'rgba(192,86,40,0.12)' : 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          <I.Heart s={14} on={on} />
        </button>
      </div>
      <Link to={`/app/listing/${l.id}`} style={{ ...linkStyle, display: 'block', padding: '14px 14px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
          <div style={{ fontFamily: C.display, fontSize: 20, fontWeight: 600, color: C.ink, lineHeight: 1.1 }}>{fmt(l)}</div>
          <div style={{ fontSize: 9, color: C.stone, paddingTop: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{l.type === 'rent' ? 'Per year' : 'Sale'}</div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 500, color: C.ink, marginBottom: 2 }}>{l.title}</div>
        <div style={{ fontSize: 11, color: C.stone, display: 'flex', alignItems: 'center', gap: 3, marginBottom: 11 }}><I.Pin s={10} />{l.suburb}</div>
        <div style={{ display: 'flex', gap: 10, paddingTop: 10, borderTop: `1px solid ${C.sand}`, color: C.stone, fontSize: 11 }}>
          {[{ ico: <I.Bed s={12} />, v: beds }, { ico: <I.Bath s={12} />, v: `${l.baths} ba` }, { ico: <I.Area s={12} />, v: `${l.sqm} sqm` }, ...(l.parking > 0 ? [{ ico: <I.Car s={12} />, v: `${l.parking}` }] : [])].map((s, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>{s.ico}{s.v}</span>
          ))}
        </div>
      </Link>
    </div>
  )
}