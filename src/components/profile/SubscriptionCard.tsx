import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Loader } from '@/components/ui/Loader'
import type { Subscription } from '@/types/subscription'
import { formatDate } from '@/utils/format'
import { ApiError } from '@/types/api'
import { cn } from '@/utils/cn'

const statusLabels: Record<Subscription['status'], string> = {
  active: 'Активна',
  expired: 'Истекла',
  none: 'Нет подписки',
  unknown: 'Неизвестно',
}

interface SubscriptionCardProps {
  subscription: Subscription | undefined
  isLoading: boolean
  error: unknown
  onRetry?: () => void
}

export function SubscriptionCard({
  subscription,
  isLoading,
  error,
  onRetry,
}: SubscriptionCardProps) {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-navy-950">Подписка</h2>

      {isLoading ? (
        <div className="mt-8 flex justify-center py-6">
          <Loader />
        </div>
      ) : null}

      {error ? (
        <div className="mt-4">
          <p className="text-sm text-red-600">
            {error instanceof ApiError ? error.message : 'Не удалось загрузить статус'}
          </p>
          {onRetry ? (
            <Button className="mt-3" variant="secondary" size="sm" onClick={onRetry}>
              Повторить
            </Button>
          ) : null}
        </div>
      ) : null}

      {!isLoading && !error && subscription ? (
        <dl className="mt-6 space-y-4">
          <div>
            <dt className="text-xs uppercase tracking-wide text-navy-500">Статус</dt>
            <dd className="mt-1 font-medium text-navy-950">{statusLabels[subscription.status]}</dd>
          </div>
          {subscription.plan_name ? (
            <div>
              <dt className="text-xs uppercase tracking-wide text-navy-500">Тариф</dt>
              <dd className="mt-1 text-navy-950">{subscription.plan_name}</dd>
            </div>
          ) : null}
          {subscription.expire_at ? (
            <div>
              <dt className="text-xs uppercase tracking-wide text-navy-500">Действует до</dt>
              <dd className="mt-1 text-navy-950">{formatDate(subscription.expire_at)}</dd>
            </div>
          ) : null}
          {subscription.subscription_url ? (
            <div>
              <dt className="text-xs uppercase tracking-wide text-navy-500">Ссылка подключения</dt>
              <dd className="mt-1 break-all text-sm text-navy-700">
                {subscription.subscription_url}
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      {!isLoading && !error && subscription?.subscription_url ? (
        <a
          href={subscription.subscription_url}
          target="_blank"
          rel="noreferrer"
          className={cn(
            'mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl border-2 border-navy-900 bg-navy-900 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-navy-900/20 transition-all duration-200 hover:bg-navy-800 hover:shadow-xl hover:shadow-navy-900/30 hover:-translate-y-0.5 active:translate-y-0 active:bg-navy-950',
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          Открыть конфигурацию
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 shrink-0 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/tariffs">
          <Button variant="secondary" size="sm">
            Тарифы
          </Button>
        </Link>
      </div>
    </Card>
  )
}
