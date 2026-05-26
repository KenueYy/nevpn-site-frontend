export type SubscriptionStatus = 'active' | 'expired' | 'none' | 'unknown'

export interface Subscription {
  status: SubscriptionStatus
  expire_at: string | null
  remna_status: string | null
  subscription_url: string | null
  plan_tag: string | null
  plan_id: number | null
  plan_name: string | null
}
