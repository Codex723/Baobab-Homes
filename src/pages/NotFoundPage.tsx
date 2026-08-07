import { C } from '../lib/theme'
import { useAppNav, type Page } from '../lib/nav'
import { usePageTitle } from '../lib/usePageTitle'

export function NotFound({ message, backTo = 'home', backLabel = 'Back to homepage' }: { message: string; backTo?: Page; backLabel?: string }) {
  const nav = useAppNav()
  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>
      <div style={{ fontFamily: C.display, fontSize: 44, fontWeight: 600, color: C.terra, marginBottom: 8 }}>404</div>
      <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.7, marginBottom: 28 }}>{message}</p>
      <button onClick={() => nav(backTo)} style={{ background: C.ink, color: C.white, border: 'none', cursor: 'pointer', padding: '11px 22px', borderRadius: C.r, fontSize: 13, fontWeight: 600, fontFamily: C.sans }}>{backLabel}</button>
    </div>
  )
}

export function NotFoundPage() {
  usePageTitle('Page not found', {
    description: 'The page you are looking for does not exist. It may have moved or the link may be out of date.',
  })
  return <NotFound message="That page doesn't exist. It may have moved or the link may be out of date." />
}
