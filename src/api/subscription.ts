import { apiRequest } from '@/api/client'
import type { Subscription } from '@/types/subscription'

export function getSubscription() {
  return apiRequest<Subscription>('/api/v1/subscription')
}

export interface TrialResponse {
  message: string
  expire_at: string
  status: string
}

export function startTrial() {
  return apiRequest<TrialResponse>('/api/v1/trial', { method: 'POST' })
}
