/** Price from API is in RUB (int64, see yookassa service) */
export function formatPrice(rubles: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(rubles)
}

export const PLAN_TAG = {
  recommended: 'recommended',
  inactive: 'inactive',
} as const

export function formatDate(iso: string): string {
  if (!iso) return '—'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatDuration(days: number): string {
  if (days >= 365) {
    const years = Math.round(days / 365)
    return `${years} ${years === 1 ? 'год' : years < 5 ? 'года' : 'лет'}`
  }
  if (days >= 30) {
    const months = Math.round(days / 30)
    return `${months} ${months === 1 ? 'месяц' : months < 5 ? 'месяца' : 'месяцев'}`
  }
  return `${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}`
}
