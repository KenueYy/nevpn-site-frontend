import { apiRequest } from '@/api/client'
import type { PlanApi, PlanCalculateRequest, PlanCalculateResponse } from '@/types/plan'
import { normalizePlan } from '@/utils/plan'

export async function getPlans() {
  const raw = await apiRequest<PlanApi[]>('/api/v1/plans')
  return raw.map(normalizePlan)
}

export async function getPlan(id: number) {
  const raw = await apiRequest<PlanApi>(`/api/v1/plans/${id}`)
  return normalizePlan(raw)
}

export async function calculatePlan(body: PlanCalculateRequest) {
  return apiRequest<PlanCalculateResponse>('/api/v1/plans/calculate', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
