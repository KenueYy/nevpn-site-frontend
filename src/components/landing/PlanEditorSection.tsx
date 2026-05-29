import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useAuth } from '@/hooks/useAuth'
import { useCalculatePlan } from '@/hooks/usePlans'
import { useCreateCustomPayment } from '@/hooks/usePayment'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { formatDuration, formatPrice } from '@/utils/format'
import { ApiError } from '@/types/api'

export function PlanEditorSection() {
  const [months, setMonths] = useState(3)
  const [devices, setDevices] = useState(3)
  const [unlimited, setUnlimited] = useState(false)
  const { isAuthenticated } = useAuth()
  const { openAuth } = useAuthModal()
  const calculate = useCalculatePlan()
  const payment = useCreateCustomPayment()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-calculate on params change with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      calculate.mutate({ months, devices, unlimited })
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [months, devices, unlimited])

  const handlePurchase = () => {
    if (!isAuthenticated) {
      openAuth('/tariffs')
      return
    }
    if (!calculate.data) return
    payment.mutate({
      price: calculate.data.price,
      months,
      devices,
      unlimited,
    })
  }

  const lastResultRef = useRef(calculate.data)
  if (calculate.data) lastResultRef.current = calculate.data
  const result = calculate.data ?? lastResultRef.current
  const error = calculate.error

  return (
    <section id="plan-editor" className="scroll-mt-20 bg-navy-50/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-navy-950 sm:text-3xl">
              Подберите свой план
            </h2>
            <p className="mt-3 text-navy-600">
              Настройте срок и количество устройств под свои задачи.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Settings panel */}
          <div className="space-y-8">
            {/* Months slider */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-navy-800">Срок подписки</label>
                <span className="text-sm font-semibold text-navy-950">{months} мес.</span>
              </div>
              <div className="px-3 sm:px-0">
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-navy-200 accent-navy-900"
                />
                <div className="mt-1 flex justify-between text-xs text-navy-400">
                  <span>1 мес</span>
                  <span>12 мес</span>
                </div>
              </div>
            </div>

            {/* Devices slider */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-navy-800">Количество устройств</label>
                <span className="text-sm font-semibold text-navy-950">
                  {unlimited ? 'Безлимит' : devices}
                </span>
              </div>
              <div className="px-3 sm:px-0">
                <input
                  type="range"
                  min={1}
                  max={7}
                  value={devices}
                  onChange={(e) => setDevices(Number(e.target.value))}
                  disabled={unlimited}
                  className={`h-2 w-full cursor-pointer appearance-none rounded-lg bg-navy-200 accent-navy-900 ${
                    unlimited ? 'cursor-not-allowed opacity-40' : ''
                  }`}
                />
                <div className="mt-1 flex justify-between text-xs text-navy-400">
                  <span>1</span>
                  <span>7</span>
                </div>
              </div>
            </div>

            {/* Unlimited checkbox */}
            <label className="flex items-center gap-2 text-sm text-navy-800">
              <input
                type="checkbox"
                checked={unlimited}
                onChange={(e) => setUnlimited(e.target.checked)}
                className="h-4 w-4 rounded border-navy-300 accent-navy-900"
              />
              Безлимит устройств
            </label>

          </div>

          {/* Result panel */}
          <Card className="flex flex-col justify-center">
            {!result && !error ? (
              <div className="py-8 text-center">
                <p className="text-navy-500">Выберите параметры</p>
                <p className="mt-2 text-xs text-navy-400">
                  Срок: 1–12 месяцев, устройств: 1–7 или безлимит
                </p>
              </div>
            ) : null}

            {error ? (
              <div className="py-8 text-center">
                <p className="text-sm text-red-600">
                  {error instanceof ApiError ? error.message : 'Не удалось рассчитать'}
                </p>
                <Button
                  className="mt-4"
                  variant="secondary"
                  size="sm"
                  onClick={() => calculate.mutate({ months, devices, unlimited })}
                >
                  Повторить
                </Button>
              </div>
            ) : null}

            {result ? (
              <div>
                <p className="text-3xl font-semibold tracking-tight text-navy-950">
                  {formatPrice(result.price)}
                  <span className="ml-1 text-sm font-normal text-navy-500">
                    / {formatDuration(result.duration_days)}
                  </span>
                </p>
                <ul className="mt-5 space-y-2">
                  <li className="flex gap-2 text-sm text-navy-700">
                    <span className="text-navy-400">—</span>
                    {unlimited ? 'Безлимит устройств' : `До ${result.max_devices} ${result.max_devices === 1 ? 'устройства' : result.max_devices < 5 ? 'устройств' : 'устройств'}`}
                  </li>
                  <li className="flex gap-2 text-sm text-navy-700">
                    <span className="text-navy-400">—</span>
                    Срок: {formatDuration(result.duration_days)}
                  </li>
                  <li className="flex gap-2 text-sm text-navy-700">
                    <span className="text-navy-400">—</span>
                    ~{Math.round(result.price / (result.duration_days / 30))} ₽ / мес
                  </li>
                </ul>
                <Button
                  className="mt-6 w-full"
                  isLoading={payment.isPending}
                  onClick={handlePurchase}
                >
                  Оплатить
                </Button>
                {payment.isError ? (
                  <p className="mt-3 text-center text-sm text-red-600">
                    {(payment.error as ApiError).message}
                  </p>
                ) : null}
              </div>
            ) : null}
          </Card>
        </div>
      </div>
    </section>
  )
}
