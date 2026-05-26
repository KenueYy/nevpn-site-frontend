import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

const SupportModalContext = createContext<{
  isOpen: boolean
  openSupport: () => void
  closeSupport: () => void
} | null>(null)

export function SupportModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const openSupport = useCallback(() => setIsOpen(true), [])
  const closeSupport = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ isOpen, openSupport, closeSupport }),
    [isOpen, openSupport, closeSupport],
  )

  return (
    <SupportModalContext.Provider value={value}>{children}</SupportModalContext.Provider>
  )
}

export function useSupportModal() {
  const ctx = useContext(SupportModalContext)
  if (!ctx) throw new Error('useSupportModal must be used within SupportModalProvider')
  return ctx
}
