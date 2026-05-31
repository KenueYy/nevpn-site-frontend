import { apiRequest } from '@/api/client'
import type { SupportResponse, SupportTicketRequest } from '@/types/support'

export function getSupport() {
  return apiRequest<SupportResponse>('/api/v1/support')
}

export function submitTicket(data: SupportTicketRequest) {
  return apiRequest<{ message: string }>('/api/v1/support/tickets', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
