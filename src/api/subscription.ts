import { apiRequest } from '@/api/client'
import type { Subscription } from '@/types/subscription'

export function getSubscription() {
  return apiRequest<Subscription>('/api/v1/subscription')
}
