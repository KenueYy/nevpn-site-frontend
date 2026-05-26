import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { Plan, PlanStatus } from '@/types/plan'
import { formatDuration, formatPrice } from '@/utils/format'
import { cn } from '@/utils/cn'

interface TariffCardProps {
  plan: Plan
  status: PlanStatus
  onSelect?: (plan: Plan) => void
  isSelecting?: boolean
  compact?: boolean
}

export function TariffCard({
  plan,
  status,
  onSelect,
  isSelecting,
  compact,
}: TariffCardProps) {
  const disabled = status === 'inactive' || status === 'unavailable' || status === 'current'

  return (
    <Card
      className={cn(
        'flex h-full flex-col',
        status === 'recommended' && 'border-navy-800 ring-1 ring-navy-800/20',
        status === 'current' && 'border-navy-300 bg-navy-50/40',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-navy-950">{plan.name}</h3>
        <Badge status={status} />
      </div>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-navy-950">
        {formatPrice(plan.price)}
        <span className="ml-1 text-sm font-normal text-navy-500">/ {formatDuration(plan.durationDays)}</span>
      </p>
      {!compact ? (
        <p className="mt-3 text-sm leading-relaxed text-navy-600">{plan.description}</p>
      ) : null}
      <ul className="mt-5 flex-1 space-y-2">
        {plan.features.slice(0, compact ? 4 : 8).map((f) => (
          <li key={f} className="flex gap-2 text-sm text-navy-700">
            <span className="text-navy-400">—</span>
            {f}
          </li>
        ))}
      </ul>
      {onSelect ? (
        <Button
          className="mt-6 w-full"
          variant={status === 'recommended' ? 'primary' : 'secondary'}
          disabled={disabled}
          isLoading={isSelecting}
          onClick={() => onSelect(plan)}
        >
          {status === 'current'
            ? 'Текущий тариф'
            : status === 'inactive'
              ? 'Недоступен'
              : 'Выбрать тариф'}
        </Button>
      ) : null}
    </Card>
  )
}
