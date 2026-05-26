import { PLAN_TAG } from '@/utils/format'
import type { AdminPlanCreate, Plan, PlanApi, PlanStatus } from '@/types/plan'

export function parsePlanFeatures(description: string, durationDays: number, maxDevices: number): string[] {
  const lines = description
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  const fromDescription = lines.filter((l) => /^[-•*]/.test(l)).map((l) => l.replace(/^[-•*]\s*/, ''))

  if (fromDescription.length > 0) return fromDescription

  const auto: string[] = []
  if (durationDays > 0) auto.push(`Срок: ${durationDays} дн.`)
  if (maxDevices > 0) auto.push(`До ${maxDevices} устройств`)
  if (lines.length === 1) return auto.length ? auto : [lines[0]]
  if (lines.length > 1) return lines
  return auto.length ? auto : ['Стабильное подключение', 'Быстрый доступ к сети']
}

export function normalizePlan(raw: PlanApi): Plan {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description.split('\n')[0] ?? raw.description,
    imageUrl: raw.image_url ?? '',
    price: raw.price,
    durationDays: raw.duration_days,
    maxDevices: raw.max_devices,
    tag: raw.tag ?? '',
    sortOrder: raw.sort_order ?? 0,
    active: raw.active ?? true,
    features: parsePlanFeatures(raw.description, raw.duration_days, raw.max_devices),
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  }
}

export function getPlanUiStatus(
  plan: Plan,
  options?: { currentPlanId?: number | null },
): PlanStatus {
  if (!plan.active) return 'inactive'
  const tag = plan.tag.toLowerCase()
  if (options?.currentPlanId === plan.id) return 'current'
  if (tag === PLAN_TAG.recommended) return 'recommended'
  if (tag === PLAN_TAG.inactive) return 'inactive'
  return 'active'
}

export function buildDescriptionWithFeatures(description: string, features: string[]): string {
  const main = description.trim()
  const featureLines = features.map((f) => f.trim()).filter(Boolean).map((f) => `- ${f}`)
  if (featureLines.length === 0) return main
  return [main, ...featureLines].filter(Boolean).join('\n')
}

export function planToAdminCreate(plan: {
  name: string
  description: string
  imageUrl: string
  price: number
  durationDays: number
  maxDevices: number
  tag: string
  sortOrder: number
  active: boolean
  features: string[]
}): AdminPlanCreate {
  return {
    name: plan.name,
    description: buildDescriptionWithFeatures(plan.description, plan.features),
    image_url: plan.imageUrl,
    price: plan.price,
    duration_days: plan.durationDays,
    max_devices: plan.maxDevices,
    tag: plan.tag,
    sort_order: plan.sortOrder,
    active: plan.active,
  }
}
