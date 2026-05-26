import { apiRequest } from '@/api/client'
import type { LoginResponse, SendCodeResponse } from '@/types/user'

export function sendCode(email: string) {
  return apiRequest<SendCodeResponse>('/api/v1/sendcode', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

export function login(email: string, code: string) {
  return apiRequest<LoginResponse>('/api/v1/login', {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  })
}

export function logout() {
  return apiRequest<{ message: string }>('/api/v1/logout', {
    method: 'POST',
  })
}
