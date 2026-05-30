const faqItems = [
  {
    q: 'Работает ли NeVPN в России?',
    a: 'Да, NeVPN стабильно работает в России на всех операторах: LTE, WiFi, домашний и мобильный интернет. Протоколы Xray и VLESS обходят блокировки провайдеров.',
  },
  {
    q: 'Сколько устройств можно подключить?',
    a: 'От 1 устройства в базовом тарифе до безлимита устройств в годовом тарифе. Вы можете выбрать нужное количество при оплате.',
  },
  {
    q: 'Есть ли пробный период?',
    a: 'Да, 3 дня бесплатно без привязки карты. Если вам не понравится — просто не продлевайте подписку.',
  },
  {
    q: 'NeVPN — это не обман?',
    a: 'Нет. NeVPN работает с 2024 года. У нас тысячи пользователей в России, Китае и Дубае. Есть публичный Telegram-канал и поддержка. Действует гарантия: «Настроим или вернём деньги».',
  },
  {
    q: 'Что делать, если NeVPN не работает?',
    a: '1) Проверьте инструкцию по настройке. 2) Напишите в поддержку в Telegram. 3) Если проблема не решается — вернём деньги по гарантии.',
  },
  {
    q: 'Работает ли NeVPN в Китае?',
    a: 'Да, NeVPN работает в Китае. Протоколы Xray и VLESS специально оптимизированы для обхода Deep Packet Inspection (DPI).',
  },
  {
    q: 'Работает ли NeVPN в Дубае?',
    a: 'Да, NeVPN стабильно работает в ОАЭ и Дубае без ограничений.',
  },
  {
    q: 'Какие протоколы использует NeVPN?',
    a: 'Xray и VLESS — современные протоколы с высокой скоростью и надёжным шифрованием. Никакого OpenVPN или WireGuard — только то, что реально работает при блокировках.',
  },
  {
    q: 'Как оплатить NeVPN?',
    a: 'Оплата картой, СБП. Все платежи проходят через защищённые каналы.',
  },
  {
    q: 'Можно ли вернуть деньги?',
    a: 'Да, действует гарантия «Настроим или вернём деньги». Если сервис не заработает — вернём полную сумму.',
  },
  {
    q: 'Какой тариф выбрать?',
    a: 'Для одного устройства — от 99 ₽/мес. Для семьи — тариф на 5 устройств. Для бизнеса — безлимит устройств. Используйте калькулятор на главной для точного расчёта.',
  },
  {
    q: 'NeVPN логирует трафик?',
    a: 'Нет, мы не храним логи. Принцип «nologs» — ваша приватность под защитой.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
}

export function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
        ❓ NeVPN — ответы на частые вопросы
      </h1>
      <p className="mt-3 text-lg text-navy-600">
        Всё о прокси-сервисе без блокировок: настройка, тарифы, надёжность, отзывы.
      </p>

      <div className="mt-12 space-y-8">
        {faqItems.map((item) => (
          <article
            key={item.q}
            className="rounded-2xl border border-navy-100 p-6 transition-colors hover:border-navy-200 hover:bg-navy-50/30"
          >
            <h2 className="font-medium text-navy-950">{item.q}</h2>
            <p className="mt-2 leading-relaxed text-navy-600">{item.a}</p>
          </article>
        ))}
      </div>

      {/* Обман или нет — отдельный блок */}
      <section className="mt-16 rounded-2xl border border-green-200 bg-green-50 p-8">
        <h2 className="text-xl font-semibold text-green-900">
          ✅ NeVPN — не обман
        </h2>
        <ul className="mt-4 space-y-2 text-green-800">
          <li>• Работаем с 2024 года</li>
          <li>• Тысячи пользователей в РФ, Китае, Дубае</li>
          <li>• Гарантия возврата денег</li>
          <li>• Прозрачные тарифы — от 99 ₽/мес</li>
        </ul>
      </section>
    </div>
    </>
  )
}
