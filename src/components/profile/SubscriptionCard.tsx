import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Loader } from '@/components/ui/Loader'
import type { Subscription } from '@/types/subscription'
import { formatDate } from '@/utils/format'
import { ApiError } from '@/types/api'

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
                <a
                  href={subscription.subscription_url}
                  className="text-navy-900 underline hover:no-underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Открыть конфигурацию
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/tariffs">
          <Button variant="secondary" size="sm">
            Тарифы
          </Button>
        </Link>
      </div>
    </Card>
  )
}
