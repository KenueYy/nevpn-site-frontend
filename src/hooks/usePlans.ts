import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createPlan, deletePlan, getAdminPlans, reorderPlans, updatePlan } from '@/api/admin'
import { calculatePlan, getPlans } from '@/api/plans'
import { planToAdminCreate } from '@/utils/plan'
import type { AdminPlanUpdate } from '@/types/plan'
import type { AdminTariffFormValues } from '@/components/admin/AdminTariffForm'

export const planKeys = {
  all: ['plans'] as const,
  admin: ['plans', 'admin'] as const,
}

export function usePlansQuery() {
  return useQuery({
    queryKey: planKeys.all,
    queryFn: getPlans,
    staleTime: 30_000,
  })
}

export function useAdminPlansQuery(enabled: boolean) {
  return useQuery({
    queryKey: planKeys.admin,
    queryFn: getAdminPlans,
    enabled,
    staleTime: 15_000,
  })
}

function formToCreatePayload(values: AdminTariffFormValues) {
  return planToAdminCreate({
    name: values.name,
    description: values.description,
    imageUrl: values.imageUrl,
    price: values.price,
    durationDays: values.durationDays,
    maxDevices: values.maxDevices,
    tag: values.tag,
    sortOrder: values.sortOrder,
    active: values.active,
    features: values.features.map((f) => f.value).filter(Boolean),
  })
}

function formToUpdatePayload(values: AdminTariffFormValues): AdminPlanUpdate {
  return {
    name: values.name,
    description: values.description,
    image_url: values.imageUrl || undefined,
    price: values.price,
    duration_days: values.durationDays,
    max_devices: values.maxDevices,
    tag: values.tag,
    sort_order: values.sortOrder,
    active: values.active,
  }
}

export function useAdminPlanMutations() {
  const qc = useQueryClient()

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: planKeys.all })
    qc.invalidateQueries({ queryKey: planKeys.admin })
  }

  const create = useMutation({
    mutationFn: (values: AdminTariffFormValues) => createPlan(formToCreatePayload(values)),
    onSuccess: invalidate,
  })

  const update = useMutation({
    mutationFn: ({ id, values }: { id: number; values: AdminTariffFormValues }) =>
      updatePlan(id, formToUpdatePayload(values)),
    onSuccess: invalidate,
  })

  const remove = useMutation({
    mutationFn: (id: number) => deletePlan(id),
    onSuccess: invalidate,
  })

  const reorder = useMutation({
    mutationFn: reorderPlans,
    onSuccess: invalidate,
  })

  return { create, update, remove, reorder }
}

export function useCalculatePlan() {
  return useMutation({
    mutationFn: calculatePlan,
  })
}
