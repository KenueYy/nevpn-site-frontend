import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Loader } from '@/components/ui/Loader'
import { Button } from '@/components/ui/Button'
import { useSupportModal } from '@/contexts/SupportModalContext'
import { useSupportQuery } from '@/hooks/useSupport'
import { SupportTicketModal } from '@/components/support/SupportTicketModal'

export function SupportModal() {
  const { isOpen, closeSupport } = useSupportModal()
  const { data, isLoading, isError } = useSupportQuery()
  const [ticketOpen, setTicketOpen] = useState(false)

  if (!data) return null

  const handleOpenTicket = () => {
    closeSupport()
    setTicketOpen(true)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeSupport} title="Поддержка" className="max-w-lg">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader />
          </div>
        ) : null}

        {isError ? (
          <p className="mb-4 text-sm text-navy-600">Показаны локальные контакты — сервер недоступен.</p>
        ) : null}

        <p className="mb-6 text-sm text-navy-600">
          Выберите удобный способ связи. Мы ответим в рабочее время.
        </p>
        <div className="space-y-4">
          <a
            href={data.telegram.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-xl border border-navy-100 p-4 transition-colors hover:border-navy-300 hover:bg-navy-50"
          >
            <span className="font-medium text-navy-900">{data.telegram.label}</span>
            <span className="text-sm text-navy-600">{data.telegram.handle}</span>
          </a>
          <a
            href={`mailto:${data.email.address}`}
            className="flex items-center justify-between rounded-xl border border-navy-100 p-4 transition-colors hover:border-navy-300 hover:bg-navy-50"
          >
            <span className="font-medium text-navy-900">{data.email.label}</span>
            <span className="text-sm text-navy-600">{data.email.address}</span>
          </a>
        </div>

        <div className="mt-6">
          <Button variant="primary" className="w-full" onClick={handleOpenTicket}>
            Оставить обращение
          </Button>
        </div>

        <div className="mt-8">
          <p className="text-sm font-medium text-navy-900">{data.faq.label}</p>
          <ul className="mt-4 space-y-4">
            {data.faq.items.map((item) => (
              <li key={item.q}>
                <p className="text-sm font-medium text-navy-800">{item.q}</p>
                <p className="mt-1 text-sm text-navy-600">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      <SupportTicketModal isOpen={ticketOpen} onClose={() => setTicketOpen(false)} />
    </>
  )
}
