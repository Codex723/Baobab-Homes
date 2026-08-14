import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { C, BRAND } from '../lib/theme'
import { I } from '../lib/icons'
import { img, useMobile } from '../lib/utils'
import { AGENTS, LISTINGS } from '../lib/data'
import { NEIGHBORHOODS } from '../lib/content'
import { useAppNav } from '../lib/nav'
import { useAppState } from '../context/AppState'
import { usePageTitle } from '../lib/usePageTitle'
import type { Mode } from '../lib/types'

const FEATURES = [
  {
    n: '01',
    title: 'Search verified listings',
    body: `Every listing on ${BRAND} is checked before it goes live. What you see in the search results is what's actually available, not a placeholder someone forgot to take down.`,
    photo: 'photo-1762811054947-605b20298615',
  },
  {
    n: '02',
    title: 'Talk to the agent who knows the street',
    body: "Each listing is tied to one licensed agent covering that patch, not a call centre. You're talking to someone who has actually walked the compound.",
    photo: 'photo-1564078516393-cf04bd966897',
  },
  {
    n: '03',
    title: 'View it in person, on your terms',
    body: 'Book a viewing directly through the listing. No sign-up wall before you can see a real address, no pressure to commit before you have, no fee before a verified viewing.',
    photo: 'photo-1721815693498-cc28507c0ba2',
  },
]

/** Lightweight scroll-linked parallax: translateY on an image as its section
 *  crosses the viewport. No animation library, just a scroll listener and a
 *  transform. Respects prefers-reduced-motion. */
