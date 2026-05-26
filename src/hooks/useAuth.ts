import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { login, logout as logoutApi, sendCode } from '@/api/auth'
import { getProfile } from '@/api/profile'
import type { AuthUser, Profile, UserRole } from '@/types/user'
import { ApiError } from '@/types/api'

export const authKeys = {
  profile: ['profile'] as const,
}

function profileToUser(profile: Profile): AuthUser {
  return {
    id: profile.id,
    email: profile.email,
    role: profile.role,
    createdAt: profile.created_at,
  }
}

export function useProfileQuery(enabled = true) {
  return useQuery({
    queryKey: authKeys.profile,
    queryFn: getProfile,
    enabled,
    retry: (count, error) => {
      if (error instanceof ApiError && error.status === 401) return false
      return count < 1
    },
    staleTime: 60_000,
  })
}

export function useAuth() {
  const queryClient = useQueryClient()
  const profileQuery = useProfileQuery()

  const user: AuthUser | null = profileQuery.data ? profileToUser(profileQuery.data) : null

  const isAuthenticated = !!user && !profileQuery.isError
  const isAdmin = user?.role === 'admin'
  const isLoading = profileQuery.isLoading

  const sendCodeMutation = useMutation({
    mutationFn: (email: string) => sendCode(email),
  })

  const loginMutation = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) => login(email, code),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authKeys.profile })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.profile })
      queryClient.removeQueries({ queryKey: ['subscription'] })
    },
  })

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync()
    } catch {
      queryClient.removeQueries({ queryKey: authKeys.profile })
    }
  }

  const refetchProfile = () => profileQuery.refetch()

  return {
    user,
    isAuthenticated,
    isAdmin,
    isLoading,
    profileQuery,
    sendCodeMutation,
    loginMutation,
    logout,
    logoutMutation,
    refetchProfile,
  }
}

// re-export for role checks
export type { UserRole }
