import { Link } from 'react-router-dom'
import { C } from '../lib/theme'
import { img } from '../lib/utils'
import { AGENTS } from '../lib/data'

export function AgentSwitcher({ activeId, linkFor }: { activeId: string; linkFor?: (id: string) => string }) {
  return (
    <div style={{ display: 'flex', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
      {AGENTS.map(a => (
        <Link key={a.id} to={linkFor ? linkFor(a.id) : `/app/agent/${a.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, border: `1.5px solid ${activeId === a.id ? C.terra : C.sand}`, background: activeId === a.id ? '#fdf0ea' : C.white, cursor: 'pointer', padding: '8px 16px 8px 10px', borderRadius: C.r, boxShadow: C.sh0, transition: 'all 0.13s' }}>
          <img src={img(a.img, 60, 60)} alt={a.name} style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: activeId === a.id ? C.terra : C.ink, fontFamily: C.sans }}>{a.name}</span>
        </Link>
      ))}
    </div>
  )
}
