import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Loader } from '@/components/ui/Loader'
import { useAuth } from '@/hooks/useAuth'
import { useAuthModal } from '@/contexts/AuthModalContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, profileQuery } = useAuth()
  const location = useLocation()
  const { openAuth } = useAuthModal()

  useEffect(() => {
    if (!isLoading && !isAuthenticated && profileQuery.isError) {
      openAuth(location.pathname)
    }
  }, [isLoading, isAuthenticated, profileQuery.isError, location.pathname, openAuth])

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />
  }

  return children
}
