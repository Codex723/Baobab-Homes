import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { C } from '../lib/theme'
import { I } from '../lib/icons'
import { img, fmt, useMobile } from '../lib/utils'
import { AGENTS, LISTINGS } from '../lib/data'
import { useAppNav } from '../lib/nav'
import { useAppState } from '../context/AppState'
import { usePageTitle } from '../lib/usePageTitle'
import { NotFound } from './NotFoundPage'

export function DetailPage() {
  const { id } = useParams()
  const l = LISTINGS.find(x => x.id === id)
  usePageTitle(l ? `${l.title} - ${fmt(l)}` : 'Listing not found', l ? {
    description: `${l.title} in ${l.suburb}. ${l.kind} with ${l.beds === 0 ? 'studio' : `${l.beds} bedrooms`}, ${l.baths} bathrooms, ${l.sqm} sqm. ${l.furnished ? 'Furnished. ' : ''}${l.verified ? 'Verified listing. ' : ''}Contact the listing agent to request a viewing.`,
    path: `/app/listing/${l.id}`,
  } : undefined)

  if (!l) {
    return <NotFound message="We couldn't find that listing. It may have been rented, sold, or removed." backTo="search" backLabel="Browse all listings" />
  }

  return <DetailBody l={l} />
}

function DetailBody({ l }: { l: (typeof LISTINGS)[number] }) {
  const mob = useMobile()
  const nav = useAppNav()
  const { saved, save } = useAppState()
  const agent = AGENTS.find(a => a.id === l.agentId) || AGENTS[0]
  const [gIdx, setGIdx] = useState(0)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', msg: '' })
  const [sent, setSent] = useState(false)
  const on = saved.has(l.id)
  const imgs = [l.img, ...l.gallery]

  const submit = (e: React.FormEvent) => { e.preventDefault(); setSent(true) }

  const Form = ({ inline = false }: { inline?: boolean }) => (
    <div style={!inline ? { position: 'fixed', inset: 0, background: 'rgba(15,30,23,0.6)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 } : {}}>
      <div style={{ background: C.white, borderRadius: C.r, padding: 28, maxWidth: 440, width: '100%', position: 'relative', boxShadow: C.sh2 }}>
        {!inline && <button onClick={() => setModal(false)} style={{ position: 'absolute', top: 16, right: 16, border: 'none', background: 'none', cursor: 'pointer', color: C.stone }}><I.X /></button>}
        {sent ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#edf7ed', border: '2px solid #4caf50', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: '#4caf50' }}><I.Check s={22} /></div>
            <div style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: C.ink, marginBottom: 6 }}>Request received</div>
            <div style={{ fontSize: 13, color: C.stone, lineHeight: 1.6 }}>{agent.name} will contact you within 2 business hours. Reference: <strong>{l.ref}</strong></div>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: C.ink, marginBottom: 4 }}>Request a viewing</div>
            <div style={{ fontSize: 12, color: C.stone, marginBottom: 20 }}>{l.title} &middot; {l.ref}</div>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[{ id: 'name', lbl: 'Full name', type: 'text', ph: 'Your name' }, { id: 'email', lbl: 'Email', type: 'email', ph: 'you@email.com' }, { id: 'phone', lbl: 'Phone', type: 'tel', ph: '+1 (555) ...' }, { id: 'date', lbl: 'Preferred date', type: 'date', ph: '' }].map(f => (
                <div key={f.id}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: C.stone, display: 'block', marginBottom: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{f.lbl}</label>
                  <input type={f.type} placeholder={f.ph} required value={form[f.id as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))} style={{ width: '100%', border: `1px solid ${C.sand}`, outline: 'none', padding: '9px 12px', borderRadius: C.r, fontSize: 13, fontFamily: C.sans, color: C.ink, background: C.ground, boxSizing: 'border-box' as const }}
                    onFocus={e => e.target.style.borderColor = C.terra}
                    onBlur={e => e.target.style.borderColor = C.sand}
                  />
                </div>
              ))}
              <textarea placeholder="Questions or preferred viewing time..." rows={3} value={form.msg} onChange={e => setForm(p => ({ ...p, msg: e.target.value }))} style={{ width: '100%', border: `1px solid ${C.sand}`, outline: 'none', padding: '9px 12px', borderRadius: C.r, fontSize: 13, fontFamily: C.sans, color: C.ink, background: C.ground, resize: 'vertical', boxSizing: 'border-box' as const }}
                onFocus={e => e.target.style.borderColor = C.terra}
                onBlur={e => e.target.style.borderColor = C.sand}
              />
              <button type="submit" style={{ background: C.terra, color: C.white, border: 'none', cursor: 'pointer', padding: '11px', borderRadius: C.r, fontSize: 14, fontWeight: 600, fontFamily: C.sans, marginTop: 4 }}
                onMouseEnter={e => e.currentTarget.style.background = C.terraD}
                onMouseLeave={e => e.currentTarget.style.background = C.terra}
              >Request a viewing</button>
            </form>
          </>
        )}
      </div>
    </div>
  )

  return (
    <div style={{ background: C.ground, paddingBottom: mob ? 80 : 0 }}>
      {modal && <Form />}

      {/* Breadcrumb */}
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: mob ? '12px 16px' : '14px 40px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C.stone }}>
        <button onClick={() => nav('home')} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 11, color: C.stone, fontFamily: C.sans }}>Home</button>
        <I.ChevR s={11} /><button onClick={() => nav('search')} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 11, color: C.stone, fontFamily: C.sans }}>Search</button>
        <I.ChevR s={11} /><span style={{ color: C.ink, fontWeight: 500 }}>{l.suburb}</span>
      </div>

      <div style={{ maxWidth: 1360, margin: '0 auto', padding: mob ? '0 16px' : '0 40px' }}>
        {/* Gallery */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: mob ? 'block' : 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '320px 200px', gap: 6, height: mob ? 'auto' : 520 }}>
            {/* Main */}
            <div style={{ gridRow: '1/3', position: 'relative', background: C.sandD, borderRadius: `${C.r} 0 0 ${C.r}`, overflow: 'hidden', height: mob ? 280 : 'auto', marginBottom: mob ? 6 : 0 }}>
              <img src={img(imgs[gIdx], 1000, 1000)} alt={l.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button onClick={() => setGIdx(i => Math.max(0, i - 1))} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.ChevL /></button>
              <button onClick={() => setGIdx(i => Math.min(imgs.length - 1, i + 1))} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.ChevR /></button>
              <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(15,30,23,0.6)', color: C.white, fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: C.r }}>{gIdx + 1} / {imgs.length}</div>
            </div>
            {/* Thumbs */}
            {!mob && l.gallery.slice(0, 4).map((g, i) => (
              <div key={g} onClick={() => setGIdx(i + 1)} style={{ background: C.sandD, overflow: 'hidden', cursor: 'pointer', borderRadius: i === 1 ? `0 ${C.r} 0 0` : i === 3 ? `0 0 ${C.r} 0` : 0, position: 'relative' }}>
                <img src={img(g, 500, 320)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.15s' }} />
                {i === 3 && l.gallery.length > 4 && <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,30,23,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.white, fontSize: 14, fontWeight: 600 }}>+{l.gallery.length - 4} more</div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: mob ? 'block' : 'grid', gridTemplateColumns: '1fr 340px', gap: 40, alignItems: 'start' }}>
          {/* Left */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.terra, marginBottom: 8 }}>{l.kind} &middot; {l.type === 'sale' ? 'For sale' : 'To rent'}</div>
                <h1 style={{ fontFamily: C.display, fontSize: mob ? 24 : 30, fontWeight: 600, color: C.ink, lineHeight: 1.1, marginBottom: 6 }}>{l.title}</h1>
                <div style={{ fontSize: 13, color: C.stone, display: 'flex', alignItems: 'center', gap: 4 }}><I.Pin />{l.address}, {l.suburb}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: C.display, fontSize: mob ? 28 : 36, fontWeight: 700, color: C.ink }}>{fmt(l)}</div>
                <div style={{ fontSize: 10, color: C.stone, letterSpacing: '0.05em' }}>{l.type === 'rent' ? 'MONTHLY RENT' : 'SALE PRICE'}</div>
              </div>
            </div>

            {/* Specs */}
            <div style={{ background: C.white, borderRadius: C.r, padding: 20, marginBottom: 24, boxShadow: C.sh0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 16, textAlign: 'center', marginBottom: 16, rowGap: 18 }}>
                {[{ lbl: 'Bedrooms', val: l.beds === 0 ? 'Studio' : l.beds, ico: <I.Bed s={20} /> }, { lbl: 'Bathrooms', val: l.baths, ico: <I.Bath s={20} /> }, { lbl: 'Floor area', val: `${l.sqm}sqm`, ico: <I.Area s={20} /> }, { lbl: 'Parking', val: l.parking === 0 ? 'None' : l.parking, ico: <I.Car s={20} /> }].map(s => (
                  <div key={s.lbl}>
                    <div style={{ color: C.terra, display: 'flex', justifyContent: 'center', marginBottom: 7 }}>{s.ico}</div>
                    <div style={{ fontFamily: C.display, fontSize: 20, fontWeight: 600, color: C.ink, marginBottom: 2 }}>{s.val}</div>
                    <div style={{ fontSize: 10, color: C.stone, letterSpacing: '0.04em' }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: 14, borderTop: `1px solid ${C.sand}`, display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 11, color: C.stone }}>
                {l.furnished && <span style={{ color: C.terra, fontWeight: 700, letterSpacing: '0.04em' }}>FURNISHED</span>}
                {l.verified && <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, color: C.ink }}><I.Check />Listing verified</span>}
                <span>Listed {l.listed}</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 10 }}>Ref: {l.ref}</span>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: C.ink, marginBottom: 12 }}>About this property</h2>
              <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.8 }}>{l.desc}</p>
            </div>

            {/* Amenities */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: C.ink, marginBottom: 14 }}>Features & amenities</h2>
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: 9 }}>
                {l.amenities.map(a => (
                  <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: C.ink }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#fdf0ea', border: `1px solid #eecdb8`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.terra, flexShrink: 0 }}><I.Check s={10} /></span>
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: C.ink, marginBottom: 12 }}>Location</h2>
              <div onClick={() => nav('map')} style={{ height: 200, borderRadius: C.r, overflow: 'hidden', background: C.sandD, cursor: 'pointer', position: 'relative' }}>
                <img src={img('photo-1499631507243-7290571550ed', 900, 400)} alt="Aerial view of neighbourhood" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,30,23,0.12)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ background: C.terra, color: C.white, width: 36, height: 36, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: C.sh1 }}>
                    <span style={{ transform: 'rotate(45deg)' }}><I.Pin s={16} /></span>
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(245,242,236,0.95)', fontSize: 11, fontWeight: 600, color: C.ink, padding: '4px 10px', borderRadius: C.r }}>Open map view</div>
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: C.stone }}>{l.address}, {l.suburb}</div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ position: mob ? 'static' : 'sticky', top: 74 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <button onClick={() => save(l.id)} style={{ flex: 1, border: `1.5px solid ${on ? C.terra : C.sand}`, background: on ? '#fdf0ea' : C.white, cursor: 'pointer', padding: '9px', borderRadius: C.r, fontSize: 13, fontWeight: 600, color: on ? C.terra : C.ink, fontFamily: C.sans, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, transition: 'all 0.13s' }}>
                <I.Heart s={14} on={on} /> {on ? 'Saved' : 'Save listing'}
              </button>
            </div>

            {/* Agent */}
            <div style={{ background: C.white, borderRadius: C.r, padding: 20, boxShadow: C.sh0, marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.stone, marginBottom: 14 }}>Listing agent</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                <img src={img(agent.img, 100, 100)} alt={agent.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
                <div>
                  <button onClick={() => nav('agent', { aid: agent.id })} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, fontSize: 14, fontWeight: 600, color: C.ink, fontFamily: C.sans, textAlign: 'left' }}>{agent.name}</button>
                  <div style={{ fontSize: 11, color: C.stone }}>{agent.role}</div>
                  <div style={{ fontSize: 11, color: C.terra, fontWeight: 500 }}>{agent.office}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <a href={`tel:${agent.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.ground, border: `1px solid ${C.sand}`, borderRadius: C.r, padding: '9px 12px', fontSize: 13, fontWeight: 500, color: C.ink, textDecoration: 'none', transition: 'border-color 0.13s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.terra}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.sand}
                ><I.Phone />{agent.phone}</a>
                <a href={`https://wa.me/${agent.phone.replace(/\D/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: C.r, padding: '9px 12px', fontSize: 13, fontWeight: 500, color: '#2e7d32', textDecoration: 'none' }}>
                  <I.WA /> WhatsApp
                </a>
              </div>
            </div>

            {/* Inquiry form */}
            <div style={{ background: C.white, borderRadius: C.r, padding: 20, boxShadow: C.sh0 }}>
              <div style={{ fontFamily: C.display, fontSize: 16, fontWeight: 600, color: C.ink, marginBottom: 3 }}>Request a viewing</div>
              <div style={{ fontSize: 11, color: C.stone, marginBottom: 14 }}>Usually responds within 2 business hours</div>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '12px 0' }}>
                  <div style={{ fontSize: 13, color: '#2e7d32', fontWeight: 600, marginBottom: 4 }}>Request sent</div>
                  <div style={{ fontSize: 12, color: C.stone }}>Ref: {l.ref}</div>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {[{ id: 'name', type: 'text', ph: 'Your name' }, { id: 'email', type: 'email', ph: 'Email address' }, { id: 'phone', type: 'tel', ph: 'Phone number' }].map(f => (
                    <input key={f.id} type={f.type} placeholder={f.ph} required value={form[f.id as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))} style={{ border: `1px solid ${C.sand}`, outline: 'none', padding: '9px 11px', borderRadius: C.r, fontSize: 13, fontFamily: C.sans, color: C.ink, background: C.ground, boxSizing: 'border-box' as const, width: '100%' }}
                      onFocus={e => e.target.style.borderColor = C.terra}
                      onBlur={e => e.target.style.borderColor = C.sand}
                    />
                  ))}
                  <textarea placeholder="Questions or preferred viewing time..." rows={2} value={form.msg} onChange={e => setForm(p => ({ ...p, msg: e.target.value }))} style={{ border: `1px solid ${C.sand}`, outline: 'none', padding: '9px 11px', borderRadius: C.r, fontSize: 13, fontFamily: C.sans, color: C.ink, background: C.ground, resize: 'vertical', boxSizing: 'border-box' as const, width: '100%' }}
                    onFocus={e => e.target.style.borderColor = C.terra}
                    onBlur={e => e.target.style.borderColor = C.sand}
                  />
                  <button type="submit" style={{ background: C.terra, color: C.white, border: 'none', cursor: 'pointer', padding: '10px', borderRadius: C.r, fontSize: 13, fontWeight: 600, fontFamily: C.sans }}
                    onMouseEnter={e => e.currentTarget.style.background = C.terraD}
                    onMouseLeave={e => e.currentTarget.style.background = C.terra}
                  >Request a viewing</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      {mob && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: C.white, borderTop: `1px solid ${C.sand}`, padding: '10px 16px', display: 'flex', gap: 8, zIndex: 90 }}>
          <a href={`tel:${agent.phone}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, background: C.ground, border: `1px solid ${C.sand}`, borderRadius: C.r, padding: '10px', fontSize: 12, fontWeight: 600, color: C.ink, textDecoration: 'none' }}><I.Phone />Call</a>
          <a href={`https://wa.me/${agent.phone.replace(/\D/g, '')}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, background: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: C.r, padding: '10px', fontSize: 12, fontWeight: 600, color: '#2e7d32', textDecoration: 'none' }}><I.WA />WhatsApp</a>
          <button onClick={() => setModal(true)} style={{ flex: 2, background: C.terra, color: C.white, border: 'none', cursor: 'pointer', borderRadius: C.r, padding: '10px', fontSize: 12, fontWeight: 600, fontFamily: C.sans }}>Request viewing</button>
        </div>
      )}
    </div>
  )
}
