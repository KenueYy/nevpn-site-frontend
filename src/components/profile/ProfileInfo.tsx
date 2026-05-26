import type { AuthUser } from '@/types/user'
import { formatDate } from '@/utils/format'
import { Card } from '@/components/ui/Card'

interface ProfileInfoProps {
  user: AuthUser
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-navy-950">Аккаунт</h2>
      <dl className="mt-6 space-y-4">
        <div>
          <dt className="text-xs uppercase tracking-wide text-navy-500">Email</dt>
          <dd className="mt-1 text-navy-950">{user.email}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-navy-500">Роль</dt>
          <dd className="mt-1 text-navy-950">
            {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
          </dd>
        </div>
        {user.createdAt ? (
          <div>
            <dt className="text-xs uppercase tracking-wide text-navy-500">Регистрация</dt>
            <dd className="mt-1 text-navy-950">{formatDate(user.createdAt)}</dd>
          </div>
        ) : null}
      </dl>
    </Card>
  )
}
