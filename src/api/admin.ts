import { apiRequest } from '@/api/client'
import type { AdminPlanCreate, AdminPlanUpdate, PlanApi, ReorderPlansRequest } from '@/types/plan'
import { normalizePlan } from '@/utils/plan'

export async function getAdminPlans() {
  const raw = await apiRequest<PlanApi[]>('/api/v1/admin/plans')
  return raw.map(normalizePlan)
}

export async function createPlan(body: AdminPlanCreate) {
  const raw = await apiRequest<PlanApi>('/api/v1/admin/plans', {
    method: 'POST',
    body: JSON.stringify(body),
  })
  return normalizePlan(raw)
}

export async function updatePlan(id: number, body: AdminPlanUpdate) {
  const raw = await apiRequest<PlanApi>(`/api/v1/admin/plans/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
  return normalizePlan(raw)
}

export async function deletePlan(id: number) {
  return apiRequest<{ id: string; message: string }>(`/api/v1/admin/plans/${id}`, {
    method: 'DELETE',
  })
}

export async function reorderPlans(body: ReorderPlansRequest) {
  return apiRequest<{ message: string }>('/api/v1/admin/plans/reorder', {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
}
