import { Link } from 'react-router-dom'
import { TariffCard } from '@/components/tariffs/TariffCard'
import { Button } from '@/components/ui/Button'
import { ErrorState } from '@/components/ui/ErrorState'
import { Loader } from '@/components/ui/Loader'
import { Skeleton } from '@/components/ui/Skeleton'
import { useAuth } from '@/hooks/useAuth'
import { usePlansQuery } from '@/hooks/usePlans'
import { useCreatePayment } from '@/hooks/usePayment'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { getPlanUiStatus } from '@/utils/plan'
import { ApiError } from '@/types/api'

interface TariffsSectionProps {
  limit?: number
  showTitle?: boolean
  currentPlanId?: number | null
}

export function TariffsSection({ limit = 3, showTitle = true, currentPlanId }: TariffsSectionProps) {
  const { data: plans, isLoading, isError, error, refetch } = usePlansQuery()
  const { isAuthenticated } = useAuth()
  const { openAuth } = useAuthModal()
  const payment = useCreatePayment()

  const handleSelect = (planId: number) => {
    if (!isAuthenticated) {
      openAuth('/tariffs')
      return
    }
    payment.mutate(planId)
  }

  const displayPlans = plans
    ?.filter((p) => p.active)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id)
    .slice(0, limit)

  return (
    <section id="tariffs" className="scroll-mt-20 bg-navy-50/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showTitle ? (
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy-950 sm:text-3xl">
                Тарифы
              </h2>
              <p className="mt-3 text-navy-600">Выберите подходящий план для стабильного доступа.</p>
            </div>
            <Link to="/tariffs">
              <Button variant="ghost">Все тарифы →</Button>
            </Link>
          </div>
        ) : null}

        {isLoading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        ) : null}

        {isError ? (
          <ErrorState
            message={error instanceof ApiError ? error.message : undefined}
            onRetry={() => refetch()}
          />
        ) : null}

        {!isLoading && !isError && displayPlans?.length === 0 ? (
          <p className="mt-12 text-center text-navy-500">Тарифы скоро появятся</p>
        ) : null}

        {displayPlans && displayPlans.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayPlans.map((plan) => (
              <TariffCard
                key={plan.id}
                plan={plan}
                status={getPlanUiStatus(plan, { currentPlanId })}
                compact
                onSelect={(p) => handleSelect(p.id)}
                isSelecting={payment.isPending && payment.variables === plan.id}
              />
            ))}
          </div>
        ) : null}

        {payment.isError ? (
          <p className="mt-4 text-center text-sm text-red-600">
            {(payment.error as ApiError).message}
          </p>
        ) : null}

        {payment.isPending ? (
          <div className="mt-6 flex justify-center">
            <Loader />
          </div>
        ) : null}
      </div>
    </section>
  )
}
