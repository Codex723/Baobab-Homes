import { Link } from 'react-router-dom'
import { C } from '../lib/theme'
import { I } from '../lib/icons'
import { img, useMobile } from '../lib/utils'
import { NEIGHBORHOODS, listingsIn } from '../lib/content'
import { usePageTitle } from '../lib/usePageTitle'

export function NeighborhoodsPage() {
  usePageTitle('Neighborhood guides', {
    description: 'Editorial guides for the areas Baobab Homes covers across Lagos and Abuja, written from the housing stock itself rather than a generic checklist.',
    path: '/app/neighborhoods',
  })
  const mob = useMobile()

  return (
    <div style={{ maxWidth: 1360, margin: '0 auto', padding: mob ? '24px 16px' : '48px 40px' }}>
      <div style={{ maxWidth: 640, marginBottom: mob ? 28 : 40 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.terra, marginBottom: 10 }}>Guides</div>
        <h1 style={{ fontFamily: C.display, fontSize: mob ? 30 : 40, fontWeight: 600, color: C.ink, lineHeight: 1.1, marginBottom: 12 }}>Areas we cover</h1>
        <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.75 }}>
          What each area is actually like to live in, based on the housing stock itself rather than a generic
          checklist. No borrowed statistics, just what we know from the properties we list there.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
        {NEIGHBORHOODS.map(n => {
          const count = listingsIn(n.name).length
          return (
            <Link key={n.slug} to={`/app/neighborhoods/${n.slug}`} style={{ textDecoration: 'none', color: 'inherit', background: C.white, borderRadius: C.r, overflow: 'hidden', boxShadow: C.sh0, transition: 'box-shadow 0.2s, transform 0.18s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = C.sh1; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = C.sh0; e.currentTarget.style.transform = 'none' }}
            >
              <div style={{ height: 160, background: C.sand, overflow: 'hidden' }}>
                <img src={img(n.heroImg, 560, 320)} alt={n.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 18 }}>
                <h2 style={{ fontFamily: C.display, fontSize: 19, fontWeight: 600, color: C.ink, marginBottom: 3 }}>{n.name}</h2>
                <div style={{ fontSize: 12, color: C.terra, fontWeight: 500, marginBottom: 10 }}>{n.tagline}</div>
                <p style={{ fontSize: 12.5, color: C.stone, lineHeight: 1.65, marginBottom: 12 }}>{n.blurb.slice(0, 108)}&hellip;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: C.stone, paddingTop: 12, borderTop: `1px solid ${C.sand}` }}>
                  <span>{count} active {count === 1 ? 'listing' : 'listings'}</span>
                  <span style={{ marginLeft: 'auto', color: C.terra, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>Read guide <I.ChevR s={11} /></span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div style={{ marginTop: mob ? 28 : 40, padding: mob ? '20px' : '24px 28px', background: C.white, borderRadius: C.r, boxShadow: C.sh0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: C.display, fontSize: 17, fontWeight: 600, color: C.ink, marginBottom: 3 }}>Looking for numbers instead of a narrative?</div>
          <div style={{ fontSize: 12.5, color: C.stone }}>Market notes breaks down current listings by price, type, and area.</div>
        </div>
        <Link to="/app/market-notes" style={{ textDecoration: 'none', flexShrink: 0, background: C.ink, color: C.white, padding: '10px 20px', borderRadius: C.r, fontSize: 13, fontWeight: 600, fontFamily: C.sans }}>View market notes</Link>
      </div>
    </div>
  )
}
