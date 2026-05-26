import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { YM_COUNTER_ID, YM_ENABLED } from '@/config/metrika'

/** Отправка просмотра страницы при смене маршрута (SPA) */
export function YandexMetrika() {
  const location = useLocation()

  useEffect(() => {
    if (!YM_ENABLED || typeof window.ym !== 'function') return

    const url = location.pathname + location.search + location.hash
    window.ym(YM_COUNTER_ID, 'hit', url, {
      title: document.title,
      referer: document.referrer,
    })
  }, [location.pathname, location.search, location.hash])

  return null
}
