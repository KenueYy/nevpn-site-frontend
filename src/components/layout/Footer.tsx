import { Link } from 'react-router-dom'
import { supportConfig } from '@/config/support'

export function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy-950 text-navy-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-lg font-semibold text-white">neVPN</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-navy-300">
            NeVPN — ускоритель интернета без блокировок в России, Китае, Дубае. От 99 ₽/мес, 3 дня бесплатно, безлимит устройств.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-white">Навигация</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/#features" className="hover:text-white">Преимущества</a></li>
            <li><a href="/#tariffs" className="hover:text-white">Тарифы</a></li>
            <li><Link to="/tariffs" className="hover:text-white">Все тарифы</Link></li>
            <li><Link to="/setup" className="hover:text-white">Как подключить</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/profile" className="hover:text-white">Кабинет</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-white">Контакты</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={supportConfig.telegram.url} target="_blank" rel="noreferrer" className="hover:text-white">
                {supportConfig.telegram.handle}
              </a>
            </li>
            <li>
              <a href={`mailto:${supportConfig.email.address}`} className="hover:text-white">
                {supportConfig.email.address}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-white">Служебное</p>
          <ul className="mt-4 space-y-2 text-sm text-navy-400">
            <li>© {new Date().getFullYear()} neVPN</li>
            <li>Условия использования — скоро</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
