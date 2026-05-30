import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { useSubscriptionQuery } from '@/hooks/useSubscription'
import { useTrialMutation } from '@/hooks/useTrial'
import { ApiError } from '@/types/api'

export function HeroSection() {
  const { isAuthenticated } = useAuth()
  const { openAuth } = useAuthModal()
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
    <section className="animate-fade-in border-b border-navy-100 bg-gradient-to-b from-navy-50/50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <p className="text-sm font-medium uppercase tracking-widest text-navy-600">neVPN</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
          NeVPN — ускоритель интернета, который просто работает
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-600">
          <strong>NeVPN</strong> — это надёжный <strong>рабочий прокси без блокировок</strong>,
          который стабильно работает в России, Дубае и Китае. Все подписки работают на всех
          устройствах: смартфоны, ПК, Android TV, Apple TV. Поддержка{' '}
          <strong>Xray</strong> и <strong>VLESS</strong>, от 1 до безлимита устройств
          одновременно.
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy-600">
          Подписка от <strong>99 рублей в месяц</strong>,{' '}
          <strong>3 дня бесплатно</strong>. Работает на LTE, WiFi, домашних и мобильных
          сетях всех операторов. <strong>Настроим или вернём деньги</strong>.{' '}
          <strong>Невпн</strong> — это просто включил и забыл.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-sm text-navy-600">
          <span className="rounded-full border border-navy-200 bg-white px-3 py-1">🇷🇺 Россия, Китай, Дубай</span>
          <span className="rounded-full border border-navy-200 bg-white px-3 py-1">Xray, VLESS</span>
          <span className="rounded-full border border-navy-200 bg-white px-3 py-1">До безлимита устройств</span>
          <span className="rounded-full border border-navy-200 bg-white px-3 py-1">Безлимитный трафик</span>
          <span className="rounded-full border border-navy-200 bg-white px-3 py-1">3 дня бесплатно</span>
          <span className="rounded-full border border-navy-200 bg-white px-3 py-1">От 99 ₽/мес</span>
          <span className="rounded-full border border-navy-200 bg-white px-3 py-1">Вернём деньги</span>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {!hasSubscription && !trialUsed ? (
            <Button
              size="lg"
              variant="primary"
              onClick={handleTrial}
              isLoading={trialMutation.isPending}
            >
              {trialMutation.isSuccess ? '✅ Доступ активирован' : 'Попробовать бесплатно'}
            </Button>
          ) : null}
          {isAuthenticated ? (
            <Link to="/profile">
              <Button size="lg" variant={hasSubscription ? 'primary' : 'secondary'}>
                Открыть кабинет
              </Button>
            </Link>
          ) : (
            <Button size="lg" variant="secondary" onClick={() => openAuth('/profile')}>
              Войти
            </Button>
          )}
          <Link to="/tariffs">
            <Button size="lg" variant="secondary">
              Посмотреть тарифы
            </Button>
          </Link>
          <Button
            size="lg"
            variant="secondary"
            onClick={() =>
              document
                .getElementById('plan-editor')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Калькулятор
          </Button>
        </div>
        {trialMutation.isError && !trialUsed ? (
          <p className="mt-3 text-sm text-red-600">
            {trialError?.message ?? 'Не удалось активировать пробный доступ'}
          </p>
        ) : null}
        {trialUsed ? (
          <p className="mt-3 text-sm text-navy-600">
            Вы уже использовали пробный доступ. Выберите тариф и оплатите подписку.
          </p>
        ) : null}
        {trialMutation.isSuccess ? (
          <p className="mt-3 text-sm font-medium text-green-700">
            🎉 Пробный доступ активирован на 3 дня! Перейдите в личный кабинет и нажмите кнопку "Открыть конфигурацию" - там все инструкции подключения.
          </p>
        ) : null}
      </div>
    </section>
  )
}
