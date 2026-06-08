import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAdminTickets, updateTicketStatus } from '@/api/support'
import { Loader } from '@/components/ui/Loader'
import { ErrorState } from '@/components/ui/ErrorState'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import type { Ticket, TicketStatus } from '@/types/support'

const STATUS_LABELS: Record<TicketStatus, string> = {
  open: 'Открыт',
  pending: 'Ожидает',
  in_progress: 'В работе',
  resolved: 'Решён',
  closed: 'Закрыт',
}

const STATUS_OPTIONS: { value: TicketStatus; label: string }[] = [
  { value: 'open', label: 'Открыт' },
  { value: 'pending', label: 'Ожидает' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'resolved', label: 'Решён' },
  { value: 'closed', label: 'Закрыт' },
]

const STATUS_COLORS: Record<TicketStatus, string> = {
  open: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-blue-100 text-blue-700',
  resolved: 'bg-gray-100 text-gray-500',
  closed: 'bg-gray-100 text-gray-500',
}

function formatDate(iso: string): string {
  if (!iso) return '—'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function AdminTicketsSection() {
  const queryClient = useQueryClient()
  const [selected, setSelected] = useState<Ticket | null>(null)

  const { data: tickets, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin', 'tickets'],
    queryFn: getAdminTickets,
    staleTime: 15_000,
  })

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateTicketStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'tickets'] })
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader />
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorState
        message={error instanceof Error ? error.message : 'Не удалось загрузить тикеты'}
        onRetry={() => refetch()}
      />
    )
  }

  if (!tickets || tickets.length === 0) {
    return <p className="py-8 text-sm text-navy-500">Тикетов пока нет</p>
  }

  return (
    <>
      <div className="space-y-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            role="button"
            tabIndex={0}
            className="w-full cursor-pointer rounded-lg border border-navy-100 bg-white p-4 text-left transition-shadow hover:shadow-sm hover:border-navy-200"
            onClick={() => setSelected(ticket)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setSelected(ticket)
              }
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-navy-400">#{ticket.id.slice(0, 8)}</span>
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2 py-0.5 text-xs font-medium',
                      STATUS_COLORS[ticket.status],
                    )}
                  >
                    {STATUS_LABELS[ticket.status]}
                  </span>
                </div>
                <h3 className="mt-1 text-sm font-semibold text-navy-900">{ticket.subject}</h3>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-navy-500">
                  <span>{formatDate(ticket.created_at)}</span>
                  <span>{ticket.contact_method}: {ticket.contact}</span>
                </div>
              </div>
              <svg
                className="mt-1 h-4 w-4 shrink-0 text-navy-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={`Тикет #${selected?.id.slice(0, 8)}`}
        className="max-w-lg"
      >
        {selected ? (
          <div className="space-y-5">
            <div>
              <p className="text-xs text-navy-400">Тема</p>
              <p className="mt-0.5 text-sm font-semibold text-navy-900">{selected.subject}</p>
            </div>

            <div>
              <p className="text-xs text-navy-400">Статус</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={statusMutation.isPending || selected.status === opt.value}
                    onClick={() => {
                      statusMutation.mutate(
                        { id: selected.id, status: opt.value },
                        {
                          onSuccess: () => setSelected((prev) => prev ? { ...prev, status: opt.value } : null),
                        },
                      )
                    }}
                    className={cn(
                      'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
                      selected.status === opt.value
                        ? 'bg-navy-900 text-white border-navy-900'
                        : 'border-navy-200 bg-white text-navy-600 hover:border-navy-400 hover:bg-navy-50',
                      (statusMutation.isPending || selected.status === opt.value) && 'cursor-default',
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-navy-400">Описание</p>
              <p className="mt-1 rounded-lg bg-navy-50 p-3 text-sm text-navy-700 whitespace-pre-wrap">
                {selected.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-navy-400">Создан</p>
                <p className="mt-0.5 text-navy-700">{formatDate(selected.created_at)}</p>
              </div>
              <div>
                <p className="text-xs text-navy-400">Обновлён</p>
                <p className="mt-0.5 text-navy-700">{formatDate(selected.updated_at)}</p>
              </div>
              <div>
                <p className="text-xs text-navy-400">Способ связи</p>
                <p className="mt-0.5 text-navy-700">{selected.contact_method}</p>
              </div>
              <div>
                <p className="text-xs text-navy-400">Контакт</p>
                <p className="mt-0.5 text-navy-700">{selected.contact}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
                Закрыть
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  )
}
