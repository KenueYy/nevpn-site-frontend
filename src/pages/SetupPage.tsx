import { useScrollReveal } from '@/hooks/useScrollReveal'

const devices = [
  {
    title: '📱 Android',
    text: 'Скачайте v2rayNG или NekoBox. Импортируйте конфигурацию из личного кабинета.',
  },
  {
    title: '🍎 iOS',
    text: 'Установите Streisand или Shadowrocket из App Store. Импортируйте конфигурацию из личного кабинета.',
  },
  {
    title: '💻 Windows',
    text: 'Скачайте v2rayN или NekoRay. Импортируйте конфигурацию из личного кабинета.',
  },
  {
    title: '🐧 macOS',
    text: 'Используйте V2rayU или NekoRay. Импортируйте конфигурацию из личного кабинета.',
  },
  {
    title: '🐍 Linux',
    text: 'Установите v2rayA или NekoRay. Импортируйте конфигурацию из личного кабинета.',
  },
  {
    title: '📺 Android TV / Apple TV',
    text: 'Установите v2rayNG для Android TV или Shadowrocket для Apple TV. Импортируйте конфигурацию из личного кабинета.',
  },
]

const troubleshooting = [
  {
    q: 'Где взять конфигурацию?',
    a: 'Зайдите в личный кабинет на nevpn.shop → нажмите «Открыть конфигурацию». Следуйте инструкциям на открывшейся странице.',
  },
  {
    q: 'Не подключается',
    a: 'Проверьте, что конфигурация импортирована полностью. Попробуйте другой сервер из списка в вашей конфигурации.',
  },
  {
    q: 'Низкая скорость',
    a: 'Переберите серверы в приложении — выберите тот, что с меньшим пингом. Обновите конфигурацию из личного кабинета.',
  },
  {
    q: 'Не работает в Китае',
    a: 'Обновите конфигурацию в личном кабинете — там всегда актуальные серверы, оптимизированные под обход DPI.',
  },
  {
    q: 'Сколько устройств можно подключить?',
    a: 'Зависит от тарифа: от 1 до безлимита. Одну конфигурацию можно импортировать на все устройства в пределах лимита.',
  },
]

export function SetupPage() {
  const stepsRef = useScrollReveal()
  const devicesRef = useScrollReveal()
  const faqRef = useScrollReveal()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
          ⚡ Как подключить NeVPN — инструкция
        </h1>
        <p className="mt-3 text-lg text-navy-600">
          Пошаговая настройка NeVPN для всех устройств. Подключение за 2 минуты.
        </p>
      </div>

      {/* Steps */}
      <section ref={stepsRef} className="mt-12">
        <h2 className="reveal text-2xl font-semibold tracking-tight text-navy-950">
          📋 Порядок подключения
        </h2>
        <div className="mt-8 space-y-6">
          {[
            {
              num: 1,
              title: 'Оплатите подписку',
              text: 'Выберите тариф на главной или через калькулятор. Оплата картой. От 99 ₽/мес, 3 дня бесплатно.',
            },
            {
              num: 2,
              title: 'Откройте конфигурацию в личном кабинете',
              text: 'Авторизуйтесь на сайте и зайдите в профиль. Нажмите «Открыть конфигурацию» — откроется страница с вашим персональным ключом доступа и подробной инструкцией по подключению.',
            },
            {
              num: 3,
              title: 'Следуйте инструкции на странице конфигурации',
              text: 'На странице конфигурации описано всё необходимое: как скопировать ключ, как импортировать его в приложение и как подключиться. Просто выполняйте шаги по порядку.',
            },
          ].map((s, i) => (
            <div
              key={s.num}
              className="reveal hover-lift flex gap-4 rounded-2xl border border-navy-100 bg-white p-6"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-950 text-lg font-bold text-white">
                {s.num}
              </span>
              <div>
                <h3 className="font-medium text-navy-950">{s.title}</h3>
                <p className="mt-1 leading-relaxed text-navy-600">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Devices */}
      <section ref={devicesRef} className="mt-16">
        <h2 className="reveal text-2xl font-semibold tracking-tight text-navy-950">
          📱 Приложения для устройств
        </h2>
        <p className="reveal mt-3 text-navy-600">
          Поддерживаются протоколы VLESS, Xray, Shadowsocks.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {devices.map((d, i) => (
            <article
              key={d.title}
              className="reveal hover-lift rounded-2xl border border-navy-100 bg-white p-6"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <h3 className="font-medium text-navy-950">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{d.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Troubleshooting */}
      <section ref={faqRef} className="mt-16">
        <h2 className="reveal text-2xl font-semibold tracking-tight text-navy-950">
          🔧 Что делать, если NeVPN не работает
        </h2>
        <div className="mt-8 space-y-4">
          {troubleshooting.map((item, i) => (
            <details
              key={item.q}
              className="reveal group rounded-2xl border border-navy-100 bg-white transition-all duration-200 hover:border-navy-200"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <summary className="cursor-pointer p-6 font-medium text-navy-950 marker:text-navy-400 transition-colors hover:text-navy-800">
                {item.q}
              </summary>
              <p className="animate-slide-up px-6 pb-6 leading-relaxed text-navy-600">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-sm text-navy-500">
          Не помогло? Напишите в поддержку:{' '}
          <a href="https://t.me/kenueyx" className="text-blue-600 underline">
            @nevpn_support
          </a>{' '}
        </p>
      </section>

      {/* Гарантия */}
      <section className="reveal mt-16 rounded-2xl bg-navy-950 px-8 py-10 text-center animate-gradient-move"
        style={{ background: 'linear-gradient(135deg, #0a1929, #102a43, #0a1929, #1a3a5c)', backgroundSize: '200% 200%' }}
      >
        <h2 className="text-2xl font-semibold text-white">
          🔒 Настроим или вернём деньги
        </h2>
        <p className="mx-auto mt-3 max-w-md text-navy-300">
          Если NeVPN не заработает на вашем устройстве — вернём полную стоимость. Без вопросов.
        </p>
      </section>
    </div>
  )
}
