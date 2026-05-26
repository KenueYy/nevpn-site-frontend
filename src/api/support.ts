import { apiRequest } from '@/api/client'
import type { SupportResponse } from '@/types/support'

export function getSupport() {
  return apiRequest<SupportResponse>('/api/v1/support')
}
