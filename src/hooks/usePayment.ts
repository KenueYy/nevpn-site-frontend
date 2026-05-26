import { useMutation } from '@tanstack/react-query'
import { createPayment, getPaymentConfirmationUrl } from '@/api/payment'

export function useCreatePayment() {
  return useMutation({
    mutationFn: (planId: number) => createPayment({ plan_id: planId }),
    onSuccess: (data) => {
      const url = getPaymentConfirmationUrl(data)
      if (url) {
        window.location.href = url
      }
    },
  })
}
