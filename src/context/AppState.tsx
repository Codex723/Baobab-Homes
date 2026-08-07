import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import type { Mode } from '../lib/types'

interface AppStateValue {
  mode: Mode
  setMode: (m: Mode) => void
  saved: Set<string>
  save: (id: string) => void
}

const AppStateContext = createContext<AppStateValue | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('buy')
  const [saved, setSaved] = useState<Set<string>>(new Set())

  const save = useCallback((id: string) => {
    setSaved((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  return (
    <AppStateContext.Provider value={{ mode, setMode, saved, save }}>
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used inside AppStateProvider')
  return ctx
}
