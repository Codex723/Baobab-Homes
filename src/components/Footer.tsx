import { Link } from 'react-router-dom'
import { C, BRAND } from '../lib/theme'
import { useMobile } from '../lib/utils'

const COLUMNS: [string, [string, string][]][] = [
  ['Explore', [['Buy', '/app/search?type=buy'], ['Rent', '/app/search?type=rent'], ['Map view', '/app/map'], ['List a property', '/app/list-property']]],
  ['Guides', [['Neighborhood guides', '/app/neighborhoods'], ['Market notes', '/app/market-notes']]],
  ['Company', [['Home', '/app'], ['About', '/'], ['Agents', '/app/agent/a1'], ['Contact', '/app/contact']]],
  ['Legal', [['Privacy policy', '/app/privacy'], ['Terms of use', '/app/terms'], ['Fees & commissions', '/app/fees']]],
]

export function Footer() {
  const mob = useMobile()
  return (
    <footer style={{ background: C.ink, borderTop: `1px solid rgba(245,242,236,0.08)`, padding: mob ? '36px 20px 24px' : '48px 40px 28px' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : '1.4fr 1fr 1fr 1fr 1fr', gap: mob ? 24 : 32, marginBottom: 36 }}>
          <div style={mob ? { gridColumn: '1/-1' } : undefined}>
            <div style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: C.ground, marginBottom: 10 }}>{BRAND}</div>
            <p style={{ fontSize: 12, color: 'rgba(245,242,236,0.5)', lineHeight: 1.7, maxWidth: 260 }}>
              Licensed real estate brokerage. Speak to an agent before sending any money or documents. We will never ask you to pay before a verified viewing.
            </p>
          </div>
          {COLUMNS.map(([heading, links]) => (
            <div key={heading}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(245,242,236,0.4)', marginBottom: 14 }}>{heading}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {links.map(([label, to]) => (
                  <Link key={label} to={to} style={{ textDecoration: 'none', fontSize: 13, color: 'rgba(245,242,236,0.7)' }}>{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid rgba(245,242,236,0.08)`, paddingTop: 18, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 11, color: 'rgba(245,242,236,0.35)' }}>
          <span>&copy; {new Date().getFullYear()} {BRAND}. All rights reserved.</span>
          <span>Licensed brokerage &middot; LASRERA / ESVARBON registration on request</span>
        </div>
      </div>
    </footer>
  )
}
