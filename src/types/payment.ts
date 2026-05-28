export interface CreatePaymentRequest {
  plan_id: number
}

export interface CreateCustomPaymentRequest {
  price: number
  months: number
  devices: number
  unlimited: boolean
  description?: string
}

/** YooKassa raw response (snake_case from external API) */
export interface YooKassaPaymentResponse {
  id?: string
  status?: string
  confirmation?: {
    type?: string
    confirmation_url?: string
  }
  [key: string]: unknown
}
