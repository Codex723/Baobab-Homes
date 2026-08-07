import { useState } from 'react'
import { Link } from 'react-router-dom'
import { C, BRAND } from '../lib/theme'
import { I } from '../lib/icons'
import { useMobile } from '../lib/utils'
import { useAppState } from '../context/AppState'
import type { Mode } from '../lib/types'

const NAV_ITEMS: [string, string, Mode | null][] = [
  ['Home', '/app', null],
  ['About', '/', null],
  ['Buy', '/app/search?type=buy', 'buy'],
  ['Rent', '/app/search?type=rent', 'rent'],
  ['Map view', '/app/map', null],
  ['Guides', '/app/neighborhoods', null],
  ['Agents', '/app/agent/a1', null],
]

export function Navbar() {
  const mob = useMobile()
  const [open, setOpen] = useState(false)
  const { setMode } = useAppState()

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(245,242,236,0.96)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.sand}` }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 58 }}>
        <Link to="/app" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 12L11 4l8 8" stroke={C.terra} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 10v8a1 1 0 001 1h4v-5h2v5h4a1 1 0 001-1v-8" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: C.ink, letterSpacing: '-0.3px' }}>{BRAND}</span>
        </Link>

        {!mob ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {NAV_ITEMS.map(([lbl, to, md]) => (
              <Link key={lbl} to={to} onClick={() => md && setMode(md)} style={{ textDecoration: 'none', border: 'none', background: 'none', cursor: 'pointer', padding: '6px 13px', borderRadius: C.r, fontSize: 13, fontWeight: 500, color: C.stone, fontFamily: C.sans, transition: 'color 0.13s, background 0.13s' }}
                onMouseEnter={e => { e.currentTarget.style.color = C.ink; e.currentTarget.style.background = C.sand }}
                onMouseLeave={e => { e.currentTarget.style.color = C.stone; e.currentTarget.style.background = 'none' }}
              >{lbl}</Link>
            ))}
            <div style={{ width: 1, height: 16, background: C.sandD, margin: '0 10px' }} />
            <Link to="/app/list-property" style={{ textDecoration: 'none', border: `1.5px solid ${C.terra}`, background: 'none', cursor: 'pointer', padding: '6px 16px', borderRadius: C.r, fontSize: 13, fontWeight: 600, color: C.terra, fontFamily: C.sans, transition: 'background 0.13s, color 0.13s' }}
              onMouseEnter={e => { e.currentTarget.style.background = C.terra; e.currentTarget.style.color = C.white }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = C.terra }}
            >List a property</Link>
          </div>
        ) : (
          <button onClick={() => setOpen(!open)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: C.ink, padding: 4 }} aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <I.X s={20} /> : <I.Menu s={20} />}
          </button>
        )}
      </div>
      {mob && open && (
        <div style={{ background: C.ground, borderTop: `1px solid ${C.sand}`, paddingBottom: 12 }}>
          {NAV_ITEMS.map(([lbl, to, md]) => (
            <Link key={lbl} to={to} onClick={() => { md && setMode(md); setOpen(false) }} style={{ textDecoration: 'none', display: 'block', width: '100%', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', padding: '12px 24px', fontSize: 15, fontWeight: 500, color: C.ink, fontFamily: C.sans }}>{lbl}</Link>
          ))}
          <div style={{ padding: '8px 24px 0' }}>
            <Link to="/app/list-property" onClick={() => setOpen(false)} style={{ textDecoration: 'none', display: 'block', textAlign: 'center', width: '100%', border: 'none', background: C.terra, cursor: 'pointer', padding: '11px', borderRadius: C.r, fontSize: 14, fontWeight: 600, color: C.white, fontFamily: C.sans, boxSizing: 'border-box' }}>List a property</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
