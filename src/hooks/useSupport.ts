import { useQuery } from '@tanstack/react-query'
import { getSupport } from '@/api/support'
import { supportConfig } from '@/config/support'
import type { SupportResponse } from '@/types/support'

const fallback: SupportResponse = {
  telegram: { ...supportConfig.telegram },
  email: { label: supportConfig.email.label, address: supportConfig.email.address },
  faq: {
    label: supportConfig.faq.label,
    items: supportConfig.faq.items.map((item) => ({ ...item })),
  },
}

export function useSupportQuery() {
  return useQuery({
    queryKey: ['support'],
    queryFn: getSupport,
    staleTime: 300_000,
    placeholderData: fallback,
  })
}
