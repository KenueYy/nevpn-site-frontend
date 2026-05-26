import { Button } from '@/components/ui/Button'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  message = 'Не удалось загрузить данные',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-lg font-medium text-navy-900">Что-то пошло не так</p>
      <p className="mt-2 max-w-md text-sm text-navy-500">{message}</p>
      {onRetry ? (
        <Button className="mt-6" variant="secondary" onClick={onRetry}>
          Повторить
        </Button>
      ) : null}
    </div>
  )
}
