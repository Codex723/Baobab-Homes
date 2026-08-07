import { C, BRAND } from '../lib/theme'
import { I } from '../lib/icons'
import { useMobile } from '../lib/utils'
import { useAppNav } from '../lib/nav'
import { usePageTitle } from '../lib/usePageTitle'

const ROWS: [string, string, string][] = [
  ['Selling', 'Agent commission', 'Agreed with your agent as a percentage of the final sale price, confirmed in writing before your listing goes live.'],
  ['Renting (landlord)', 'Letting and management fees', 'Vary by service level, for example a one-off letting fee versus ongoing management. Your agent will set these out before you list.'],
  ['Renting (tenant)', 'Holding deposit and security deposit', 'Set per tenancy and disclosed on the listing or by the agent before you apply. No fee is payable to view a property.'],
  ['Buying', 'No buyer fee', `${BRAND} does not charge buyers to browse listings, contact an agent, or arrange a viewing.`],
]

export function FeesPage() {
  usePageTitle('Fees and commissions', {
    description: 'A plain-language summary of how fees work across buying, selling, and renting through Baobab Homes. No buyer fees to browse or arrange a viewing.',
    path: '/app/fees',
  })
  const mob = useMobile()
  const nav = useAppNav()

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: mob ? '24px 16px 48px' : '48px 40px 64px' }}>
      <div style={{ maxWidth: 640, marginBottom: mob ? 24 : 32 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.terra, marginBottom: 10 }}>Legal</div>
        <h1 style={{ fontFamily: C.display, fontSize: mob ? 28 : 36, fontWeight: 600, color: C.ink, lineHeight: 1.1, marginBottom: 12 }}>Fees and commissions</h1>
        <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.8 }}>
          A plain-language summary of how fees work across buying, selling, and renting through {BRAND}. Exact
          amounts are agreed with your agent and confirmed in writing before you commit to anything, so treat the
          notes below as a guide to what to expect, not a fixed price list.
        </p>
      </div>

      <div style={{ background: C.white, borderRadius: C.r, boxShadow: C.sh0, overflow: 'hidden', marginBottom: 24 }}>
        {ROWS.map(([tag, title, note], i) => (
          <div key={title} style={{ display: mob ? 'block' : 'grid', gridTemplateColumns: '140px 1fr', gap: 16, padding: mob ? '16px 18px' : '18px 22px', borderBottom: i < ROWS.length - 1 ? `1px solid ${C.sand}` : 'none' }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.terra, marginBottom: mob ? 4 : 0 }}>{tag}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.ink, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 13, color: C.stone, lineHeight: 1.7 }}>{note}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: mob ? '16px' : '18px 20px', background: '#fdf0ea', border: `1px solid #f3d3c0`, borderRadius: C.r, marginBottom: 24 }}>
        <div style={{ color: C.terra, flexShrink: 0, marginTop: 1 }}><I.Pin s={16} /></div>
        <div style={{ fontSize: 13, color: C.ink, lineHeight: 1.75 }}>
          Speak to an agent before sending any money or documents. {BRAND} does not process payments through the
          site, and no legitimate fee is ever due before a verified viewing.
        </div>
      </div>

      <div style={{ padding: mob ? '20px' : '24px 28px', background: C.ink, borderRadius: C.r, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: C.display, fontSize: 17, fontWeight: 600, color: C.white, marginBottom: 3 }}>Want fees confirmed for your specific situation?</div>
          <div style={{ fontSize: 12.5, color: 'rgba(245,242,236,0.65)' }}>An agent can walk you through exact costs before you commit to anything.</div>
        </div>
        <button onClick={() => nav('contact')} style={{ textDecoration: 'none', flexShrink: 0, background: C.terra, color: C.white, border: 'none', cursor: 'pointer', padding: '10px 20px', borderRadius: C.r, fontSize: 13, fontWeight: 600, fontFamily: C.sans }}>Contact us</button>
      </div>
    </div>
  )
}
