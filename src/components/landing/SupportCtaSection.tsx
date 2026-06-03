import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { useSupportModal } from '@/contexts/SupportModalContext'
import { useSubscriptionQuery } from '@/hooks/useSubscription'
import { useTrialMutation } from '@/hooks/useTrial'
import { ApiError } from '@/types/api'

export function SupportCtaSection() {
  const { isAuthenticated } = useAuth()
  const { openAuth } = useAuthModal()
  const { openSupport } = useSupportModal()
  const subQuery = useSubscriptionQuery(isAuthenticated)
  const trialMutation = useTrialMutation()

  const hasSubscription = subQuery.data?.status === 'active'
  const trialError = trialMutation.error as ApiError | null
  const trialUsed = trialError?.body?.error === 'trial_already_used'

  const handleTrial = () => {
    if (!isAuthenticated) {
      openAuth('/profile')
      return
    }
    trialMutation.mutate()
  }

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="bg-dot-pattern animate-gradient-move relative overflow-hidden rounded-2xl bg-navy-950 px-8 py-12 text-center sm:px-12"
          style={{ background: 'linear-gradient(135deg, #0a1929, #102a43, #0a1929, #1a3a5c)' }}
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              🔒 Настроим или вернём деньги
            </h2>
            <p className="mx-auto mt-3 max-w-md text-navy-300">
              Если NeVPN не заработает на вашем устройстве — вернём полную стоимость. Напишите в поддержку или посмотрите инструкцию.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {!hasSubscription && !trialUsed ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleTrial}
                  isLoading={trialMutation.isPending}
                >
                  {trialMutation.isSuccess ? '✅ Доступ активирован' : 'Попробовать бесплатно'}
                </Button>
              ) : null}
              <Button variant="secondary" size="lg" onClick={openSupport}>
                Связаться с поддержкой
              </Button>
              <Link to="/setup">
                <Button variant="secondary" size="lg">
                  Инструкция по настройке
                </Button>
              </Link>
            </div>
            {trialMutation.isSuccess ? (
              <p className="mx-auto mt-4 max-w-md text-sm font-medium text-green-400">
                🎉 Пробный доступ активирован на 3 дня! Перейдите в личный кабинет и нажмите кнопку "Открыть конфигурацию" - там все инструкции подключения.
              </p>
            ) : null}
            <p className="mx-auto mt-6 max-w-md text-sm text-navy-400">
              Работает в России, Китае, Дубае. Xray, VLESS. От 99 ₽/мес, 3 дня бесплатно.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
