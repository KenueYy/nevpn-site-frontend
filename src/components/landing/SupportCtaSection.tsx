import { Button } from '@/components/ui/Button'
import { useSupportModal } from '@/contexts/SupportModalContext'

export function SupportCtaSection() {
  const { openSupport } = useSupportModal()

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl bg-navy-950 px-8 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Нужна помощь?</h2>
          <p className="mx-auto mt-3 max-w-md text-navy-300">
            Напишите в поддержку — поможем с подключением, тарифом и оплатой.
          </p>
          <Button className="mt-8" variant="secondary" size="lg" onClick={openSupport}>
            Связаться с поддержкой
          </Button>
        </div>
      </div>
    </section>
  )
}
