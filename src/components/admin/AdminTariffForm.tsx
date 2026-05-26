import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import type { Plan } from '@/types/plan'
import { PLAN_TAG } from '@/utils/format'

const schema = z.object({
  name: z.string().min(1, 'Укажите название'),
  description: z.string(),
  imageUrl: z.string(),
  price: z.number().min(1, 'Укажите цену'),
  durationDays: z.number().min(1, 'Укажите срок'),
  maxDevices: z.number().min(1, 'Укажите лимит устройств'),
  tag: z.string(),
  sortOrder: z.number(),
  active: z.boolean(),
  features: z.array(z.object({ value: z.string() })),
})

export type AdminTariffFormValues = z.infer<typeof schema>

interface AdminTariffFormProps {
  initial?: Plan | null
  onSubmit: (values: AdminTariffFormValues) => void
  onCancel: () => void
  isLoading?: boolean
}

function planToForm(plan: Plan): AdminTariffFormValues {
  return {
    name: plan.name,
    description: plan.description,
    imageUrl: plan.imageUrl,
    price: plan.price,
    durationDays: plan.durationDays,
    maxDevices: plan.maxDevices,
    tag: plan.tag,
    sortOrder: plan.sortOrder,
    active: plan.active,
    features: plan.features.map((value) => ({ value })),
  }
}

const empty: AdminTariffFormValues = {
  name: '',
  description: '',
  imageUrl: '',
  price: 299,
  durationDays: 30,
  maxDevices: 3,
  tag: '',
  sortOrder: 0,
  active: true,
  features: [{ value: 'Стабильное подключение' }],
}

export function AdminTariffForm({ initial, onSubmit, onCancel, isLoading }: AdminTariffFormProps) {
  const form = useForm<AdminTariffFormValues>({
    resolver: zodResolver(schema) as never,
    defaultValues: initial ? planToForm(initial) : empty,
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'features',
  })

  useEffect(() => {
    form.reset(initial ? planToForm(initial) : empty)
  }, [initial, form])

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-navy-100 bg-white p-6"
    >
      <h3 className="font-semibold text-navy-950">
        {initial ? 'Редактировать тариф' : 'Новый тариф'}
      </h3>
      <Input label="Название" error={form.formState.errors.name?.message} {...form.register('name')} />
      <Textarea
        label="Краткое описание"
        error={form.formState.errors.description?.message}
        {...form.register('description')}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Цена (₽)"
          type="number"
          error={form.formState.errors.price?.message}
          {...form.register('price', { valueAsNumber: true })}
        />
        <Input
          label="Срок (дней)"
          type="number"
          error={form.formState.errors.durationDays?.message}
          {...form.register('durationDays', { valueAsNumber: true })}
        />
        <Input
          label="Устройств"
          type="number"
          error={form.formState.errors.maxDevices?.message}
          {...form.register('maxDevices', { valueAsNumber: true })}
        />
        <Input
          label="Порядок"
          type="number"
          {...form.register('sortOrder', { valueAsNumber: true })}
        />
        <Input label="URL изображения" {...form.register('imageUrl')} />
      </div>
      <label className="flex items-center gap-2 text-sm text-navy-800">
        <input type="checkbox" className="h-4 w-4 rounded border-navy-300" {...form.register('active')} />
        Тариф активен (виден на сайте)
      </label>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-800">Метка (Tag)</label>
        <select
          className="h-11 w-full rounded-lg border border-navy-200 px-4 text-sm"
          {...form.register('tag')}
        >
          <option value="">Обычный</option>
          <option value={PLAN_TAG.recommended}>recommended</option>
        </select>
        <p className="mt-1 text-xs text-navy-500">«recommended» — бейдж на карточке тарифа.</p>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-navy-800">Преимущества</p>
        {fields.map((field, index) => (
          <div key={field.id} className="mb-2 flex gap-2">
            <Input {...form.register(`features.${index}.value`)} />
            <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
              ×
            </Button>
          </div>
        ))}
        <Button type="button" variant="secondary" size="sm" onClick={() => append({ value: '' })}>
          + Пункт
        </Button>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" isLoading={isLoading}>
          Сохранить
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  )
}
