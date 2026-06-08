import { apiRequest } from '@/api/client'
import type { SupportResponse, SupportTicketRequest, Ticket } from '@/types/support'

export function getSupport() {
  return apiRequest<SupportResponse>('/api/v1/support')
}

export function submitTicket(data: SupportTicketRequest) {
  return apiRequest<{ message: string }>('/api/v1/support/tickets', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function getTickets() {
  return apiRequest<Ticket[]>('/api/v1/tickets')
}

export function getAdminTickets() {
  return apiRequest<Ticket[]>('/api/v1/admin/tickets')
}

export function updateTicketStatus(id: string, status: string) {
  return apiRequest<{ message: string; status: string }>(`/api/v1/admin/tickets/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}
