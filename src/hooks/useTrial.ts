import { useMutation, useQueryClient } from '@tanstack/react-query'
import { startTrial } from '@/api/subscription'


export function useTrialMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: startTrial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] })
    }
  })
}
