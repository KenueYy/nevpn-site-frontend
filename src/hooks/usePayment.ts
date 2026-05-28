import { useMutation } from '@tanstack/react-query'
import { createPayment, createCustomPayment, getPaymentConfirmationUrl } from '@/api/payment'
import type { CreateCustomPaymentRequest } from '@/types/payment'

const redirectToPayment = (data: Awaited<ReturnType<typeof createPayment>>) => {
  const url = getPaymentConfirmationUrl(data)
  if (url) {
    window.location.href = url
  }
}

export function useCreatePayment() {
  return useMutation({
    mutationFn: (planId: number) => createPayment({ plan_id: planId }),
    onSuccess: redirectToPayment,
  })
}

export function useCreateCustomPayment() {
  return useMutation({
    mutationFn: (body: CreateCustomPaymentRequest) => createCustomPayment(body),
    onSuccess: redirectToPayment,
  })
}
