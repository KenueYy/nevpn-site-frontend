import { useState, type FormEvent } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { submitTicket } from '@/api/support'
import type { SupportTicketRequest } from '@/types/support'

const CONTACT_METHODS = [
  { value: '', label: 'Выберите способ связи' },
  { value: 'phone', label: 'Телефон' },
  { value: 'email', label: 'Email' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'discord', label: 'Discord' },
  { value: 'other', label: 'Другое' },
] as const

interface Props {
  isOpen: boolean
  onClose: () => void
}

interface FieldErrors {
  subject?: string
  description?: string
  contactMethod?: string
  contact?: string
}

export function SupportTicketModal({ isOpen, onClose }: Props) {
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [contactMethod, setContactMethod] = useState('')
  const [contact, setContact] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const resetForm = () => {
    setSubject('')
    setDescription('')
    setContactMethod('')
    setContact('')
    setErrors({})
    setIsSubmitting(false)
    setIsSuccess(false)
    setSubmitError('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const validate = (): boolean => {
    const next: FieldErrors = {}

    const subj = subject.trim()
    if (!subj) {
      next.subject = 'Укажите тему обращения'
    } else if (subj.length < 3) {
      next.subject = 'Минимум 3 символа'
    }

    const desc = description.trim()
    if (!desc) {
      next.description = 'Опишите проблему'
    } else if (desc.length < 10) {
      next.description = 'Минимум 10 символов'
    }

    if (!contactMethod) {
      next.contactMethod = 'Выберите способ связи'
    }

    const ct = contact.trim()
    if (!ct) {
      next.contact = 'Укажите контакт для связи'
    } else if (ct.length < 2) {
      next.contact = 'Минимум 2 символа'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError('')

    const payload: SupportTicketRequest = {
      subject: subject.trim(),
      description: description.trim(),
      contact_method: contactMethod,
      contact: contact.trim(),
    }

    try {
      await submitTicket(payload)
      setIsSuccess(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Не удалось отправить обращение. Попробуйте позже.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Обращение в поддержку" className="max-w-lg">
      {isSuccess ? (
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-navy-900">Обращение отправлено</p>
          <p className="mt-2 text-sm text-navy-600">
            Мы свяжемся с вами по указанному контакту.
          </p>
          <Button className="mt-6" onClick={handleClose}>
            Понятно
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-5">
            <Input
              label="Тема обращения"
              placeholder="Например: Не могу подключиться к VPN"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value)
                if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }))
              }}
              error={errors.subject}
            />

            <Textarea
              label="Опишите проблему"
              placeholder="Опишите, что случилось. Чем подробнее — тем быстрее поможем."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }))
              }}
              error={errors.description}
              rows={4}
            />

            <Select
              label="Способ связи"
              value={contactMethod}
              onChange={(e) => {
                setContactMethod(e.target.value)
                if (errors.contactMethod)
                  setErrors((prev) => ({ ...prev, contactMethod: undefined }))
              }}
              error={errors.contactMethod}
            >
              {CONTACT_METHODS.map((m) => (
                <option key={m.value} value={m.value} disabled={m.value === ''}>
                  {m.label}
                </option>
              ))}
            </Select>

            <Input
              label="Контакт для связи"
              placeholder="Например: +7..., email@example.com, @telegram, WhatsApp, Discord ID"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value)
                if (errors.contact) setErrors((prev) => ({ ...prev, contact: undefined }))
              }}
              error={errors.contact}
              hint={
                !errors.contact
                  ? 'Укажите контакт так, чтобы мы точно понимали, куда вам написать.'
                  : undefined
              }
            />
          </div>

          {submitError ? (
            <p className="mt-4 text-sm text-red-600">{submitError}</p>
          ) : null}

          <div className="mt-6 flex gap-3">
            <Button type="button" variant="secondary" className="flex-1" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit" className="flex-1" isLoading={isSubmitting}>
              Отправить обращение
            </Button>
          </div>
        </form>
      )}
    </Modal>
  )
}
