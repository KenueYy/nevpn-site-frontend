import { apiRequest } from '@/api/client'
import type { Profile } from '@/types/user'

export function getProfile() {
  return apiRequest<Profile>('/api/v1/profile')
}
