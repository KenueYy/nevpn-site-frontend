import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ProtectedRoute } from '@/routes/ProtectedRoute'

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth()

  return (
    <ProtectedRoute>
      {isAdmin ? children : <Navigate to="/profile" replace />}
    </ProtectedRoute>
  )
}
