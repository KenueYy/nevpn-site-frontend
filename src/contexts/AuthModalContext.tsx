import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

interface AuthModalContextValue {
  isOpen: boolean
  redirectPath: string | null
  openAuth: (redirectPath?: string) => void
  closeAuth: () => void
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null)

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [redirectPath, setRedirectPath] = useState<string | null>(null)

  const openAuth = useCallback((path?: string) => {
    setRedirectPath(path ?? null)
    setIsOpen(true)
  }, [])

  const closeAuth = useCallback(() => {
    setIsOpen(false)
    setRedirectPath(null)
  }, [])

  const value = useMemo(
    () => ({ isOpen, redirectPath, openAuth, closeAuth }),
    [isOpen, redirectPath, openAuth, closeAuth],
  )

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext)
  if (!ctx) throw new Error('useAuthModal must be used within AuthModalProvider')
  return ctx
}
