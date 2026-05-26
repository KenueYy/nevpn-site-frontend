import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { Plan } from '@/types/plan'
import { formatPrice } from '@/utils/format'
import { getPlanUiStatus } from '@/utils/plan'

interface AdminTariffTableProps {
  plans: Plan[]
  onEdit: (plan: Plan) => void
  onDelete: (plan: Plan) => void
}

export function AdminTariffTable({ plans, onEdit, onDelete }: AdminTariffTableProps) {
  if (plans.length === 0) {
    return <p className="text-sm text-navy-500">Тарифов пока нет</p>
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-navy-100">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-navy-100 bg-navy-50/50">
          <tr>
            <th className="px-4 py-3 font-medium text-navy-700">ID</th>
            <th className="px-4 py-3 font-medium text-navy-700">Название</th>
            <th className="px-4 py-3 font-medium text-navy-700">Цена</th>
            <th className="px-4 py-3 font-medium text-navy-700">Срок</th>
            <th className="px-4 py-3 font-medium text-navy-700">Активен</th>
            <th className="px-4 py-3 font-medium text-navy-700">Метка</th>
            <th className="px-4 py-3 font-medium text-navy-700">Действия</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id} className="border-b border-navy-50 last:border-0">
              <td className="px-4 py-3 text-navy-600">{plan.id}</td>
              <td className="px-4 py-3 font-medium text-navy-950">{plan.name}</td>
              <td className="px-4 py-3">{formatPrice(plan.price)}</td>
              <td className="px-4 py-3">{plan.durationDays} дн.</td>
              <td className="px-4 py-3">{plan.active ? 'Да' : 'Нет'}</td>
              <td className="px-4 py-3">
                <Badge status={getPlanUiStatus(plan)} />
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => onEdit(plan)}>
                    Изменить
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => onDelete(plan)}>
                    Удалить
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
