import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { useSupportModal } from '@/contexts/SupportModalContext'
import { useSubscriptionQuery } from '@/hooks/useSubscription'
import { useTrialMutation } from '@/hooks/useTrial'
import { cn } from '@/utils/cn'

const nav = [
  { to: '/#features', label: 'Преимущества', isHash: true },
  { to: '/#tariffs', label: 'Тарифы', isHash: true },
  { to: '/#reviews', label: 'Отзывы', isHash: true },
  { to: '/tariffs', label: 'Все тарифы', isHash: false },
  { to: '/setup', label: 'Как подключить', isHash: false },
  { to: '/faq', label: 'FAQ', isHash: false },
]

export function Header() {
  const { isAuthenticated, user, isLoading } = useAuth()
  const { openAuth } = useAuthModal()
  const { openSupport } = useSupportModal()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const subQuery = useSubscriptionQuery(isAuthenticated)
  const trialMutation = useTrialMutation()

  const hasSubscription = subQuery.data?.status === 'active'
  const trialUsed =
    trialMutation.error &&
    'body' in trialMutation.error &&
    (trialMutation.error.body as Record<string, unknown>)?.error === 'trial_already_used'

  const handleTrial = () => {
    if (!isAuthenticated) {
      openAuth('/profile')
      return
    }
    trialMutation.mutate()
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-all duration-300',
        scrolled
          ? 'border-navy-100 shadow-sm'
          : 'border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-lg font-semibold tracking-tight text-navy-950 hover:text-navy-800 transition-colors">
          neVPN
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) =>
            item.isHash ? (
              <a
                key={item.to}
                href={item.to}
                className="text-sm text-navy-600 transition-colors hover:text-navy-950"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'text-sm transition-colors',
                    isActive ? 'text-navy-950 font-medium' : 'text-navy-600 hover:text-navy-950',
                  )
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
          <button
            type="button"
            onClick={openSupport}
            className="text-sm text-navy-600 transition-colors hover:text-navy-950"
          >
            Поддержка
          </button>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!isLoading && isAuthenticated && !hasSubscription && !trialUsed ? (
            <Button
              size="sm"
              variant="primary"
              onClick={handleTrial}
              isLoading={trialMutation.isPending}
            >
              {trialMutation.isSuccess ? '✅ Доступ активирован' : 'Попробовать бесплатно'}
            </Button>
          ) : null}
          {!isLoading && isAuthenticated && user ? (
            <Link to="/profile">
              <Button variant="secondary" size="sm">
                Кабинет
              </Button>
            </Link>
          ) : (
            <Button size="sm" onClick={() => openAuth()}>
              Войти
            </Button>
          )}
        </div>

        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-navy-800 hover:bg-navy-50 transition-colors"
          aria-label="Меню"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-navy-100 bg-white px-4 py-4 md:hidden animate-slide-up">
          <nav className="flex flex-col gap-3">
            {nav.map((item) =>
              item.isHash ? (
                <a
                  key={item.to}
                  href={item.to}
                  className="py-2 text-navy-700 hover:text-navy-950 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="py-2 text-navy-700 hover:text-navy-950 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
            <button type="button" className="py-2 text-left text-navy-700 hover:text-navy-950 transition-colors" onClick={() => { openSupport(); setMenuOpen(false) }}>
              Поддержка
            </button>
            {!isLoading && isAuthenticated && !hasSubscription && !trialUsed ? (
              <Button
                className="w-full mb-2"
                variant="primary"
                onClick={() => { handleTrial(); setMenuOpen(false) }}
                isLoading={trialMutation.isPending}
              >
                {trialMutation.isSuccess ? '✅ Доступ активирован' : 'Попробовать бесплатно'}
              </Button>
            ) : null}
            {!isLoading && isAuthenticated ? (
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                <Button className="w-full">Кабинет</Button>
              </Link>
            ) : (
              <Button className="w-full" onClick={() => { openAuth(); setMenuOpen(false) }}>
                Войти
              </Button>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
