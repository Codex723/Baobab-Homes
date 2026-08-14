import { useState } from 'react'
import { C, BRAND } from '../lib/theme'
import { I } from '../lib/icons'
import { img, fmt, useMobile } from '../lib/utils'
import { AGENTS, LISTINGS } from '../lib/data'
import { NEIGHBORHOODS } from '../lib/content'
import { Card } from '../components/Card'
import { useAppNav } from '../lib/nav'
import { useAppState } from '../context/AppState'
import { usePageTitle } from '../lib/usePageTitle'
import type { Mode } from '../lib/types'

export function HomePage() {
  usePageTitle('Find your next home', {
    description: 'Browse verified homes and apartments for sale and rent across Lagos and Abuja. Search by area, price, or agent with no sign-up required.',
    path: '/app',
  })
  const nav = useAppNav()
  const { mode, setMode, saved, save } = useAppState()
  const mob = useMobile()
  const [loc, setLoc] = useState('')
  const [ptype, setPtype] = useState('Any type')
  const [beds, setBeds] = useState('Any')

  return (
    <div>
      {/* HERO: split layout */}
      <section style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', minHeight: mob ? 'auto' : '90vh' }}>
        {/* Left: dark panel */}
        <div style={{ background: C.ink, padding: mob ? '52px 24px 40px' : '0 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,242,236,0.45)', marginBottom: 24 }}>Verified listings, reviewed before they go live</p>
          <h1 style={{ fontFamily: C.display, fontSize: mob ? 42 : 62, fontWeight: 600, color: C.ground, lineHeight: 1.05, marginBottom: 20, letterSpacing: '-1px' }}>
            Find where<br /><em style={{ fontStyle: 'italic', fontWeight: 300 }}>you live</em><br />next.
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(245,242,236,0.58)', lineHeight: 1.75, marginBottom: 36, maxWidth: 380 }}>
            Search verified listings by area, price, or agent. No sign-up required to browse.
          </p>

          {/* Search widget */}
          <div style={{ background: C.ground, borderRadius: C.r, overflow: 'hidden', maxWidth: 520 }}>
            {/* Buy/Rent */}
            <div style={{ display: 'flex', borderBottom: `1px solid ${C.sand}` }}>
              {(['buy', 'rent'] as Mode[]).map(m => (
                <button key={m} onClick={() => setMode(m)} style={{ flex: 1, border: 'none', cursor: 'pointer', padding: '11px 0', fontSize: 13, fontWeight: 600, fontFamily: C.sans, background: mode === m ? C.white : 'none', color: mode === m ? C.ink : C.stone, borderBottom: mode === m ? `2px solid ${C.terra}` : '2px solid transparent', transition: 'all 0.13s', textTransform: 'capitalize' }}>
                  {m === 'buy' ? 'For sale' : 'To rent'}
                </button>
              ))}
            </div>
            {/* Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: `1px solid ${C.sand}`, gap: 10 }}>
                <I.Pin s={14} />
                <input value={loc} onChange={e => setLoc(e.target.value)} placeholder="Suburb, area, or landmark" style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontFamily: C.sans, color: C.ink, background: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row' }}>
                <div style={{ display: 'flex' }}>
                  <select value={ptype} onChange={e => setPtype(e.target.value)} style={{ flex: 1, border: 'none', borderRight: `1px solid ${C.sand}`, outline: 'none', padding: '11px 14px', fontSize: 13, fontFamily: C.sans, color: C.stone, background: 'none', cursor: 'pointer', width: '100%', boxSizing: 'border-box' as const }}>
                    {['Any type', 'Detached Duplex', 'Semi-Detached Duplex', 'Terraced Duplex', 'Detached Bungalow', 'Apartment', 'Studio Apartment', 'Land'].map(t => <option key={t}>{t}</option>)}
                  </select>
                  <select value={beds} onChange={e => setBeds(e.target.value)} style={{ flex: 1, border: 'none', borderRight: `1px solid ${C.sand}`, outline: 'none', padding: '11px 14px', fontSize: 13, fontFamily: C.sans, color: C.stone, background: 'none', cursor: 'pointer', width: '100%', boxSizing: 'border-box' as const }}>
                    {['Any beds', 'Studio', '1+', '2+', '3+', '4+', '5+'].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <button onClick={() => nav('search')} style={{ background: C.terra, color: C.white, border: 'none', cursor: 'pointer', padding: mob ? '12px 20px' : '11px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, fontWeight: 600, fontFamily: C.sans, transition: 'background 0.13s', flexShrink: 0, borderTop: mob ? `1px solid ${C.sand}` : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = C.terraD}
                  onMouseLeave={e => e.currentTarget.style.background = C.terra}
                >
                  <I.Search s={14} />
                  {mob ? 'Search properties' : 'Search'}
                </button>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
            {['Lekki Phase 1', 'Ikoyi', 'Maitama', 'Victoria Island'].map(n => (
              <button key={n} onClick={() => nav('search')} style={{ border: `1px solid rgba(245,242,236,0.18)`, background: 'rgba(245,242,236,0.07)', cursor: 'pointer', padding: '5px 11px', borderRadius: C.r, fontSize: 11, color: 'rgba(245,242,236,0.55)', fontFamily: C.sans, transition: 'all 0.13s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,242,236,0.13)'; e.currentTarget.style.color = 'rgba(245,242,236,0.85)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,242,236,0.07)'; e.currentTarget.style.color = 'rgba(245,242,236,0.55)' }}
              >{n}</button>
            ))}
          </div>
        </div>

        {/* Right: hero image + featured card */}
        {!mob && (
          <div style={{ position: 'relative', overflow: 'hidden', background: C.sand }}>
            <img src={img('photo-1757356657991-c3fd6e2e812e', 1200, 1200)} alt="Contemporary luxury home at dusk with illuminated pool" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,30,23,0.65) 0%, transparent 45%)' }} />
            {/* Floating featured card */}
            <div style={{ position: 'absolute', bottom: 32, left: 28, right: 28 }}>
              <div style={{ background: 'rgba(245,242,236,0.97)', backdropFilter: 'blur(12px)', borderRadius: C.r, padding: '16px 18px', boxShadow: C.sh2, cursor: 'pointer' }} onClick={() => nav('detail', { lid: 'L1' })}>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.terra, marginBottom: 6 }}>Featured · New listing</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: C.display, fontSize: 22, fontWeight: 600, color: C.ink, marginBottom: 2 }}>{fmt(LISTINGS[0])}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: C.ink, marginBottom: 1 }}>{LISTINGS[0].title}</div>
                    <div style={{ fontSize: 11, color: C.stone, display: 'flex', alignItems: 'center', gap: 3 }}><I.Pin s={10} />{LISTINGS[0].address}, {LISTINGS[0].suburb}</div>
                  </div>
                  <div style={{ width: 72, height: 52, borderRadius: C.r, overflow: 'hidden', background: C.sand, flexShrink: 0 }}>
                    <img src={img('photo-1762811054947-605b20298615', 144, 104)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.sand}`, fontSize: 11, color: C.stone }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><I.Bed s={11} />{LISTINGS[0].beds} bd</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><I.Bath s={11} />{LISTINGS[0].baths} ba</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><I.Area s={11} />{LISTINGS[0].sqm} sqm</span>
                  <span style={{ marginLeft: 'auto', color: C.terra, fontWeight: 600, cursor: 'pointer' }}>View →</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Trust strip: no invented numbers, just what the platform actually does */}
      <div style={{ background: C.terra, padding: mob ? '20px 24px' : '18px 72px' }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', display: 'flex', gap: mob ? 20 : 40, flexWrap: 'wrap' }}>
          {['Every listing checked before publishing', 'Licensed agents only', 'No fees for buyers or renters to browse'].map(l => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.9)' }}>
              <I.Check s={13} />
              <span style={{ fontSize: 12 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Latest listings */}
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: mob ? '40px 20px' : '64px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: C.display, fontSize: mob ? 24 : 32, fontWeight: 600, color: C.ink, marginBottom: 4 }}>Latest listings</h2>
            <p style={{ fontSize: 12, color: C.stone }}>All current neighbourhoods</p>
          </div>
          <button onClick={() => nav('search')} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: C.terra, fontFamily: C.sans, display: 'flex', alignItems: 'center', gap: 4 }}>View all <I.ChevR /></button>
        </div>

        {/* Hero card */}
        <div style={{ marginBottom: 16 }}>
          <Card l={LISTINGS[0]} saved={saved} save={save} hero />
        </div>

        {/* 5-card grid */}
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
          {LISTINGS.slice(1).map(l => <Card key={l.id} l={l} saved={saved} save={save} />)}
        </div>
      </div>

      {/* Browse by area */}
      <div style={{ background: C.sand, padding: mob ? '40px 20px' : '52px 40px' }}>
        <div style={{ maxWidth: 1360, margin: '0 auto' }}>
          <h2 style={{ fontFamily: C.display, fontSize: mob ? 22 : 26, fontWeight: 600, color: C.ink, marginBottom: 6 }}>Browse by neighbourhood</h2>
          <p style={{ fontSize: 12, color: C.stone, marginBottom: 22 }}>{NEIGHBORHOODS.length} areas. Filter by suburb, price band, or property type.</p>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {NEIGHBORHOODS.map(nb => [nb.name, nb.heroImg] as const).map(([name, photoId]) => (
              <button key={name} onClick={() => nav('search')} style={{ flexShrink: 0, border: 'none', padding: 0, cursor: 'pointer', background: 'none', width: mob ? 130 : 160 }}>
                <div style={{ height: mob ? 90 : 110, borderRadius: C.r, overflow: 'hidden', background: C.sandD, marginBottom: 8, position: 'relative' }}>
                  <img src={img(photoId, 320, 220)} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,30,23,0.25)' }} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.ink, textAlign: 'left' }}>{name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Agents preview */}
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: mob ? '40px 20px' : '64px 40px', display: mob ? 'block' : 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div style={{ marginBottom: mob ? 32 : 0 }}>
          <h2 style={{ fontFamily: C.display, fontSize: mob ? 24 : 32, fontWeight: 600, color: C.ink, marginBottom: 12, lineHeight: 1.15 }}>Work with an agent who knows the street</h2>
          <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.75, marginBottom: 24 }}>Every {BRAND} agent is independently licensed with LASRERA or ESVARBON, carries verifiable transaction history, and works a defined patch. No cold-call teams. No generic property advice.</p>
          <button onClick={() => nav('agent', { aid: AGENTS[0].id })} style={{ background: C.ink, color: C.white, border: 'none', cursor: 'pointer', padding: '11px 22px', borderRadius: C.r, fontSize: 13, fontWeight: 600, fontFamily: C.sans, transition: 'background 0.13s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#1d3528'}
            onMouseLeave={e => e.currentTarget.style.background = C.ink}
          >Meet our agents</button>
        </div>
        <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 14 }}>
          {AGENTS.map(a => (
            <div key={a.id} onClick={() => nav('agent', { aid: a.id })} style={{ flex: 1, background: C.white, borderRadius: C.r, overflow: 'hidden', boxShadow: C.sh0, cursor: 'pointer', transition: 'box-shadow 0.18s, transform 0.18s', display: mob ? 'flex' : 'block' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = C.sh1; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = C.sh0; (e.currentTarget as HTMLDivElement).style.transform = 'none' }}
            >
              <img src={img(a.img, 220, 200)} alt={a.name} style={{ width: mob ? 80 : '100%', height: mob ? 80 : 120, objectFit: 'cover', objectPosition: 'top', flexShrink: 0 }} />
              <div style={{ padding: mob ? '10px 12px' : '10px 12px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, marginBottom: 1 }}>{a.name}</div>
                <div style={{ fontSize: 10, color: C.stone, marginBottom: 4 }}>{a.role}</div>
                <div style={{ fontSize: 11, color: C.terra, fontWeight: 500 }}>{a.office}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing CTA, no invented reviews or scores here */}
      <div style={{ background: C.ink, padding: mob ? '48px 20px' : '64px 40px' }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', display: mob ? 'block' : 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <div style={{ marginBottom: mob ? 20 : 0 }}>
            <h2 style={{ fontFamily: C.display, fontSize: mob ? 22 : 28, fontWeight: 600, color: C.ground, marginBottom: 8 }}>Ready to see a property in person?</h2>
            <p style={{ fontSize: 13, color: 'rgba(245,242,236,0.6)', maxWidth: 480, lineHeight: 1.7 }}>Browse current listings or speak directly with the agent covering your area.</p>
          </div>
          <button onClick={() => nav('search')} style={{ background: C.terra, color: C.white, border: 'none', cursor: 'pointer', padding: '12px 24px', borderRadius: C.r, fontSize: 13, fontWeight: 600, fontFamily: C.sans, flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.background = C.terraD}
            onMouseLeave={e => e.currentTarget.style.background = C.terra}
          >Browse listings</button>
        </div>
      </div>
    </div>
  )
}