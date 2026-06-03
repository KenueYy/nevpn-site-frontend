import { useScrollReveal } from '@/hooks/useScrollReveal'

const reviews = [
  {
    name: 'Алексей',
    role: 'Москва',
    text: 'Взял на 1 устройство на пробу. Думал обман, но реально работает. YouTube в хорошем качестве, без тормозов. Уже 3 месяца пользуюсь.',
    rating: 5,
  },
  {
    name: 'Дмитрий',
    role: 'Санкт-Петербург',
    text: 'Взял тариф на безлимит устройств. Настроил на телефоне, ноутбуке и ТВ. Поддержка помогла с настройкой за 5 минут. Полёт нормальный.',
    rating: 5,
  },
  {
    name: 'Сергей',
    role: 'Казань',
    text: 'Искал «невпн» в поиске, сомневался — не обман ли. Оплатил на 3 устройства, настроил, работает. Иногда падает скорость по вечерам, но поддержка быстро отвечает и помогает.',
    rating: 4,
  },
  {
    name: 'Анна',
    role: 'Екатеринбург',
    text: 'Пользуюсь год на годовом тарифе, 5 устройств. Пару раз были перебои, писала в поддержку — решили за час. Своих денег точно стоит.',
    rating: 4,
  },
  {
    name: 'Игорь',
    role: 'Новосибирск',
    text: 'Брал на 3 дня бесплатно — не ожидал, что всё честно. Потом оплатил месяц на 2 устройства, сейчас уже полгода. Иногда сервер отваливается, но переключаюсь на другой и ок.',
    rating: 4,
  },
  {
    name: 'Елена',
    role: 'Краснодар',
    text: 'Сначала не могла настроить на телефоне, расстроилась. Написала в поддержку — ответили за 10 минут, помогли через скриншоты. Теперь всё отлично, пользуюсь на 2 устройствах.',
    rating: 5,
  },
]

export function ReviewsSection() {
  const ref = useScrollReveal()

  return (
    <section id="reviews" className="scroll-mt-20 bg-navy-50/40 py-20 sm:py-24">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-navy-950 sm:text-3xl">
            ⭐ NeVPN отзывы — что говорят пользователи
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-navy-600">
            Более 50 отзывов от реальных пользователей из России. Средняя оценка — 4.7/5.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <article
              key={r.name}
              className="reveal hover-lift rounded-2xl border border-navy-100 bg-white p-6"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <span
                    key={j}
                    className="animate-bounce-in text-yellow-500"
                    style={{ animationDelay: `${0.3 + i * 0.1 + j * 0.08}s` }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="mt-3 leading-relaxed text-navy-700">{r.text}</p>
              <p className="mt-4 text-sm font-medium text-navy-950">{r.name}</p>
              <p className="text-xs text-navy-500">{r.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
