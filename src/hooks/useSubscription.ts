import { useQuery } from '@tanstack/react-query'
import { getSubscription } from '@/api/subscription'

export function useSubscriptionQuery(enabled: boolean) {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: getSubscription,
    enabled,
    staleTime: 60_000,
    retry: (count, error) => {
      const err = error as { status?: number }
      if (err.status === 401) return false
      return count < 1
    },
  })
}
