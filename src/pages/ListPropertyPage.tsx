import { useState } from 'react'
import { C, BRAND } from '../lib/theme'
import { I } from '../lib/icons'
import { img, useMobile } from '../lib/utils'
import { LISTINGS } from '../lib/data'
import { useAppNav } from '../lib/nav'
import { usePageTitle } from '../lib/usePageTitle'

export function ListPropertyPage() {
  usePageTitle('List your property', {
    description: 'Submit your property for review on Baobab Homes. A licensed local agent will verify your listing before it goes live. No upfront fees for private vendors.',
    path: '/app/list-property',
  })
  const nav = useAppNav()
  const mob = useMobile()
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const steps = ['Property info', 'Photos', 'Pricing', 'Contact']
  const [info, setInfo] = useState({ addr: '', suburb: '', kind: 'Detached Duplex', beds: '3', baths: '2', sqm: '', parking: '1', furnished: false, desc: '' })
  const [price, setPrice] = useState({ listType: 'sale', amount: '', freq: 'annual' })
  const [contact, setContact] = useState({ name: '', phone: '', email: '', agency: '' })

  const fld = { border: `1px solid ${C.sand}`, outline: 'none', padding: '10px 12px', borderRadius: C.r, fontSize: 13, fontFamily: C.sans, color: C.ink, background: C.ground, boxSizing: 'border-box' as const, width: '100%' }
  const lbl = { fontSize: 10, fontWeight: 700 as const, color: C.stone, display: 'block' as const, marginBottom: 5, letterSpacing: '0.08em', textTransform: 'uppercase' as const }

  if (done) return (
    <div style={{ maxWidth: 520, margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#edf7ed', border: '2px solid #4caf50', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#4caf50' }}><I.Check s={24} /></div>
      <h1 style={{ fontFamily: C.display, fontSize: 26, fontWeight: 600, color: C.ink, marginBottom: 10 }}>Listing submitted</h1>
      <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.75, marginBottom: 24 }}>Your submission is with our verification team. A {BRAND} agent will call you within one business day to confirm details.</p>
      <div style={{ background: C.white, borderRadius: C.r, padding: '14px 20px', boxShadow: C.sh0, fontSize: 13, color: C.stone, marginBottom: 24 }}>Reference: <strong style={{ color: C.ink, fontFamily: 'monospace' }}>BBH-{Date.now().toString().slice(-6)}</strong></div>
      <button onClick={() => nav('home')} style={{ background: C.terra, color: C.white, border: 'none', cursor: 'pointer', padding: '11px 24px', borderRadius: C.r, fontSize: 14, fontWeight: 600, fontFamily: C.sans }}>Back to listings</button>
    </div>
  )

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: mob ? '28px 16px' : '48px 20px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: C.display, fontSize: mob ? 24 : 32, fontWeight: 600, color: C.ink, marginBottom: 4 }}>List your property</h1>
        <p style={{ fontSize: 13, color: C.stone }}>Reviewed by a local agent before going live. No upfront fees for private vendors.</p>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', gap: 0, marginBottom: 10 }}>
          {steps.map((s, i) => {
            const n = i + 1; const active = n === step; const past = n < step
            return (
              <div key={n} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: i === 0 ? 'flex-start' : i === steps.length - 1 ? 'flex-end' : 'center', position: 'relative' }}>
                {i < steps.length - 1 && <div style={{ position: 'absolute', top: 13, left: i === 0 ? '50%' : 0, right: i === steps.length - 2 ? '50%' : 0, height: 2, background: past ? C.terra : C.sand, zIndex: 0 }} />}
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: past ? C.terra : active ? C.ink : C.sand, color: past || active ? C.white : C.stone, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, zIndex: 1, flexShrink: 0, transition: 'all 0.2s' }}>
                  {past ? <I.Check s={12} /> : n}
                </div>
                {!mob && <div style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? C.ink : C.stone, marginTop: 5, textAlign: 'center', letterSpacing: '0.04em' }}>{s}</div>}
              </div>
            )
          })}
        </div>
        {mob && <div style={{ fontSize: 12, fontWeight: 600, color: C.ink }}>Step {step} of {steps.length}: {steps[step - 1]}</div>}
      </div>

      <div style={{ background: C.white, borderRadius: C.r, padding: mob ? '20px 16px' : '28px', boxShadow: C.sh0, marginBottom: 20 }}>
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: C.ink }}>Property information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 14 }}>
              <div style={{ gridColumn: mob ? '1' : '1/3' }}><label style={lbl}>Street address</label><input style={fld} placeholder="14 Admiralty Way" value={info.addr} onChange={e => setInfo(p => ({ ...p, addr: e.target.value }))} onFocus={e => e.target.style.borderColor = C.terra} onBlur={e => e.target.style.borderColor = C.sand} /></div>
              <div><label style={lbl}>Suburb</label><input style={fld} placeholder="Lekki Phase 1" value={info.suburb} onChange={e => setInfo(p => ({ ...p, suburb: e.target.value }))} onFocus={e => e.target.style.borderColor = C.terra} onBlur={e => e.target.style.borderColor = C.sand} /></div>
              <div><label style={lbl}>Property type</label><select style={{ ...fld, cursor: 'pointer' }} value={info.kind} onChange={e => setInfo(p => ({ ...p, kind: e.target.value }))}>{['Detached Duplex', 'Semi-Detached Duplex', 'Terraced Duplex', 'Detached Bungalow', 'Apartment', 'Studio Apartment', 'Land'].map(t => <option key={t}>{t}</option>)}</select></div>
              <div><label style={lbl}>Bedrooms</label><select style={{ ...fld, cursor: 'pointer' }} value={info.beds} onChange={e => setInfo(p => ({ ...p, beds: e.target.value }))}>{['Studio', '1', '2', '3', '4', '5', '6+'].map(n => <option key={n}>{n}</option>)}</select></div>
              <div><label style={lbl}>Bathrooms</label><select style={{ ...fld, cursor: 'pointer' }} value={info.baths} onChange={e => setInfo(p => ({ ...p, baths: e.target.value }))}>{['1', '1.5', '2', '3', '4+'].map(n => <option key={n}>{n}</option>)}</select></div>
              <div><label style={lbl}>Floor area (sqm)</label><input style={fld} type="number" placeholder="e.g. 185" value={info.sqm} onChange={e => setInfo(p => ({ ...p, sqm: e.target.value }))} onFocus={e => e.target.style.borderColor = C.terra} onBlur={e => e.target.style.borderColor = C.sand} /></div>
              <div><label style={lbl}>Parking spaces</label><select style={{ ...fld, cursor: 'pointer' }} value={info.parking} onChange={e => setInfo(p => ({ ...p, parking: e.target.value }))}>{['0', '1', '2', '3+'].map(n => <option key={n}>{n}</option>)}</select></div>
              <div style={{ gridColumn: mob ? '1' : '1/3' }}><label style={lbl}>Description</label><textarea rows={5} placeholder="Describe the property: layout, condition, standout features, anything a viewer should know before booking." style={{ ...fld, resize: 'vertical' }} value={info.desc} onChange={e => setInfo(p => ({ ...p, desc: e.target.value }))} onFocus={e => e.target.style.borderColor = C.terra} onBlur={e => e.target.style.borderColor = C.sand} /></div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: C.ink }}><input type="checkbox" checked={info.furnished} onChange={e => setInfo(p => ({ ...p, furnished: e.target.checked }))} />Property is furnished</label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: C.ink, marginBottom: 6 }}>Property photos</h2>
            <p style={{ fontSize: 13, color: C.stone, marginBottom: 20 }}>Clear, well-lit photos help buyers and renters decide faster. We can arrange a professional photographer. Ask your assigned agent.</p>
            <div style={{ border: `2px dashed ${C.sandD}`, borderRadius: C.r, padding: '52px 20px', textAlign: 'center', background: C.ground, cursor: 'pointer', marginBottom: 16, transition: 'border-color 0.13s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.terra}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.sandD}
            >
              <I.Up s={28} />
              <div style={{ fontSize: 14, fontWeight: 600, color: C.ink, marginTop: 10, marginBottom: 4 }}>Drop photos here, or click to upload</div>
              <div style={{ fontSize: 12, color: C.stone }}>JPG, PNG, HEIC &middot; max 20MB each &middot; up to 30 photos</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {LISTINGS.slice(0, 4).map((l2, i) => (
                <div key={i} style={{ flex: 1, height: 72, background: C.sand, borderRadius: C.r, overflow: 'hidden', position: 'relative' }}>
                  <img src={img(l2.img, 200, 144)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                  {i === 0 && <div style={{ position: 'absolute', bottom: 3, left: 3, background: C.terra, color: C.white, fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 3 }}>Cover</div>}
                </div>
              ))}
              <div style={{ flex: 1, height: 72, background: C.ground, borderRadius: C.r, border: `1px dashed ${C.sandD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 20, color: C.sandD }}>+</div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <h2 style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: C.ink }}>Pricing</h2>
            <div>
              <label style={lbl}>Listing type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['sale', 'rent'] as const).map(t => (
                  <button key={t} onClick={() => setPrice(p => ({ ...p, listType: t }))} style={{ flex: 1, border: `1.5px solid ${price.listType === t ? C.terra : C.sand}`, background: price.listType === t ? '#fdf0ea' : 'none', cursor: 'pointer', padding: '10px', borderRadius: C.r, fontSize: 13, fontWeight: 600, color: price.listType === t ? C.terra : C.stone, fontFamily: C.sans, transition: 'all 0.13s' }}>
                    {t === 'sale' ? 'For sale' : 'To rent'}
                  </button>
                ))}
              </div>
            </div>
            <div><label style={lbl}>{price.listType === 'sale' ? 'Asking price (\u20a6)' : 'Rent amount (\u20a6)'}</label><input style={fld} type="number" placeholder={price.listType === 'sale' ? '185,000,000' : '22,000,000'} value={price.amount} onChange={e => setPrice(p => ({ ...p, amount: e.target.value }))} onFocus={e => e.target.style.borderColor = C.terra} onBlur={e => e.target.style.borderColor = C.sand} /></div>
            {price.listType === 'rent' && <div><label style={lbl}>Rental frequency</label><select style={{ ...fld, cursor: 'pointer' }} value={price.freq} onChange={e => setPrice(p => ({ ...p, freq: e.target.value }))}><option value="monthly">Per month</option><option value="annual">Per year</option></select></div>}
            <div style={{ background: C.ground, borderRadius: C.r, padding: '14px 16px', border: `1px solid ${C.sand}`, fontSize: 13, color: C.stone, lineHeight: 1.65 }}>Our team will review your asking price against recent comparables in the area and may suggest an adjustment before the listing goes live.</div>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h2 style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: C.ink }}>Your contact details</h2>
            {[{ id: 'name', lbl: 'Full name', type: 'text', ph: 'Your full name' }, { id: 'phone', lbl: 'Phone', type: 'tel', ph: '+234 801 234 5678' }, { id: 'email', lbl: 'Email', type: 'email', ph: 'you@email.com' }, { id: 'agency', lbl: 'Agency (leave blank if private vendor)', type: 'text', ph: '' }].map(f => (
              <div key={f.id}><label style={lbl}>{f.lbl}</label><input type={f.type} placeholder={f.ph} style={fld} value={contact[f.id as keyof typeof contact]} onChange={e => setContact(p => ({ ...p, [f.id]: e.target.value }))} onFocus={e => e.target.style.borderColor = C.terra} onBlur={e => e.target.style.borderColor = C.sand} /></div>
            ))}
            <div style={{ background: C.ground, borderRadius: C.r, padding: '14px 16px', border: `1px solid ${C.sand}`, fontSize: 12, color: C.stone, lineHeight: 1.65 }}>By submitting, you agree that {BRAND} may contact you by phone or email to verify the listing. Your details will not be shared with third parties without your consent.</div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => step > 1 ? setStep(s => s - 1) : nav('home')} style={{ border: `1px solid ${C.sand}`, background: C.white, cursor: 'pointer', padding: '10px 20px', borderRadius: C.r, fontSize: 13, fontWeight: 600, color: C.ink, fontFamily: C.sans, display: 'flex', alignItems: 'center', gap: 5 }}>
          <I.ChevL /> {step === 1 ? 'Cancel' : 'Back'}
        </button>
        <button onClick={() => step < steps.length ? setStep(s => s + 1) : setDone(true)} style={{ background: C.terra, color: C.white, border: 'none', cursor: 'pointer', padding: '10px 24px', borderRadius: C.r, fontSize: 13, fontWeight: 600, fontFamily: C.sans, display: 'flex', alignItems: 'center', gap: 5 }}
          onMouseEnter={e => e.currentTarget.style.background = C.terraD}
          onMouseLeave={e => e.currentTarget.style.background = C.terra}
        >
          {step === steps.length ? 'Submit listing' : 'Continue'} <I.ChevR />
        </button>
      </div>
    </div>
  )
}
