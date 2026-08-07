import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { C } from '../lib/theme'
import { I } from '../lib/icons'
import { img, useMobile } from '../lib/utils'
import { AGENTS, LISTINGS } from '../lib/data'
import { Card } from '../components/Card'
import { useAppState } from '../context/AppState'
import { usePageTitle } from '../lib/usePageTitle'
import { NotFound } from './NotFoundPage'
import { AgentSwitcher } from '../components/AgentSwitcher'

export function AgentPage() {
  const { id } = useParams()
  const cur = AGENTS.find(a => a.id === id)
  usePageTitle(cur ? cur.name : 'Agent not found', cur ? {
    description: `${cur.name}, ${cur.role} at ${cur.office}. Licensed with ${cur.lic}. View active listings and contact directly.`,
    path: `/app/agent/${cur.id}`,
  } : undefined)

  if (!cur) {
    return <NotFound message="We couldn't find that agent profile." backTo="home" backLabel="Back to homepage" />
  }

  return <AgentBody cur={cur} />
}

function AgentBody({ cur }: { cur: (typeof AGENTS)[number] }) {
  const mob = useMobile()
  const { saved, save } = useAppState()
  const listings = LISTINGS.filter(l => l.agentId === cur.id)
  const [sent, setSent] = useState(false)

  return (
    <div style={{ maxWidth: 1360, margin: '0 auto', padding: mob ? '24px 16px' : '48px 40px' }}>
      <AgentSwitcher activeId={cur.id} />

      <div style={{ display: mob ? 'block' : 'grid', gridTemplateColumns: '300px 1fr', gap: 36 }}>
        {/* Info */}
        <div>
          <div style={{ background: C.white, borderRadius: C.r, overflow: 'hidden', boxShadow: C.sh0, marginBottom: 14 }}>
            <img src={img(cur.img, 600, 440)} alt={cur.name} style={{ width: '100%', height: mob ? 220 : 300, objectFit: 'cover', objectPosition: 'top' }} />
            <div style={{ padding: 20 }}>
              <h1 style={{ fontFamily: C.display, fontSize: 22, fontWeight: 600, color: C.ink, marginBottom: 2 }}>{cur.name}</h1>
              <div style={{ fontSize: 13, color: C.terra, fontWeight: 500, marginBottom: 2 }}>{cur.role}</div>
              <div style={{ fontSize: 12, color: C.stone, marginBottom: 12 }}>{cur.office}</div>
              <div style={{ fontSize: 10, color: C.stone, background: C.ground, padding: '6px 10px', borderRadius: C.r, marginBottom: 16, letterSpacing: '0.03em', fontFamily: 'monospace' }}>Lic: {cur.lic}</div>
              <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.75, marginBottom: 18 }}>{cur.bio}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a href={`tel:${cur.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.ground, border: `1px solid ${C.sand}`, borderRadius: C.r, padding: '10px 12px', fontSize: 13, fontWeight: 500, color: C.ink, textDecoration: 'none' }}><I.Phone />{cur.phone}</a>
                <a href={`mailto:${cur.email}`} style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.ground, border: `1px solid ${C.sand}`, borderRadius: C.r, padding: '10px 12px', fontSize: 13, fontWeight: 500, color: C.ink, textDecoration: 'none' }}>@ {cur.email}</a>
                <a href={`https://wa.me/${cur.phone.replace(/\D/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: C.r, padding: '10px 12px', fontSize: 13, fontWeight: 600, color: '#2e7d32', textDecoration: 'none' }}><I.WA />WhatsApp {cur.name.split(' ')[0]}</a>
              </div>
              <Link to={`/app/agent/${cur.id}/dashboard`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14, textDecoration: 'none', border: `1px solid ${C.sand}`, borderRadius: C.r, padding: '9px 12px', fontSize: 12, fontWeight: 500, color: C.stone }}>
                <I.File s={12} />{cur.name.split(' ')[0]}'s dashboard (demo)
              </Link>
            </div>
          </div>
        </div>

        {/* Listings + contact */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
            <h2 style={{ fontFamily: C.display, fontSize: mob ? 20 : 22, fontWeight: 600, color: C.ink }}>{cur.name.split(' ')[0]}&rsquo;s active listings</h2>
            <span style={{ fontSize: 11, color: C.stone }}>{listings.length} properties</span>
          </div>
          {listings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', color: C.stone, background: C.white, borderRadius: C.r, marginBottom: 20 }}><div style={{ fontSize: 13 }}>No active listings at this time</div></div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: 14, marginBottom: 24 }}>
              {listings.map(l => <Card key={l.id} l={l} saved={saved} save={save} />)}
            </div>
          )}

          {/* Contact form */}
          <div style={{ background: C.white, borderRadius: C.r, padding: 24, boxShadow: C.sh0 }}>
            <h3 style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: C.ink, marginBottom: 4 }}>Send {cur.name.split(' ')[0]} a message</h3>
            <div style={{ fontSize: 12, color: C.stone, marginBottom: 18 }}>Not about a specific listing? Enquire generally here.</div>
            {sent ? (
              <div style={{ fontSize: 13, color: '#2e7d32', fontWeight: 600 }}>Message sent. {cur.name.split(' ')[0]} will reply shortly.</div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }}>
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  {[{ ph: 'Your full name', type: 'text' }, { ph: 'Email address', type: 'email' }].map(f => (
                    <input key={f.ph} type={f.type} placeholder={f.ph} required style={{ border: `1px solid ${C.sand}`, outline: 'none', padding: '10px 12px', borderRadius: C.r, fontSize: 13, fontFamily: C.sans, color: C.ink, background: C.ground, boxSizing: 'border-box' as const, width: '100%' }}
                      onFocus={e => e.target.style.borderColor = C.terra}
                      onBlur={e => e.target.style.borderColor = C.sand}
                    />
                  ))}
                </div>
                <textarea placeholder="Tell us what you are looking for: area, budget, timeline..." rows={3} style={{ width: '100%', border: `1px solid ${C.sand}`, outline: 'none', padding: '10px 12px', borderRadius: C.r, fontSize: 13, fontFamily: C.sans, color: C.ink, background: C.ground, resize: 'vertical', boxSizing: 'border-box' as const, marginBottom: 12 }}
                  onFocus={e => e.target.style.borderColor = C.terra}
                  onBlur={e => e.target.style.borderColor = C.sand}
                />
                <button type="submit" style={{ background: C.terra, color: C.white, border: 'none', cursor: 'pointer', padding: '10px 22px', borderRadius: C.r, fontSize: 13, fontWeight: 600, fontFamily: C.sans }}
                  onMouseEnter={e => e.currentTarget.style.background = C.terraD}
                  onMouseLeave={e => e.currentTarget.style.background = C.terra}
                >Send message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
