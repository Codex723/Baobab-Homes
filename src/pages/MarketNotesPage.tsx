import { Link } from 'react-router-dom'
import { C, BRAND } from '../lib/theme'
import { I } from '../lib/icons'
import { useMobile } from '../lib/utils'
import { LISTINGS } from '../lib/data'
import { NEIGHBORHOODS, listingsIn, priceRange } from '../lib/content'
import { usePageTitle } from '../lib/usePageTitle'

function money(n: number, yearly = false) {
  return `\u20a6${(n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 2)}M${yearly ? '/yr' : ''}`
}

export function MarketNotesPage() {
  usePageTitle('Market notes', {
    description: 'Current Baobab Homes listing statistics computed live from the dataset: active counts, sale and rent ranges, verified share, and breakdowns by property type and area.',
    path: '/app/market-notes',
  })
  const mob = useMobile()

  const sale = LISTINGS.filter(l => l.type === 'sale')
  const rent = LISTINGS.filter(l => l.type === 'rent')
  const salePrices = sale.map(l => l.price)
  const rentPrices = rent.map(l => l.price)
  const byKind = Array.from(new Set(LISTINGS.map(l => l.kind))).map(kind => ({
    kind,
    count: LISTINGS.filter(l => l.kind === kind).length,
  })).sort((a, b) => b.count - a.count)
  const verifiedShare = Math.round((LISTINGS.filter(l => l.verified).length / LISTINGS.length) * 100)

  const stat = (label: string, value: string, sub?: string) => (
    <div style={{ background: C.white, borderRadius: C.r, boxShadow: C.sh0, padding: mob ? 16 : 20 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: C.stone, marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: C.display, fontSize: mob ? 22 : 26, fontWeight: 600, color: C.ink, lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11.5, color: C.stone, marginTop: 4 }}>{sub}</div>}
    </div>
  )

  return (
    <div style={{ maxWidth: 1360, margin: '0 auto', padding: mob ? '24px 16px 48px' : '48px 40px 64px' }}>
      <div style={{ maxWidth: 640, marginBottom: mob ? 24 : 36 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.terra, marginBottom: 10 }}>Market notes</div>
        <h1 style={{ fontFamily: C.display, fontSize: mob ? 28 : 38, fontWeight: 600, color: C.ink, lineHeight: 1.1, marginBottom: 12 }}>What's on {BRAND} right now</h1>
        <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.75 }}>
          These numbers are computed directly from our current listings, not pulled from a wider market
          feed. Read this as a snapshot of what we have live today, not a market forecast.
        </p>
      </div>

      {/* Headline stats */}
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 12, marginBottom: mob ? 28 : 40 }}>
        {stat('Active listings', String(LISTINGS.length), `${sale.length} for sale, ${rent.length} to rent`)}
        {stat('Sale price range', salePrices.length ? `${money(Math.min(...salePrices))}${'\u2013'}${money(Math.max(...salePrices))}` : '\u2014')}
        {stat('Rent price range', rentPrices.length ? `${money(Math.min(...rentPrices), true)}${'\u2013'}${money(Math.max(...rentPrices), true)}` : '\u2014')}
        {stat('Verified share', `${verifiedShare}%`, 'of active listings reviewed before publishing')}
      </div>

      <div style={{ display: mob ? 'block' : 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        {/* By property kind */}
        <div style={{ marginBottom: mob ? 28 : 0 }}>
          <h2 style={{ fontFamily: C.display, fontSize: 20, fontWeight: 600, color: C.ink, marginBottom: 14 }}>By property type</h2>
          <div style={{ background: C.white, borderRadius: C.r, boxShadow: C.sh0, overflow: 'hidden' }}>
            {byKind.map((k, i) => (
              <div key={k.kind} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderBottom: i < byKind.length - 1 ? `1px solid ${C.sand}` : 'none' }}>
                <span style={{ fontSize: 13, color: C.ink, fontWeight: 500, width: 110, flexShrink: 0 }}>{k.kind}</span>
                <div style={{ flex: 1, background: C.ground, borderRadius: C.r, height: 8, overflow: 'hidden' }}>
                  <div style={{ width: `${(k.count / LISTINGS.length) * 100}%`, height: '100%', background: C.terra, borderRadius: C.r }} />
                </div>
                <span style={{ fontSize: 12, color: C.stone, width: 20, textAlign: 'right', flexShrink: 0 }}>{k.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* By area */}
        <div>
          <h2 style={{ fontFamily: C.display, fontSize: 20, fontWeight: 600, color: C.ink, marginBottom: 14 }}>By area</h2>
          <div style={{ background: C.white, borderRadius: C.r, boxShadow: C.sh0, overflow: 'hidden' }}>
            {NEIGHBORHOODS.map((n, i) => {
              const local = listingsIn(n.name)
              const s = priceRange(local, 'sale')
              const r = priceRange(local, 'rent')
              return (
                <Link key={n.slug} to={`/app/neighborhoods/${n.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', borderBottom: i < NEIGHBORHOODS.length - 1 ? `1px solid ${C.sand}` : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = C.ground}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: 13, color: C.ink, fontWeight: 500, flexShrink: 0 }}>{n.name}</span>
                  <span style={{ fontSize: 11.5, color: C.stone, textAlign: 'right', flex: 1, minWidth: 0 }}>
                    {local.length === 0 ? 'No active listings' : [s && `${money(s.min)}${s.min !== s.max ? `\u2013${money(s.max)}` : ''} sale`, r && `${money(r.min, true)}${r.min !== r.max ? `\u2013${money(r.max, true)}` : ''} rent`].filter(Boolean).join(' \u00b7 ')}
                  </span>
                  <I.ChevR s={12} />
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ marginTop: mob ? 28 : 40, padding: mob ? '20px' : '24px 28px', background: C.ink, borderRadius: C.r, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: C.display, fontSize: 17, fontWeight: 600, color: C.white, marginBottom: 3 }}>Want the story behind an area, not just the numbers?</div>
          <div style={{ fontSize: 12.5, color: 'rgba(245,242,236,0.65)' }}>Neighborhood guides cover what each area is actually like to live in.</div>
        </div>
        <Link to="/app/neighborhoods" style={{ textDecoration: 'none', flexShrink: 0, background: C.terra, color: C.white, padding: '10px 20px', borderRadius: C.r, fontSize: 13, fontWeight: 600, fontFamily: C.sans }}>Browse guides</Link>
      </div>
    </div>
  )
}
