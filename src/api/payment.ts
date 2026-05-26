import { apiRequest } from '@/api/client'
import type { CreatePaymentRequest, YooKassaPaymentResponse } from '@/types/payment'

export function createPayment(body: CreatePaymentRequest) {
  return apiRequest<YooKassaPaymentResponse>('/api/v1/yookassa/payment/create', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function getPaymentConfirmationUrl(response: YooKassaPaymentResponse): string | null {
  return response.confirmation?.confirmation_url ?? null
}
