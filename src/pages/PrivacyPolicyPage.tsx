import { C, BRAND } from '../lib/theme'
import { useMobile } from '../lib/utils'
import { usePageTitle } from '../lib/usePageTitle'

const SECTIONS: [string, string[]][] = [
  ['Information we collect', [
    `When you use ${BRAND}, we collect information you give us directly: your name, email, phone number, and any details you include in an enquiry, a listing submission, or a message to an agent.`,
    'We also collect basic usage information automatically, such as which pages you visit and which listings you view, so we can understand how the site is used and improve it.',
  ]],
  ['How we use your information', [
    'We use your information to respond to enquiries, connect you with the relevant agent, process a property listing you submit, and send you information you have asked for.',
    'We do not sell your personal information to third parties.',
  ]],
  ['Sharing with agents', [
    `When you contact an agent through ${BRAND} about a specific listing, the details you provide in that enquiry are shared with the agent responsible for that listing so they can respond to you directly.`,
  ]],
  ['Cookies', [
    'We use essential cookies to keep the site working correctly, such as remembering your saved listings during a session. We do not use cookies to build advertising profiles.',
  ]],
  ['Data retention', [
    'We keep enquiry and account information for as long as reasonably needed to provide our service and meet legal or regulatory obligations, after which it is deleted or anonymized.',
  ]],
  ['Your choices', [
    'You can ask us at any time what personal information we hold about you, ask us to correct it, or ask us to delete it, subject to any legal obligations we have to retain certain records.',
    'To make a request, use the contact details below.',
  ]],
  ['Security', [
    'We take reasonable technical and organizational steps to protect the information you share with us. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.',
  ]],
  ['Changes to this policy', [
    'We may update this policy from time to time. If we make significant changes, we will update the date below.',
  ]],
]

export function PrivacyPolicyPage() {
  usePageTitle('Privacy policy', {
    description: 'How Baobab Homes collects, uses, and protects your personal information when you browse listings, submit enquiries, or list a property.',
    path: '/app/privacy',
  })
  const mob = useMobile()

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: mob ? '24px 16px 48px' : '48px 40px 64px' }}>
      <div style={{ marginBottom: mob ? 24 : 32 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.terra, marginBottom: 10 }}>Legal</div>
        <h1 style={{ fontFamily: C.display, fontSize: mob ? 28 : 36, fontWeight: 600, color: C.ink, lineHeight: 1.1, marginBottom: 10 }}>Privacy policy</h1>
        <p style={{ fontSize: 12.5, color: C.stone }}>Last updated August 2026</p>
      </div>

      <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.8, marginBottom: 28 }}>
        This policy explains what personal information {BRAND} collects when you use our site, why we collect it,
        and what choices you have. It applies to visitors, buyers, renters, vendors, and agents using the platform.
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
        Questions about this policy or your data? Reach us at <a href="mailto:hello@baobabhomes.ng" style={{ color: C.terra, fontWeight: 600, textDecoration: 'none' }}>hello@baobabhomes.ng</a>.
      </div>
    </div>
  )
}
