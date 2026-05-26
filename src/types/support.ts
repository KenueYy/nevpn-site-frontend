export interface SupportFaqItem {
  q: string
  a: string
}

export interface SupportResponse {
  telegram: {
    label: string
    url: string
    handle: string
  }
  email: {
    label: string
    address: string
  }
  faq: {
    label: string
    items: SupportFaqItem[]
  }
}
