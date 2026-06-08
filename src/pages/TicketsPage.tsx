import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTickets } from '@/api/support'
import { Loader } from '@/components/ui/Loader'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import type { Ticket, TicketStatus } from '@/types/support'

const PAGE_SIZE = 10

const STATUS_LABELS: Record<TicketStatus, string> = {
  open: 'Открыт',
  pending: 'Ожидает',
  in_progress: 'В работе',
  resolved: 'Решён',
  closed: 'Закрыт',
}

const STATUS_STYLES: Record<TicketStatus, string> = {
  open: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-blue-100 text-blue-700',
  resolved: 'bg-navy-100 text-navy-600',
  closed: 'bg-gray-100 text-gray-500',
}

const ACTIVE_STATUSES: TicketStatus[] = ['open', 'pending', 'in_progress']
const RESOLVED_STATUSES: TicketStatus[] = ['resolved', 'closed']

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

function TicketCard({ ticket, onClick }: { ticket: Ticket; onClick: () => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="cursor-pointer rounded-xl border border-navy-100 bg-white p-5 transition-shadow hover:shadow-sm hover:border-navy-200"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-navy-400">#{ticket.id.slice(0, 8)}</p>
          <h3 className="mt-1 text-sm font-semibold text-navy-900 truncate">
            {ticket.subject}
          </h3>
        </div>
        <span
          className={cn(
            'inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium',
            STATUS_STYLES[ticket.status],
          )}
        >
          {STATUS_LABELS[ticket.status]}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-navy-500">
        <span>Создан: {formatDate(ticket.created_at)}</span>
        <span>Обновлён: {formatDate(ticket.updated_at)}</span>
      </div>
    </div>
  )
}

function TicketSection({
  title,
  tickets,
  page,
  onPageChange,
  onTicketClick,
}: {
  title: string
  tickets: Ticket[]
  page: number
  onPageChange: (p: number) => void
  onTicketClick: (ticket: Ticket) => void
}) {
  const totalPages = Math.ceil(tickets.length / PAGE_SIZE)
  const paginated = tickets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <section>
      <h2 className="text-lg font-semibold text-navy-900">{title}</h2>
      {paginated.length === 0 ? (
        <p className="mt-4 text-sm text-navy-500">Нет тикетов</p>
      ) : (
        <div className="mt-4 grid gap-3">
          {paginated.map((t) => (
            <TicketCard key={t.id} ticket={t} onClick={() => onTicketClick(t)} />
          ))}
        </div>
      )}
      {totalPages > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            ← Назад
          </Button>
          <span className="text-sm text-navy-500">
            {page} / {totalPages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Вперёд →
          </Button>
        </div>
      ) : null}
    </section>
  )
}

export function TicketsPage() {
  const { data: tickets, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
    staleTime: 30_000,
  })

  const [activePage, setActivePage] = useState(1)
  const [resolvedPage, setResolvedPage] = useState(1)
  const [selected, setSelected] = useState<Ticket | null>(null)

  const { active, resolved } = useMemo(() => {
    const list = tickets ?? []
    return {
      active: list.filter((t) => ACTIVE_STATUSES.includes(t.status as TicketStatus)),
      resolved: list.filter((t) => RESOLVED_STATUSES.includes(t.status as TicketStatus)),
    }
  }, [tickets])

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
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
    return (
      <EmptyState
        title="У вас пока нет тикетов"
        description="Здесь будут отображаться ваши обращения в поддержку."
      />
    )
  }

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-navy-950">Мои тикеты</h1>
        <div className="mt-8 space-y-10">
          <TicketSection
            title="Активные тикеты"
            tickets={active}
            page={activePage}
            onPageChange={setActivePage}
            onTicketClick={setSelected}
          />
          <TicketSection
            title="Выполненные тикеты"
            tickets={resolved}
            page={resolvedPage}
            onPageChange={setResolvedPage}
            onTicketClick={setSelected}
          />
        </div>
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
              <span
                className={cn(
                  'mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                  STATUS_STYLES[selected.status],
                )}
              >
                {STATUS_LABELS[selected.status]}
              </span>
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

            <div className="flex justify-end pt-2">
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
