import { Link } from 'react-router-dom'
import { ProfileInfo } from '@/components/profile/ProfileInfo'
import { SubscriptionCard } from '@/components/profile/SubscriptionCard'
import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'
import { useAuth } from '@/hooks/useAuth'
import { useSubscriptionQuery } from '@/hooks/useSubscription'
import { useSupportModal } from '@/contexts/SupportModalContext'

export function ProfilePage() {
  const { user, isLoading, logout, logoutMutation, isAdmin } = useAuth()
  const { openSupport } = useSupportModal()
  const subQuery = useSubscriptionQuery(!!user)

  if (isLoading || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-navy-950">Личный кабинет</h1>
        <div className="flex flex-wrap gap-2">
          {isAdmin ? (
            <Link to="/admin">
              <Button variant="secondary" size="sm">
                Админ-панель
              </Button>
            </Link>
          ) : null}
          <Button variant="secondary" size="sm" onClick={openSupport}>
            Поддержка
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => logout()}
            isLoading={logoutMutation.isPending}
          >
            Выйти
          </Button>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <ProfileInfo user={user} />
        <SubscriptionCard
          subscription={subQuery.data}
          isLoading={subQuery.isLoading}
          error={subQuery.error}
          onRetry={() => subQuery.refetch()}
        />
      </div>
    </div>
  )
}
