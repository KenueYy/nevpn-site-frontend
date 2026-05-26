import { TariffCard } from '@/components/tariffs/TariffCard'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { Loader } from '@/components/ui/Loader'
import { Skeleton } from '@/components/ui/Skeleton'
import { useAuth } from '@/hooks/useAuth'
import { usePlansQuery } from '@/hooks/usePlans'
import { useCreatePayment } from '@/hooks/usePayment'
import { useSubscriptionQuery } from '@/hooks/useSubscription'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { useSupportModal } from '@/contexts/SupportModalContext'
import { getPlanUiStatus } from '@/utils/plan'
import { ApiError } from '@/types/api'
import type { Plan } from '@/types/plan'

export function TariffsPage() {
  const { data: plans, isLoading, isError, error, refetch } = usePlansQuery()
  const { isAuthenticated } = useAuth()
  const { openAuth } = useAuthModal()
  const { openSupport } = useSupportModal()
  const payment = useCreatePayment()
  const subQuery = useSubscriptionQuery(isAuthenticated)

  const currentPlanId = subQuery.data?.plan_id ?? undefined

  const handleSelect = (plan: Plan) => {
    if (!isAuthenticated) {
      openAuth('/tariffs')
      return
    }
    payment.mutate(plan.id)
  }

  const sorted = plans
    ? [...plans]
        .filter((p) => p.active)
        .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id)
    : []

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-navy-950">Тарифы</h1>
          <p className="mt-3 max-w-lg text-navy-600">
            Сравните планы и выберите подходящий для быстрого и стабильного доступа к сети.
          </p>
        </div>
        <Button variant="secondary" onClick={openSupport}>
          Поддержка
        </Button>
      </div>

      {isLoading ? (
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      ) : null}

      {isError ? (
        <ErrorState
          message={error instanceof ApiError ? error.message : undefined}
          onRetry={() => refetch()}
        />
      ) : null}

      {!isLoading && !isError && sorted.length === 0 ? (
        <EmptyState title="Тарифы пока не добавлены" description="Загляните позже" />
      ) : null}

      {sorted.length > 0 ? (
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {sorted.map((plan) => (
            <TariffCard
              key={plan.id}
              plan={plan}
              status={getPlanUiStatus(plan, { currentPlanId })}
              onSelect={handleSelect}
              isSelecting={payment.isPending && payment.variables === plan.id}
            />
          ))}
        </div>
      ) : null}

      {payment.isError ? (
        <p className="mt-6 text-center text-sm text-red-600">
          {(payment.error as ApiError).message}
        </p>
      ) : null}

      {payment.isPending ? (
        <div className="mt-8 flex justify-center">
          <Loader />
        </div>
      ) : null}
    </div>
  )
}
