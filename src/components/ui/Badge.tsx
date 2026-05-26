import { cn } from '@/utils/cn'
import type { PlanStatus } from '@/types/plan'

const labels: Record<PlanStatus, string> = {
  active: 'Доступен',
  inactive: 'Скрыт',
  current: 'Ваш тариф',
  recommended: 'Рекомендуем',
  unavailable: 'Недоступен',
}

const styles: Record<PlanStatus, string> = {
  active: 'bg-navy-50 text-navy-700',
  inactive: 'bg-navy-100 text-navy-500',
  current: 'bg-navy-900 text-white',
  recommended: 'bg-navy-800 text-white',
  unavailable: 'bg-navy-100 text-navy-400',
}

export function Badge({ status }: { status: PlanStatus }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
        styles[status],
      )}
    >
      {labels[status]}
    </span>
  )
}
