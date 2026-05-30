const features = [
  {
    title: '🛡 Рабочий VPN',
    text: 'NeVPN стабильно работает в России, Китае и Дубае. Протоколы Xray и VLESS.',
  },
  {
    title: '⚡ Высокая скорость',
    text: 'Оптимизированные серверы с Xray и VLESS. Безлимитный трафик на всех тарифах.',
  },
  {
    title: '💰 От 99 ₽/мес',
    text: 'Подписка от 99 рублей в месяц, 3 дня бесплатно без привязки карты.',
  },
  {
    title: '📱 Безлимит устройств',
    text: 'Подключайте от 1 до безлимита устройств одновременно. Смартфоны, ПК, Android TV, Apple TV — всё работает.',
  },
  {
    title: '🔒 Гарантия возврата денег',
    text: '«Настроим или вернём деньги» — если NeVPN не заработает, вернём полную стоимость. Без вопросов.',
  },
  {
    title: '🌍 Работает везде',
    text: 'Россия, Китай, Дубай — NeVPN работает на LTE, WiFi, домашних и мобильных сетях всех операторов.',
  },
  {
    title: '🆓 3 дня бесплатно',
    text: 'Попробуйте NeVPN бесплатно в течение 3 дней. Оцените скорость и стабильность перед покупкой.',
  },
  {
    title: '💬 Поддержка 24/7',
    text: 'Telegram-поддержка и email. Поможем с настройкой, подбором тарифа и решением любых вопросов.',
  },
  {
    title: '🔐 No‑logs политика',
    text: 'NeVPN не хранит логи. Ваш трафик зашифрован Xray и VLESS — полная анонимность и безопасность.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-navy-950 sm:text-3xl">
          Почему NeVPN — лучший рабочий VPN в 2026
        </h2>
        <p className="mt-3 max-w-lg text-navy-600">
          От 99 ₽/мес, 3 дня бесплатно, Xray и VLESS, безлимит устройств. Работает в России, Китае и Дубае без блокировок.
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
