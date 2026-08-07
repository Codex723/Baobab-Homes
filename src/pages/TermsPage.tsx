import { C, BRAND } from '../lib/theme'
import { useMobile } from '../lib/utils'
import { usePageTitle } from '../lib/usePageTitle'

const SECTIONS: [string, string[]][] = [
  ['Using this site', [
    `${BRAND} lets you search, browse, and enquire about property listings, and lets vendors submit a property for listing review. You must be able to form a legally binding agreement to use the site.`,
    'You agree to give accurate information when you submit an enquiry, list a property, or contact an agent.',
  ]],
  ['Listings', [
    'Listings are submitted by vendors or their agents and reviewed before publishing, but we cannot guarantee that every detail on a listing is fully accurate or that a property remains available. Always confirm current details and availability with the listing agent before making a decision.',
    'Photos are representative of the property but may not reflect the most current condition, styling, or furnishings.',
  ]],
  ['No payments through the site', [
    `${BRAND} does not process rent, deposits, or purchase funds. Speak to a licensed agent before sending any money or documents, and always verify a viewing before paying anything. We will never ask you to pay before a verified viewing.`,
  ]],
  ['Agents', [
    `Agents on ${BRAND} operate under their own licenses. ${BRAND} provides the platform connecting buyers and renters with agents but is not a party to any sale or tenancy agreement between you and an agent, vendor, or landlord.`,
  ]],
  ['Acceptable use', [
    'You agree not to misuse the site: no scraping listing data at scale, no posting false or misleading listings, no using contact details gathered through the site for unrelated marketing, and no attempting to disrupt the site\'s normal operation.',
  ]],
  ['Intellectual property', [
    `The ${BRAND} name, logo, and site design are our property. Listing photos and descriptions belong to the vendor or agent who submitted them.`,
  ]],
  ['Limitation of liability', [
    `${BRAND} is provided on an "as is" basis. To the extent permitted by law, we are not liable for decisions made based on listing information, or for disputes arising between buyers, renters, vendors, landlords, and agents.`,
  ]],
  ['Changes to these terms', [
    'We may update these terms from time to time. Continued use of the site after an update means you accept the revised terms.',
  ]],
]

export function TermsPage() {
  usePageTitle('Terms of use', {
    description: 'The terms that govern your use of Baobab Homes, including listings, agent relationships, acceptable use, and liability.',
    path: '/app/terms',
  })
  const mob = useMobile()

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: mob ? '24px 16px 48px' : '48px 40px 64px' }}>
      <div style={{ marginBottom: mob ? 24 : 32 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.terra, marginBottom: 10 }}>Legal</div>
        <h1 style={{ fontFamily: C.display, fontSize: mob ? 28 : 36, fontWeight: 600, color: C.ink, lineHeight: 1.1, marginBottom: 10 }}>Terms of use</h1>
        <p style={{ fontSize: 12.5, color: C.stone }}>Last updated August 2026</p>
      </div>

      <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.8, marginBottom: 28 }}>
        These terms govern your use of {BRAND}. By browsing listings, submitting an enquiry, or listing a property
        on the site, you agree to the terms below.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        {SECTIONS.map(([heading, paras]) => (
          <div key={heading}>
            <h2 style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: C.ink, marginBottom: 8 }}>{heading}</h2>
            {paras.map((p, i) => (
              <p key={i} style={{ fontSize: 13.5, color: C.stone, lineHeight: 1.8, marginBottom: i < paras.length - 1 ? 8 : 0 }}>{p}</p>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, padding: '18px 20px', background: C.white, borderRadius: C.r, boxShadow: C.sh0, fontSize: 13, color: C.stone, lineHeight: 1.75 }}>
        Questions about these terms? Reach us at <a href="mailto:hello@baobabhomes.ng" style={{ color: C.terra, fontWeight: 600, textDecoration: 'none' }}>hello@baobabhomes.ng</a>.
      </div>
    </div>
  )
}
