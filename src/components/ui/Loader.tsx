import { cn } from '@/utils/cn'

export function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-8 w-8 animate-spin rounded-full border-2 border-navy-200 border-t-navy-800',
        className,
      )}
      role="status"
      aria-label="Загрузка"
    />
  )
}
