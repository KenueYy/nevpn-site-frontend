import { apiRequest } from '@/api/client'
import type { PlanApi } from '@/types/plan'
import { normalizePlan } from '@/utils/plan'

export async function getPlans() {
  const raw = await apiRequest<PlanApi[]>('/api/v1/plans')
  return raw.map(normalizePlan)
}

export async function getPlan(id: number) {
  const raw = await apiRequest<PlanApi>(`/api/v1/plans/${id}`)
  return normalizePlan(raw)
}
