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
    q: 'VPN не подключается',
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
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
        ⚡ Как подключить NeVPN — инструкция
      </h1>
      <p className="mt-3 text-lg text-navy-600">
        Пошаговая настройка NeVPN для всех устройств. Подключение за 2 минуты.
      </p>

      {/* Steps */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-navy-950">
          📋 Порядок подключения
        </h2>
        <div className="mt-8 space-y-6">
          <div className="flex gap-4 rounded-2xl border border-navy-100 p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-950 text-lg font-bold text-white">
              1
            </span>
            <div>
              <h3 className="font-medium text-navy-950">Оплатите подписку</h3>
              <p className="mt-1 leading-relaxed text-navy-600">
                Выберите тариф на главной или через калькулятор. Оплата картой. От 99 ₽/мес, 3 дня бесплатно.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-navy-100 p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-950 text-lg font-bold text-white">
              2
            </span>
            <div>
              <h3 className="font-medium text-navy-950">Откройте конфигурацию в личном кабинете</h3>
              <p className="mt-1 leading-relaxed text-navy-600">
                Авторизуйтесь на сайте и зайдите в профиль. Нажмите «Открыть конфигурацию» — откроется страница с вашим персональным ключом доступа и подробной инструкцией по подключению.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-navy-100 p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-950 text-lg font-bold text-white">
              3
            </span>
            <div>
              <h3 className="font-medium text-navy-950">Следуйте инструкции на странице конфигурации</h3>
              <p className="mt-1 leading-relaxed text-navy-600">
                На странице конфигурации описано всё необходимое: как скопировать ключ, как импортировать его в приложение и как подключиться. Просто выполняйте шаги по порядку.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Devices */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-navy-950">
          📱 Приложения для устройств
        </h2>
        <p className="mt-3 text-navy-600">
          Поддерживаются протоколы VLESS, Xray, Shadowsocks.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {devices.map((d) => (
            <article
              key={d.title}
              className="rounded-2xl border border-navy-100 p-6 transition-colors hover:border-navy-200 hover:bg-navy-50/30"
            >
              <h3 className="font-medium text-navy-950">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{d.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-navy-950">
          🔧 Что делать, если NeVPN не работает
        </h2>
        <div className="mt-8 space-y-4">
          {troubleshooting.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-navy-100"
            >
              <summary className="cursor-pointer p-6 font-medium text-navy-950 marker:text-navy-400">
                {item.q}
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-navy-600">{item.a}</p>
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
      <section className="mt-16 rounded-2xl bg-navy-950 px-8 py-10 text-center">
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
