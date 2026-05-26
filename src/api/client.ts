import { API_BASE_URL } from '@/config/env'
import { ApiError, type ApiErrorBody } from '@/types/api'

const DEFAULT_ERROR_MESSAGES: Record<number, string> = {
  400: 'Некорректный запрос',
  401: 'Требуется авторизация',
  403: 'Доступ запрещён',
  404: 'Не найдено',
  409: 'Конфликт данных',
  422: 'Ошибка валидации',
  429: 'Слишком много запросов. Подождите немного',
  500: 'Ошибка сервера',
}

async function parseErrorBody(res: Response): Promise<ApiErrorBody | undefined> {
  try {
    return (await res.json()) as ApiErrorBody
  } catch {
    return undefined
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${path}`
  const headers = new Headers(options.headers)

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  })

  if (!res.ok) {
    const body = await parseErrorBody(res)
    const message =
      body?.error ??
      body?.message ??
      DEFAULT_ERROR_MESSAGES[res.status] ??
      `Ошибка ${res.status}`
    throw new ApiError(message, res.status, body)
  }

  if (res.status === 204) {
    return undefined as T
  }

  const text = await res.text()
  if (!text) return undefined as T
  return JSON.parse(text) as T
}
