const features = [
  {
    title: 'Ускорение соединения',
    text: 'Оптимизированные маршруты для стабильной работы в сети.',
  },
  {
    title: 'Защищённое подключение',
    text: 'Шифрование трафика и аккуратная инфраструктура.',
  },
  {
    title: 'Простой старт',
    text: 'Вход по email, выбор тарифа и оплата в несколько шагов.',
  },
  {
    title: 'Несколько устройств',
    text: 'Лимит устройств зависит от выбранного тарифа.',
  },
  {
    title: 'Прозрачные условия',
    text: 'Срок действия и стоимость указаны до оплаты.',
  },
  {
    title: 'Поддержка',
    text: 'Помощь в Telegram и по email в рабочее время.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-navy-950 sm:text-3xl">
          Почему neVPN
        </h2>
        <p className="mt-3 max-w-lg text-navy-600">
          Инструмент для стабильного соединения — без лишнего шума и перегруженного интерфейса.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-navy-100 p-6 transition-colors hover:border-navy-200 hover:bg-navy-50/30"
            >
              <h3 className="font-medium text-navy-950">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
