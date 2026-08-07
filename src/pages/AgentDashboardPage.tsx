import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { C } from '../lib/theme'
import { I } from '../lib/icons'
import { fmt, img, useMobile } from '../lib/utils'
import { AGENTS, LISTINGS } from '../lib/data'
import { AgentSwitcher } from '../components/AgentSwitcher'
import { usePageTitle } from '../lib/usePageTitle'
import { NotFound } from './NotFoundPage'
import type { Listing, Agent } from '../lib/types'

interface DocFile {
  id: string
  name: string
  size: number
  addedAt: string
}

function fmtBytes(n: number) {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`
  return `${(n / 1024 / 1024).toFixed(1)} MB`
}

export function AgentDashboardPage() {
  const { id } = useParams()
  const cur = AGENTS.find(a => a.id === id)
  usePageTitle(cur ? `${cur.name.split(' ')[0]}'s dashboard` : 'Dashboard not found', cur ? {
    description: `Preview of ${cur.name.split(' ')[0]}'s agent dashboard with per-listing document management. Demo only, no login required.`,
    path: `/app/agent/${cur.id}/dashboard`,
  } : undefined)

  if (!cur) {
    return <NotFound message="We couldn't find that agent dashboard." backTo="home" backLabel="Back to homepage" />
  }
  return <DashboardBody cur={cur} />
}

function DashboardBody({ cur }: { cur: Agent }) {
  const mob = useMobile()
  const listings = LISTINGS.filter(l => l.agentId === cur.id)
  const [docs, setDocs] = useState<Record<string, DocFile[]>>({})
  const [openId, setOpenId] = useState<string | null>(listings[0]?.id ?? null)

  const addFiles = (lid: string, files: FileList | null) => {
    if (!files || files.length === 0) return
    const additions: DocFile[] = Array.from(files).map(f => ({
      id: `${lid}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: f.name,
      size: f.size,
      addedAt: 'Just now',
    }))
    setDocs(prev => ({ ...prev, [lid]: [...(prev[lid] ?? []), ...additions] }))
  }

  const removeFile = (lid: string, fid: string) => {
    setDocs(prev => ({ ...prev, [lid]: (prev[lid] ?? []).filter(d => d.id !== fid) }))
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: mob ? '24px 16px 48px' : '48px 40px 64px' }}>
      <AgentSwitcher activeId={cur.id} linkFor={id => `/app/agent/${id}/dashboard`} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.terra, marginBottom: 8 }}>Agent dashboard</div>
          <h1 style={{ fontFamily: C.display, fontSize: mob ? 26 : 32, fontWeight: 600, color: C.ink, lineHeight: 1.1 }}>{cur.name.split(' ')[0]}&rsquo;s listings and files</h1>
        </div>
      </div>

      <div style={{ background: '#fdf0ea', border: `1px solid ${C.terra}`, borderRadius: C.r, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start', margin: '18px 0 32px' }}>
        <span style={{ fontSize: 14, lineHeight: 1 }}>&#9432;</span>
        <div style={{ fontSize: 12.5, color: C.ink, lineHeight: 1.6 }}>
          This is a preview of what a document manager could look like. There is no login yet, so anyone can open any
          agent's dashboard from the switcher above. Files you add here are held in this browser tab only, nothing is
          uploaded anywhere, and the list resets the moment you refresh or leave the page.
        </div>
      </div>

      {listings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: C.stone, background: C.white, borderRadius: C.r }}>
          <div style={{ fontSize: 13 }}>{cur.name.split(' ')[0]} has no active listings right now.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {listings.map(l => (
            <ListingRow
              key={l.id}
              l={l}
              open={openId === l.id}
              onToggle={() => setOpenId(openId === l.id ? null : l.id)}
              files={docs[l.id] ?? []}
              onAdd={files => addFiles(l.id, files)}
              onRemove={fid => removeFile(l.id, fid)}
              mob={mob}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ListingRow({ l, open, onToggle, files, onAdd, onRemove, mob }: {
  l: Listing
  open: boolean
  onToggle: () => void
  files: DocFile[]
  onAdd: (files: FileList | null) => void
  onRemove: (id: string) => void
  mob: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div style={{ background: C.white, borderRadius: C.r, boxShadow: C.sh0, overflow: 'hidden' }}>
      <button onClick={onToggle} style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, padding: mob ? 14 : '16px 20px', textAlign: 'left' }}>
        <div style={{ width: 56, height: 56, borderRadius: C.r, overflow: 'hidden', flexShrink: 0, background: C.sand }}>
          <img src={img(l.img, 160, 160)} alt={l.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: C.ink, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.title}</div>
          <div style={{ fontSize: 11.5, color: C.stone }}>{l.suburb} &middot; Ref {l.ref} &middot; {fmt(l)}</div>
        </div>
        <div style={{ fontSize: 11.5, color: C.stone, display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <I.File s={13} />{files.length} {files.length === 1 ? 'file' : 'files'}
          <span style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s', display: 'flex' }}><I.ChevR s={12} /></span>
        </div>
      </button>

      {open && (
        <div style={{ borderTop: `1px solid ${C.sand}`, padding: mob ? 14 : '16px 20px' }}>
          {files.length === 0 ? (
            <div style={{ fontSize: 12.5, color: C.stone, marginBottom: 14 }}>No documents yet. Add floor plans, certificates, or contracts for this listing.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              {files.map(f => (
                <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.ground, border: `1px solid ${C.sand}`, borderRadius: C.r, padding: '9px 12px' }}>
                  <I.File s={14} />
                  <span style={{ flex: 1, fontSize: 12.5, color: C.ink, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</span>
                  <span style={{ fontSize: 11, color: C.stone, flexShrink: 0 }}>{fmtBytes(f.size)}</span>
                  <span style={{ fontSize: 11, color: C.stone, flexShrink: 0 }}>{f.addedAt}</span>
                  <button onClick={() => onRemove(f.id)} aria-label={`Remove ${f.name}`} style={{ border: 'none', background: 'none', cursor: 'pointer', color: C.stone, flexShrink: 0, display: 'flex', padding: 2 }}
                    onMouseEnter={e => e.currentTarget.style.color = C.terra}
                    onMouseLeave={e => e.currentTarget.style.color = C.stone}
                  ><I.X s={12} /></button>
                </div>
              ))}
            </div>
          )}
          <input ref={inputRef} type="file" multiple style={{ display: 'none' }} onChange={e => { onAdd(e.target.files); e.target.value = '' }} />
          <button onClick={() => inputRef.current?.click()} style={{ display: 'flex', alignItems: 'center', gap: 6, border: `1.5px dashed ${C.sandD}`, background: 'none', cursor: 'pointer', padding: '9px 16px', borderRadius: C.r, fontSize: 12.5, fontWeight: 600, color: C.ink, fontFamily: C.sans }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.terra; e.currentTarget.style.color = C.terra }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.sandD; e.currentTarget.style.color = C.ink }}
          ><I.Plus s={12} />Add file</button>
        </div>
      )}
    </div>
  )
}

