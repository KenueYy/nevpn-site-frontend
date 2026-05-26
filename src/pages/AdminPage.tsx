import { useState } from 'react'
import { AdminTariffForm, type AdminTariffFormValues } from '@/components/admin/AdminTariffForm'
import { AdminTariffTable } from '@/components/admin/AdminTariffTable'
import { Button } from '@/components/ui/Button'
import { ErrorState } from '@/components/ui/ErrorState'
import { Loader } from '@/components/ui/Loader'
import { useAdminPlansQuery, useAdminPlanMutations } from '@/hooks/usePlans'
import type { Plan } from '@/types/plan'
import { ApiError } from '@/types/api'
import { buildDescriptionWithFeatures } from '@/utils/plan'

export function AdminPage() {
  const { data: plans, isLoading, isError, error, refetch } = useAdminPlansQuery(true)
  const { create, update, remove } = useAdminPlanMutations()
  const [editing, setEditing] = useState<Plan | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const handleSubmit = async (values: AdminTariffFormValues) => {
    setSuccessMsg(null)
    const features = values.features.map((f) => f.value).filter(Boolean)
    const withDesc = {
      ...values,
      description: buildDescriptionWithFeatures(values.description, features),
    }

    try {
      if (editing) {
        await update.mutateAsync({ id: editing.id, values: withDesc })
        setSuccessMsg('Тариф обновлён')
      } else {
        await create.mutateAsync(withDesc)
        setSuccessMsg('Тариф создан')
      }
      setEditing(null)
      setShowForm(false)
    } catch {
      /* mutation error */
    }
  }

  const handleDelete = async (plan: Plan) => {
    if (!confirm(`Удалить тариф «${plan.name}»?`)) return
    try {
      await remove.mutateAsync(plan.id)
      setSuccessMsg('Тариф удалён')
      if (editing?.id === plan.id) {
        setEditing(null)
        setShowForm(false)
      }
    } catch {
      /* shown below */
    }
  }

  const mutationError = (create.error ?? update.error ?? remove.error) as ApiError | null

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-navy-950">
            Управление тарифами
          </h1>
          <p className="mt-2 text-sm text-navy-600">Создание и редактирование планов на сайте</p>
        </div>
        <Button
          onClick={() => {
            setEditing(null)
            setShowForm(true)
          }}
        >
          + Новый тариф
        </Button>
      </div>

      {successMsg ? (
        <p className="mt-4 rounded-lg bg-navy-50 px-4 py-3 text-sm text-navy-800">{successMsg}</p>
      ) : null}

      {mutationError ? (
        <p className="mt-4 text-sm text-red-600">{mutationError.message}</p>
      ) : null}

      {showForm || editing ? (
        <div className="mt-8">
          <AdminTariffForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false)
              setEditing(null)
            }}
            isLoading={create.isPending || update.isPending}
          />
        </div>
      ) : null}

      <div className="mt-10">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : null}
        {isError ? (
          <ErrorState
            message={error instanceof ApiError ? error.message : undefined}
            onRetry={() => refetch()}
          />
        ) : null}
        {plans ? (
          <AdminTariffTable
            plans={plans}
            onEdit={(plan) => {
              setEditing(plan)
              setShowForm(true)
            }}
            onDelete={handleDelete}
          />
        ) : null}
      </div>
    </div>
  )
}
