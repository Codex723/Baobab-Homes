import { useState } from 'react'
import { C, BRAND } from '../lib/theme'
import { I } from '../lib/icons'
import { useMobile } from '../lib/utils'
import { AGENTS } from '../lib/data'
import { useAppNav } from '../lib/nav'
import { usePageTitle } from '../lib/usePageTitle'

const OFFICES = Array.from(new Set(AGENTS.map(a => a.office)))

export function ContactPage() {
  usePageTitle('Contact', {
    description: 'Get in touch with Baobab Homes. Send a message about a listing, a general enquiry, or to talk to someone before booking a viewing.',
    path: '/app/contact',
  })
  const nav = useAppNav()
  const mob = useMobile()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General enquiry', message: '' })

  const fld = { border: `1px solid ${C.sand}`, outline: 'none', padding: '10px 12px', borderRadius: C.r, fontSize: 13, fontFamily: C.sans, color: C.ink, background: C.ground, boxSizing: 'border-box' as const, width: '100%' }
  const lbl = { fontSize: 10, fontWeight: 700 as const, color: C.stone, display: 'block' as const, marginBottom: 5, letterSpacing: '0.08em', textTransform: 'uppercase' as const }
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => e.target.style.borderColor = C.terra
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => e.target.style.borderColor = C.sand

  const infoRow = (icon: React.ReactNode, label: string, value: string, href?: string) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <div style={{ width: 30, height: 30, borderRadius: C.r, background: C.ground, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.terra, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.stone, marginBottom: 2 }}>{label}</div>
        {href ? <a href={href} style={{ fontSize: 13.5, color: C.ink, fontWeight: 500, textDecoration: 'none' }}>{value}</a> : <div style={{ fontSize: 13.5, color: C.ink, fontWeight: 500 }}>{value}</div>}
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: mob ? '24px 16px 48px' : '48px 40px 64px' }}>
      <div style={{ maxWidth: 640, marginBottom: mob ? 24 : 36 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.terra, marginBottom: 10 }}>Contact</div>
        <h1 style={{ fontFamily: C.display, fontSize: mob ? 28 : 38, fontWeight: 600, color: C.ink, lineHeight: 1.1, marginBottom: 12 }}>Get in touch</h1>
        <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.75 }}>
          Have a question about a listing, a general enquiry, or want to talk to someone before booking a
          viewing? Send us a message and the right person on the team will get back to you. For a
          listing-specific question, you can also contact that listing's agent directly from the listing page.
        </p>
      </div>

      <div style={{ display: mob ? 'block' : 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 32 }}>
        {/* Contact info */}
        <div style={{ marginBottom: mob ? 28 : 0 }}>
          <div style={{ background: C.white, borderRadius: C.r, boxShadow: C.sh0, padding: mob ? 20 : 24, display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 16 }}>
            {infoRow(<I.Phone s={14} />, 'Phone', '+234 1 342 0100', 'tel:+23413420100')}
            {infoRow(<I.Mail s={14} />, 'Email', 'hello@baobabhomes.ng', 'mailto:hello@baobabhomes.ng')}
            {infoRow(<I.Clock s={14} />, 'Hours', 'Mon to Sat, 9am to 6pm')}
          </div>
          <div style={{ background: C.white, borderRadius: C.r, boxShadow: C.sh0, padding: mob ? 20 : 24 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.stone, marginBottom: 12 }}>Offices</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {OFFICES.map(o => (
                <div key={o} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.ink }}>
                  <I.Pin s={13} /><span>{o}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: C.stone, marginTop: 14, lineHeight: 1.6 }}>
              Prefer to speak to a specific agent? Visit an <button onClick={() => nav('agent', { aid: AGENTS[0].id })} style={{ background: 'none', border: 'none', padding: 0, color: C.terra, fontWeight: 600, cursor: 'pointer', fontFamily: C.sans, fontSize: 12 }}>agent profile</button> for their direct line.
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ background: C.white, borderRadius: C.r, padding: mob ? '20px 16px' : '28px', boxShadow: C.sh0 }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '24px 8px' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#edf7ed', border: '2px solid #4caf50', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#4caf50' }}><I.Check s={20} /></div>
              <h2 style={{ fontFamily: C.display, fontSize: 20, fontWeight: 600, color: C.ink, marginBottom: 8 }}>Message sent</h2>
              <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.7 }}>Thanks for reaching out. Someone from the team will reply within one business day.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true) }}>
              <h2 style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: C.ink, marginBottom: 16 }}>Send a message</h2>
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div><label style={lbl}>Full name</label><input required style={fld} placeholder="Your full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} onFocus={focus} onBlur={blur} /></div>
                <div><label style={lbl}>Email</label><input required type="email" style={fld} placeholder="you@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} onFocus={focus} onBlur={blur} /></div>
                <div><label style={lbl}>Phone (optional)</label><input type="tel" style={fld} placeholder="+234 801 234 5678" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} onFocus={focus} onBlur={blur} /></div>
                <div>
                  <label style={lbl}>Subject</label>
                  <select style={{ ...fld, cursor: 'pointer' }} value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}>
                    {['General enquiry', 'Buying', 'Renting', 'Listing my property', 'Agent support', 'Something else'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn: mob ? '1' : '1/3' }}>
                  <label style={lbl}>Message</label>
                  <textarea required rows={5} style={{ ...fld, resize: 'vertical' }} placeholder="How can we help?" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} onFocus={focus} onBlur={blur} />
                </div>
              </div>
              <button type="submit" style={{ background: C.terra, color: C.white, border: 'none', cursor: 'pointer', padding: '11px 24px', borderRadius: C.r, fontSize: 13, fontWeight: 600, fontFamily: C.sans }}
                onMouseEnter={e => e.currentTarget.style.background = C.terraD}
                onMouseLeave={e => e.currentTarget.style.background = C.terra}
              >Send message</button>
              <div style={{ fontSize: 11.5, color: C.stone, marginTop: 12, lineHeight: 1.6 }}>{BRAND} will only use these details to respond to your enquiry.</div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
