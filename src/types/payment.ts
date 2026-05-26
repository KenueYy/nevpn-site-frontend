export interface CreatePaymentRequest {
  plan_id: number
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
