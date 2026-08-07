import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { C } from '../lib/theme'
import { I } from '../lib/icons'
import { useMobile } from '../lib/utils'
import { LISTINGS } from '../lib/data'
import { Card } from '../components/Card'
import { useAppNav } from '../lib/nav'
import { useAppState } from '../context/AppState'
import { usePageTitle } from '../lib/usePageTitle'
import type { Mode } from '../lib/types'

export function SearchPage() {
  const nav = useAppNav()
  const { mode, setMode, saved, save } = useAppState()
  const [params] = useSearchParams()
  const mob = useMobile()
  usePageTitle(`Properties ${mode === 'buy' ? 'for sale' : 'to rent'}`, {
    description: `Browse verified properties ${mode === 'buy' ? 'for sale' : 'to rent'} across Lagos and Abuja. Filter by price, beds, baths, property type, and more.`,
    path: '/app/search',
  })

  // Respect a ?type=buy|rent query param so /search?type=rent is itself a
  // real, shareable, distinct URL rather than relying only on prior clicks.
  useEffect(() => {
    const t = params.get('type')
    if (t === 'buy' || t === 'rent') setMode(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  // Respect a ?suburb= query param (used by neighborhood guide links) so
  // "search all of X" lands on a filtered, shareable URL too.
  const suburbFilter = params.get('suburb')

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sort, setSort] = useState('Newest')
  const [showFilters, setShowFilters] = useState(false)
  const [minP, setMinP] = useState('')
  const [maxP, setMaxP] = useState('')
  const [bedsMin, setBedsMin] = useState(0)
  const [bathsMin, setBathsMin] = useState(0)
  const [furnOnly, setFurnOnly] = useState(false)
  const [verOnly, setVerOnly] = useState(false)
  const [parkReq, setParkReq] = useState(false)
  const [kinds, setKinds] = useState<string[]>([])
  const togKind = (k: string) => setKinds(p => p.includes(k) ? p.filter(x => x !== k) : [...p, k])

  const results = LISTINGS.filter(l => {
    if (l.type !== (mode === 'buy' ? 'sale' : 'rent')) return false
    if (suburbFilter && l.suburb !== suburbFilter) return false
    if (furnOnly && !l.furnished) return false
    if (verOnly && !l.verified) return false
    if (parkReq && l.parking === 0) return false
    if (kinds.length > 0 && !kinds.includes(l.kind)) return false
    if (l.beds < bedsMin) return false
    if (l.baths < bathsMin) return false
    if (minP && l.price < Number(minP.replace(/\D/g, ''))) return false
    if (maxP && l.price > Number(maxP.replace(/\D/g, ''))) return false
    return true
  })

  const inp = (val: string, set: (v: string) => void, ph: string) => (
    <input value={val} onChange={e => set(e.target.value)} placeholder={ph} style={{ width: '100%', border: `1px solid ${C.sand}`, outline: 'none', padding: '8px 10px', borderRadius: C.r, fontSize: 12, fontFamily: C.sans, color: C.ink, background: C.ground, boxSizing: 'border-box' as const }}
      onFocus={e => e.target.style.borderColor = C.terra}
      onBlur={e => e.target.style.borderColor = C.sand}
    />
  )

  const Filters = () => (
    <div style={{ background: C.white, borderRadius: C.r, padding: '18px 16px', boxShadow: C.sh0 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.stone, marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${C.sand}` }}>Filters</div>

      {/* Mode */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.stone, marginBottom: 8 }}>Listing type</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['buy', 'rent'] as Mode[]).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ flex: 1, border: `1.5px solid ${mode === m ? C.terra : C.sand}`, background: mode === m ? '#fdf0ea' : 'none', cursor: 'pointer', padding: '7px 0', borderRadius: C.r, fontSize: 11, fontWeight: 700, color: mode === m ? C.terra : C.stone, fontFamily: C.sans, textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.13s' }}>
              {m === 'buy' ? 'Sale' : 'Rent'}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.stone, marginBottom: 8 }}>Price</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {inp(minP, setMinP, 'Min \u20a6')}
          {inp(maxP, setMaxP, 'Max \u20a6')}
        </div>
      </div>

      {/* Beds */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.stone, marginBottom: 8 }}>Min beds</div>
        <div style={{ display: 'flex', gap: 5 }}>
          {[0, 1, 2, 3, 4].map(n => (
            <button key={n} onClick={() => setBedsMin(n)} style={{ flex: 1, border: `1.5px solid ${bedsMin === n ? C.terra : C.sand}`, background: bedsMin === n ? '#fdf0ea' : 'none', cursor: 'pointer', padding: '6px 0', borderRadius: C.r, fontSize: 11, fontWeight: 700, color: bedsMin === n ? C.terra : C.stone, fontFamily: C.sans, transition: 'all 0.13s' }}>
              {n === 0 ? 'Any' : n === 4 ? '4+' : n}
            </button>
          ))}
        </div>
      </div>

      {/* Baths */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.stone, marginBottom: 8 }}>Min baths</div>
        <div style={{ display: 'flex', gap: 5 }}>
          {[0, 1, 2, 3].map(n => (
            <button key={n} onClick={() => setBathsMin(n)} style={{ flex: 1, border: `1.5px solid ${bathsMin === n ? C.terra : C.sand}`, background: bathsMin === n ? '#fdf0ea' : 'none', cursor: 'pointer', padding: '6px 0', borderRadius: C.r, fontSize: 11, fontWeight: 700, color: bathsMin === n ? C.terra : C.stone, fontFamily: C.sans, transition: 'all 0.13s' }}>
              {n === 0 ? 'Any' : n === 3 ? '3+' : n}
            </button>
          ))}
        </div>
      </div>

      {/* Property type */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.stone, marginBottom: 8 }}>Property type</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {['Detached Duplex', 'Semi-Detached Duplex', 'Terraced Duplex', 'Detached Bungalow', 'Apartment', 'Studio Apartment', 'Land'].map(k => (
            <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12, color: C.ink }}>
              <input type="checkbox" checked={kinds.includes(k)} onChange={() => togKind(k)} /> {k}
            </label>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {[[furnOnly, setFurnOnly, 'Furnished only'], [verOnly, setVerOnly, 'Verified listings only'], [parkReq, setParkReq, 'Parking required']].map(([val, setter, label]) => (
          <label key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12, color: C.ink }}>
            <input type="checkbox" checked={val as boolean} onChange={e => (setter as (v: boolean) => void)(e.target.checked)} /> {label as string}
          </label>
        ))}
      </div>

      <button onClick={() => { setBedsMin(0); setBathsMin(0); setFurnOnly(false); setVerOnly(false); setParkReq(false); setKinds([]); setMinP(''); setMaxP('') }} style={{ width: '100%', border: `1px solid ${C.sand}`, background: 'none', cursor: 'pointer', padding: '7px', borderRadius: C.r, fontSize: 11, fontWeight: 600, color: C.stone, fontFamily: C.sans }}>
        Clear all
      </button>
    </div>
  )

  return (
    <div style={{ maxWidth: 1360, margin: '0 auto', padding: mob ? '20px 16px' : '28px 40px' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h1 style={{ fontFamily: C.display, fontSize: mob ? 20 : 26, fontWeight: 600, color: C.ink, marginBottom: 2 }}>Properties {mode === 'buy' ? 'for sale' : 'to rent'}{suburbFilter ? ` in ${suburbFilter}` : ''}</h1>
          <div style={{ fontSize: 11, color: C.stone, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>{results.length} listing{results.length !== 1 ? 's' : ''} matching your criteria</span>
            {suburbFilter && (
              <Link to="/app/search" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, background: C.sand, color: C.ink, padding: '2px 8px', borderRadius: C.r, fontSize: 10.5, fontWeight: 600 }}>{suburbFilter} <I.X s={9} /></Link>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {mob && (
            <button onClick={() => setShowFilters(!showFilters)} style={{ border: `1px solid ${C.sand}`, background: C.white, cursor: 'pointer', padding: '7px 12px', borderRadius: C.r, fontSize: 12, fontWeight: 600, color: C.ink, fontFamily: C.sans, display: 'flex', alignItems: 'center', gap: 5 }}>
              <I.Filter /> Filters {results.length !== LISTINGS.length ? `(${LISTINGS.length - results.length} active)` : ''}
            </button>
          )}
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ border: `1px solid ${C.sand}`, background: C.white, cursor: 'pointer', padding: '7px 10px', borderRadius: C.r, fontSize: 12, fontFamily: C.sans, color: C.ink, outline: 'none' }}>
            <option>Newest</option>
            <option>Price: low to high</option>
            <option>Price: high to low</option>
            <option>Largest first</option>
          </select>
          <div style={{ display: 'flex', border: `1px solid ${C.sand}`, borderRadius: C.r, overflow: 'hidden' }}>
            {([['grid', <I.Grid key="g" />], ['map', <I.Map key="m" />]] as [string, React.ReactNode][]).map(([v, ico]) => (
              <button key={v} onClick={() => v === 'map' ? nav('map') : setViewMode('grid')} style={{ border: 'none', background: viewMode === v ? C.ink : C.white, cursor: 'pointer', padding: '7px 11px', color: viewMode === v ? C.white : C.stone, display: 'flex', alignItems: 'center', transition: 'all 0.13s' }}>
                {ico}
              </button>
            ))}
          </div>
        </div>
      </div>

      {mob && showFilters && <div style={{ marginBottom: 16 }}><Filters /></div>}

      <div style={{ display: mob ? 'block' : 'grid', gridTemplateColumns: '250px 1fr', gap: 24 }}>
        {!mob && <Filters />}
        <div>
          {results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 20px', color: C.stone, background: C.white, borderRadius: C.r }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>◻</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.ink, marginBottom: 6 }}>No listings match these filters</div>
              <div style={{ fontSize: 13 }}>Try expanding your price range or removing a filter</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : viewMode === 'list' ? '1fr' : 'repeat(auto-fill, minmax(268px, 1fr))', gap: 16 }}>
              {results.map(l => <Card key={l.id} l={l} saved={saved} save={save} hero={viewMode === 'list'} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
