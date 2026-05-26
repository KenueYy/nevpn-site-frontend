/** Plan from API (snake_case json tags) */
export interface PlanApi {
  id: number
  name: string
  description: string
  image_url: string
  price: number
  duration_days: number
  max_devices: number
  tag: string
  sort_order: number
  active: boolean
  created_at: string
  updated_at: string
}

export type PlanStatus = 'active' | 'inactive' | 'current' | 'recommended' | 'unavailable'

export interface Plan {
  id: number
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
  createdAt: string
  updatedAt: string
}

export interface AdminPlanUpdate {
  name?: string
  description?: string
  image_url?: string
  price?: number
  duration_days?: number
  max_devices?: number
  tag?: string
  sort_order?: number
  active?: boolean
}

export interface AdminPlanCreate {
  name: string
  description?: string
  image_url?: string
  price: number
  duration_days: number
  max_devices: number
  tag?: string
  sort_order?: number
  active?: boolean
}

export interface ReorderPlansRequest {
  order: { id: number; sort_order: number }[]
}