function useParallax(strength = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const el = ref.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const progress = (vh - rect.top) / (vh + rect.height)
        const y = (progress - 0.5) * 100 * strength
        el.style.transform = `translateY(${y}px) scale(1.15)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [strength])
  return ref
}

/** Nav overlay just for the landing page: transparent over the hero,
 *  solidifies once the user scrolls past it. The rest of the app uses the
 *  standard <Navbar>, hidden here so the hero can run full-bleed. */
function LandingNav({ mob }: { mob: boolean }) {
  const { setMode } = useAppState()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const items: [string, string, Mode | null][] = [
    ['Home', '/app', null],
    ['Buy', '/app/search?type=buy', 'buy'],
    ['Rent', '/app/search?type=rent', 'rent'],
    ['Map', '/app/map', null],
    ['Guides', '/app/neighborhoods', null],
    ['Agents', '/app/agent/a1', null],
    ['Contact', '/app/contact', null],
  ]

  const textCol = solid ? C.ink : C.ground
  const mutedCol = solid ? C.stone : 'rgba(245,242,236,0.75)'

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, background: solid ? 'rgba(245,242,236,0.97)' : 'transparent', backdropFilter: solid ? 'blur(12px)' : 'none', borderBottom: solid ? `1px solid ${C.sand}` : '1px solid transparent', transition: 'background 0.25s, border-color 0.25s' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: mob ? '16px 20px' : '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/app" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M3 12L11 4l8 8" stroke={C.terra} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 10v8a1 1 0 001 1h4v-5h2v5h4a1 1 0 001-1v-8" stroke={textCol} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span style={{ fontFamily: C.display, fontSize: 16, fontWeight: 600, color: textCol, letterSpacing: '-0.3px', transition: 'color 0.25s' }}>{BRAND}</span>
        </Link>

        {!mob ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {items.map(([lbl, to, md]) => (
              <Link key={lbl} to={to} onClick={() => md && setMode(md)} style={{ textDecoration: 'none', padding: '6px 12px', borderRadius: C.r, fontSize: 12.5, fontWeight: 500, color: mutedCol, fontFamily: C.sans, transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = textCol}
                onMouseLeave={e => e.currentTarget.style.color = mutedCol}
              >{lbl}</Link>
            ))}
            <Link to="/app/list-property" style={{ textDecoration: 'none', marginLeft: 10, border: `1.5px solid ${C.terra}`, background: solid ? 'none' : 'rgba(245,242,236,0.08)', padding: '7px 16px', borderRadius: C.r, fontSize: 12.5, fontWeight: 600, color: solid ? C.terra : C.ground, fontFamily: C.sans }}>List a property</Link>
          </div>
        ) : (
          <button onClick={() => setOpen(!open)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: textCol, padding: 4 }} aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <I.X s={20} /> : <I.Menu s={20} />}
          </button>
        )}
      </div>
      {mob && open && (
        <div style={{ background: C.ground, borderTop: `1px solid ${C.sand}`, paddingBottom: 12, maxHeight: 'calc(100vh - 58px)', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
          {items.map(([lbl, to, md]) => (
            <Link key={lbl} to={to} onClick={() => { md && setMode(md); setOpen(false) }} style={{ textDecoration: 'none', display: 'block', padding: '12px 16px', fontSize: 15, fontWeight: 500, color: C.ink, fontFamily: C.sans }}>{lbl}</Link>
          ))}
          <div style={{ padding: '8px 16px 0' }}>
            <Link to="/app/list-property" onClick={() => setOpen(false)} style={{ textDecoration: 'none', display: 'block', textAlign: 'center', background: C.terra, padding: '11px', borderRadius: C.r, fontSize: 14, fontWeight: 600, color: C.white, fontFamily: C.sans, boxSizing: 'border-box' }}>List a property</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export function LandingPage() {
  usePageTitle('Welcome', {
    description: 'Find your next address, not just a listing. Search verified homes for sale and rent across Lagos and Abuja, with licensed agents and no fees to browse.',
    path: '/',
  })
  const nav = useAppNav()
  const mob = useMobile()
  const parallaxRef = useParallax(0.12)
  const stats = [
    { v: String(LISTINGS.length), l: 'Active listings' },
    { v: String(AGENTS.length), l: 'Licensed agents' },
    { v: String(NEIGHBORHOODS.length), l: 'Areas covered' },
    { v: '0', l: 'Fees to browse or enquire' },
  ]

  return (
    <div>
      <LandingNav mob={mob} />

      {/* HERO */}
      <section style={{ position: 'relative', height: mob ? '86vh' : '96vh', overflow: 'hidden', background: C.ink }}>
        <img
          src={img('photo-1762811054947-605b20298615', 1800, 1400)}
          alt="Detached duplex exterior at dusk, Lekki"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,30,23,0.92) 0%, rgba(15,30,23,0.3) 55%, rgba(15,30,23,0.5) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: mob ? '0 20px 56px' : '0 72px 90px' }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,242,236,0.55)', marginBottom: 20 }}>
            Real estate across Lagos and Abuja
          </p>
          <h1 style={{ fontFamily: C.display, fontSize: mob ? 38 : 74, fontWeight: 600, color: C.ground, lineHeight: 1.02, letterSpacing: '-1.5px', maxWidth: 840, marginBottom: 24 }}>
            Find your next<br /><em style={{ fontStyle: 'italic', fontWeight: 300 }}>address,</em> not just a listing.
          </h1>
          <p style={{ fontSize: mob ? 14 : 16, color: 'rgba(245,242,236,0.7)', lineHeight: 1.7, maxWidth: 460, marginBottom: 32 }}>
            Every listing checked before it's published. Every agent licensed with LASRERA or ESVARBON
            and tied to one patch. No fees to browse, no sign-up wall to see a real address.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => nav('search')} style={{ background: C.terra, color: C.white, border: 'none', cursor: 'pointer', padding: '13px 26px', borderRadius: C.r, fontSize: 13, fontWeight: 600, fontFamily: C.sans, display: 'flex', alignItems: 'center', gap: 6 }}
              onMouseEnter={e => e.currentTarget.style.background = C.terraD}
              onMouseLeave={e => e.currentTarget.style.background = C.terra}
            >Browse listings <I.ChevR s={12} /></button>
            <button onClick={() => nav('map')} style={{ background: 'rgba(245,242,236,0.1)', color: C.ground, border: '1px solid rgba(245,242,236,0.25)', cursor: 'pointer', padding: '13px 26px', borderRadius: C.r, fontSize: 13, fontWeight: 600, fontFamily: C.sans }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,242,236,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,242,236,0.1)'}
            >Explore the live map</button>
          </div>
        </div>
      </section>

      {/* AREA FILMSTRIP: horizontal scroll of real neighbourhoods, different
          composition from the grid used on the app home page */}
      <section style={{ background: C.ground, padding: mob ? '48px 0 56px' : '80px 0 92px' }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: mob ? '0 20px' : '0 72px', marginBottom: 24 }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.terra, marginBottom: 10 }}>Where we cover</p>
          <h2 style={{ fontFamily: C.display, fontSize: mob ? 24 : 32, fontWeight: 600, color: C.ink, maxWidth: 560, lineHeight: 1.2 }}>From Lekki to Maitama, an agent who actually knows the street.</h2>
        </div>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: mob ? '0 20px 8px' : '0 72px 8px', scrollSnapType: 'x proximity' }}>
          {NEIGHBORHOODS.map(n => (
            <div key={n.slug} onClick={() => nav('neighborhood', { slug: n.slug })} style={{ flexShrink: 0, width: mob ? 220 : 300, cursor: 'pointer', scrollSnapAlign: 'start' }}>
              <div style={{ height: mob ? 150 : 200, borderRadius: C.r, overflow: 'hidden', marginBottom: 10, position: 'relative' }}>
                <img src={img(n.heroImg, 500, 340)} alt={n.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,30,23,0) 50%, rgba(15,30,23,0.55) 100%)' }} />
                <div style={{ position: 'absolute', left: 12, bottom: 10, right: 12 }}>
                  <div style={{ fontFamily: C.display, fontSize: 17, fontWeight: 600, color: C.white }}>{n.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>{n.tagline}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE CARDS: 3 across, replaces a sticky-scroll layout with a
          simpler grid so the page reads differently section to section */}
      <section style={{ maxWidth: 1360, margin: '0 auto', padding: mob ? '8px 20px 56px' : '8px 40px 100px' }}>
        <div style={{ display: mob ? 'flex' : 'grid', flexDirection: mob ? 'column' : undefined, gridTemplateColumns: 'repeat(3, 1fr)', gap: mob ? 28 : 24 }}>
          {FEATURES.map(f => (
            <div key={f.n}>
              <div style={{ height: mob ? 190 : 230, borderRadius: C.r, overflow: 'hidden', marginBottom: 18, boxShadow: C.sh1 }}>
                <img src={img(f.photo, 640, 480)} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontFamily: C.display, fontSize: 13, color: C.terra, fontWeight: 600 }}>{f.n}</span>
              <h3 style={{ fontFamily: C.display, fontSize: 19, fontWeight: 600, color: C.ink, margin: '8px 0 10px', lineHeight: 1.25 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.75 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VISUAL BREAK: full-width photo, subtle parallax */}
      <section style={{ position: 'relative', height: mob ? '42vh' : '64vh', overflow: 'hidden', background: C.sand }}>
        <div ref={parallaxRef} style={{ position: 'absolute', inset: '-10% 0', willChange: 'transform' }}>
          <img
            src={img('photo-1757356657991-c3fd6e2e812e', 1800, 1000)}
            alt="Contemporary detached duplex exterior, Maitama"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* STATS BAND: real numbers computed from live data, not invented
          market claims */}
      <section style={{ background: C.ink, padding: mob ? '48px 20px' : '72px 40px' }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: mob ? 24 : 32 }}>
          {stats.map(s => (
            <div key={s.l}>
              <div style={{ fontFamily: C.display, fontSize: mob ? 32 : 44, fontWeight: 600, color: C.ground, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 12, color: 'rgba(245,242,236,0.6)', marginTop: 8 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AGENT SPOTLIGHT: horizontal cards, different from the square grid
          used elsewhere on the site */}
      <section style={{ padding: mob ? '56px 20px' : '110px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.terra, marginBottom: 12, textAlign: mob ? 'left' : 'center' }}>The people behind the listings</p>
          <h2 style={{ fontFamily: C.display, fontSize: mob ? 24 : 34, fontWeight: 600, color: C.ink, lineHeight: 1.2, marginBottom: mob ? 24 : 44, textAlign: mob ? 'left' : 'center' }}>
            Licensed agents, each working a defined patch, not a lead queue.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {AGENTS.map(a => (
              <div key={a.id} onClick={() => nav('agent', { aid: a.id })} style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 20, cursor: 'pointer', background: C.white, borderRadius: C.r, overflow: 'hidden', boxShadow: C.sh0, transition: 'box-shadow 0.18s' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = C.sh1}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = C.sh0}
              >
                <div style={{ width: mob ? '100%' : 160, height: mob ? 180 : 160, flexShrink: 0, overflow: 'hidden' }}>
                  <img src={img(a.img, 320, 320)} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div style={{ padding: mob ? '4px 18px 18px' : '18px 22px 18px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: C.ink, marginBottom: 2 }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: C.terra, fontWeight: 500, marginBottom: 8 }}>{a.role} &middot; {a.office}</div>
                  <p style={{ fontSize: 12.5, color: C.stone, lineHeight: 1.7 }}>{a.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA: photo background instead of a flat colour, so the
          page ends on an image again rather than repeating the ink block */}
      <section style={{ position: 'relative', padding: mob ? '64px 20px' : '120px 40px', overflow: 'hidden', textAlign: 'center' }}>
        <img src={img('photo-1721815693498-cc28507c0ba2', 1800, 900)} alt="Bungalow exterior, Ikeja GRA" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,30,23,0.82)' }} />
        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontFamily: C.display, fontSize: mob ? 26 : 38, fontWeight: 600, color: C.ground, marginBottom: 16, lineHeight: 1.2 }}>
            Ready to see a property in person?
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(245,242,236,0.65)', marginBottom: 32, lineHeight: 1.7 }}>
            Browse current listings or speak directly with the agent covering your area.
          </p>
          <button onClick={() => nav('search')} style={{ background: C.terra, color: C.white, border: 'none', cursor: 'pointer', padding: '14px 32px', borderRadius: C.r, fontSize: 14, fontWeight: 600, fontFamily: C.sans }}
            onMouseEnter={e => e.currentTarget.style.background = C.terraD}
            onMouseLeave={e => e.currentTarget.style.background = C.terra}
          >Browse listings</button>
        </div>
      </section>
    </div>
  )
}
