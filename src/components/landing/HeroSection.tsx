import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { useAuthModal } from '@/contexts/AuthModalContext'

export function HeroSection() {
  const { isAuthenticated } = useAuth()
  const { openAuth } = useAuthModal()

  return (
    <section className="animate-fade-in border-b border-navy-100 bg-gradient-to-b from-navy-50/50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <p className="text-sm font-medium uppercase tracking-widest text-navy-600">neVPN</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
          Стабильный доступ к сети без лишней сложности
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-600">
          neVPN — сервис ускорения соединения для тех, кому важны скорость, надёжность и
          защищённое подключение в повседневных задачах.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {isAuthenticated ? (
            <Link to="/profile">
              <Button size="lg">Открыть кабинет</Button>
            </Link>
          ) : (
            <Button size="lg" onClick={() => openAuth('/profile')}>
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
      </div>
    </section>
  )
}
