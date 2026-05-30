import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GA_MEASUREMENT_ID = 'G-3Q13Z1H728'

/** Отправка page_view при смене маршрута (SPA) */
export function GoogleAnalytics() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window.gtag !== 'function') return

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search + location.hash,
    })
  }, [location.pathname, location.search, location.hash])

  return null
}
