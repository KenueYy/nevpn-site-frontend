interface YmInitOptions {
  ssr?: boolean
  webvisor?: boolean
  clickmap?: boolean
  ecommerce?: string | boolean
  referrer?: string
  url?: string
  accurateTrackBounce?: boolean
  trackLinks?: boolean
}

type YmFn = {
  (id: number, event: 'init', options: YmInitOptions): void
  (id: number, event: 'hit', url: string, options?: Record<string, unknown>): void
  a?: unknown[]
  l?: number
}

type GtagFn = {
  (event: 'js', date: Date): void
  (event: 'config', id: string, options?: Record<string, unknown>): void
  (event: 'event', action: string, options?: Record<string, unknown>): void
}

interface Window {
  ym?: YmFn
  gtag?: GtagFn
  dataLayer?: unknown[]
}
