# neVPN Frontend

Минималистичный фронтенд для сервиса neVPN поверх Go-бэкенда.

## Запуск

### Docker (вместе с бэкендом)

Из корня репозитория:

```bash
docker compose up --build
```

UI: http://localhost:8080

### Локально (dev)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

- UI: http://localhost:5173  
- API proxy: `/api` → `http://localhost:7080` (см. `vite.config.ts`)

## API-контракт

Базовый префикс: **`/api/v1`**

### Публичные

| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/sendcode` | `{ email }` → код |
| POST | `/login` | `{ email, code }` → cookie + `{ user: { id, email, role, created_at } }` |
| GET | `/plans` | Активные тарифы (сортировка `sort_order`) |
| GET | `/plans/:id` | Один тариф |
| GET | `/support` | Контакты и FAQ |

### Авторизованные (cookie `auth`)

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/profile`, `/me` | Профиль с `role` |
| POST | `/logout` | Завершение сессии |
| GET | `/subscription` | Статус подписки Remna |
| POST | `/yookassa/payment/create` | `{ plan_id }` → YooKassa redirect |

### Админ (`role=admin`, email из `ADMIN_EMAILS`)

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/admin/plans` | Все тарифы |
| POST | `/admin/plans` | Создание |
| PATCH | `/admin/plans/:id` | Обновление (вкл. `tag`, `active`, `sort_order`) |
| PATCH | `/admin/plans/reorder` | `{ order: [{ id, sort_order }] }` |
| DELETE | `/admin/plans/:id` | Удаление |

### Тариф (JSON)

```json
{
  "id": 1,
  "name": "Базовый",
  "description": "…",
  "image_url": "",
  "price": 299,
  "duration_days": 30,
  "max_devices": 3,
  "tag": "recommended",
  "sort_order": 0,
  "active": true,
  "created_at": "…",
  "updated_at": "…"
}
```

Преимущества в `description` строками `- пункт`.

### CORS

Настраивается на бэкенде через `CORS_ORIGINS`. Фронт отправляет `credentials: 'include'`.

## Переменные окружения (фронт)

| Переменная | Описание |
|------------|----------|
| `VITE_API_BASE_URL` | Пусто = same origin / proxy |
| `VITE_ADMIN_EMAILS` | Опционально, роль приходит с `/profile` |

## Структура

`src/api`, `src/components`, `src/hooks`, `src/pages`, `src/routes`, `src/types`, `src/utils`
