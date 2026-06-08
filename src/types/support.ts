export interface SupportFaqItem {
  q: string
  a: string
}

export interface SupportResponse {
  telegram: {
    label: string
    url: string
    handle: string
  }
  email: {
    label: string
    address: string
  }
  faq: {
    label: string
    items: SupportFaqItem[]
  }
}

export interface SupportTicketRequest {
  subject: string
  description: string
  contact_method: string
  contact: string
}

export type TicketStatus = 'open' | 'pending' | 'in_progress' | 'resolved' | 'closed'

export interface Ticket {
  id: string
  user_id?: string
  subject: string
  description: string
  contact_method: string
  contact: string
  status: TicketStatus
  created_at: string
  updated_at: string
}
