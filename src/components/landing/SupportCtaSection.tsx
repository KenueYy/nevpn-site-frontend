import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useSupportModal } from '@/contexts/SupportModalContext'

export function SupportCtaSection() {
  const { openSupport } = useSupportModal()

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl bg-navy-950 px-8 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            🔒 Настроим или вернём деньги
          </h2>
          <p className="mx-auto mt-3 max-w-md text-navy-300">
            Если NeVPN не заработает на вашем устройстве — вернём полную стоимость. Напишите в поддержку или посмотрите инструкцию.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="secondary" size="lg" onClick={openSupport}>
              Связаться с поддержкой
            </Button>
            <Link to="/setup">
              <Button variant="secondary" size="lg">
                Инструкция по настройке
              </Button>
            </Link>
          </div>
          <p className="mx-auto mt-6 max-w-md text-sm text-navy-400">
            Работает в России, Китае, Дубае. Xray, VLESS. От 99 ₽/мес, 3 дня бесплатно.
          </p>
        </div>
      </div>
    </section>
  )
}
