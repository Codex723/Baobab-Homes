import { useParams, Link } from 'react-router-dom'
import { C, BRAND } from '../lib/theme'
import { I } from '../lib/icons'
import { img, useMobile } from '../lib/utils'
import { NEIGHBORHOODS, listingsIn, priceRange } from '../lib/content'
import { Card } from '../components/Card'
import { useAppState } from '../context/AppState'
import { usePageTitle } from '../lib/usePageTitle'
import { NotFound } from './NotFoundPage'

function fmtRange(r: { min: number; max: number } | null, type: 'sale' | 'rent') {
  if (!r) return null
  const one = (n: number) => `\u20a6${(n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 2)}M${type === 'rent' ? '/yr' : ''}`
  return r.min === r.max ? one(r.min) : `${one(r.min)}${'\u2013'}${one(r.max)}`
}

export function NeighborhoodPage() {
  const { slug } = useParams()
  const n = NEIGHBORHOODS.find(x => x.slug === slug)
  usePageTitle(n ? n.name : 'Area not found', n ? {
    description: `${n.name}: ${n.tagline}. ${n.blurb.slice(0, 140)}`,
    path: `/app/neighborhoods/${n.slug}`,
  } : undefined)

  if (!n) {
    return <NotFound message="We don't have a guide for that area yet." backTo="home" backLabel="Browse all listings" />
  }
  return <Body n={n} />
}

function Body({ n }: { n: (typeof NEIGHBORHOODS)[number] }) {
  const mob = useMobile()
  const { saved, save } = useAppState()
  const listings = listingsIn(n.name)
  const sale = fmtRange(priceRange(listings, 'sale'), 'sale')
  const rent = fmtRange(priceRange(listings, 'rent'), 'rent')

  return (
    <div>
      <div style={{ height: mob ? 220 : 340, position: 'relative', background: C.sand, overflow: 'hidden' }}>
        <img src={img(n.heroImg, 1600, 700)} alt={n.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,30,23,0) 40%, rgba(15,30,23,0.65) 100%)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, maxWidth: 1360, margin: '0 auto', padding: mob ? '0 16px 20px' : '0 40px 28px', width: '100%', boxSizing: 'border-box' }}>
          <Link to="/app/neighborhoods" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'rgba(255,255,255,0.85)', marginBottom: 10 }}><I.ChevL s={11} />All guides</Link>
          <h1 style={{ fontFamily: C.display, fontSize: mob ? 30 : 44, fontWeight: 600, color: C.white, lineHeight: 1.05 }}>{n.name}</h1>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500, marginTop: 4 }}>{n.tagline}</div>
        </div>
      </div>

      <div style={{ maxWidth: 1360, margin: '0 auto', padding: mob ? '24px 16px 48px' : '40px 40px 64px' }}>
        <div style={{ display: mob ? 'block' : 'grid', gridTemplateColumns: '1fr 320px', gap: 40 }}>
          <div>
            <p style={{ fontSize: 15, color: C.ink, lineHeight: 1.85, marginBottom: 24, maxWidth: 620 }}>{n.blurb}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <h2 style={{ fontFamily: C.display, fontSize: mob ? 20 : 22, fontWeight: 600, color: C.ink }}>Currently listed here</h2>
              <span style={{ fontSize: 11, color: C.stone }}>{listings.length} {listings.length === 1 ? 'property' : 'properties'}</span>
            </div>
            {listings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 32, color: C.stone, background: C.white, borderRadius: C.r }}><div style={{ fontSize: 13 }}>Nothing active in {n.name} right now. Check back soon.</div></div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: 14 }}>
                {listings.map(l => <Card key={l.id} l={l} saved={saved} save={save} />)}
              </div>
            )}
          </div>

          <div>
            <div style={{ background: C.white, borderRadius: C.r, boxShadow: C.sh0, padding: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.stone, marginBottom: 14 }}>At a glance</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {n.character.map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: C.ink, lineHeight: 1.5 }}><I.Check s={13} /><span>{c}</span></div>
                ))}
              </div>
              {(sale || rent) && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.sand}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {sale && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}><span style={{ color: C.stone }}>For sale, current range</span><span style={{ color: C.ink, fontWeight: 600 }}>{sale}</span></div>}
                  {rent && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}><span style={{ color: C.stone }}>To rent, current range</span><span style={{ color: C.ink, fontWeight: 600 }}>{rent}</span></div>}
                </div>
              )}
              <div style={{ fontSize: 10.5, color: C.stone, marginTop: 12, lineHeight: 1.5 }}>Reflects only what's currently listed with {BRAND}, not the wider market.</div>
            </div>
            <Link to={`/app/search?suburb=${encodeURIComponent(n.name)}`} style={{ textDecoration: 'none', display: 'block', textAlign: 'center', background: C.terra, color: C.white, padding: '12px', borderRadius: C.r, fontSize: 13, fontWeight: 600, fontFamily: C.sans }}>Search all of {n.name}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
