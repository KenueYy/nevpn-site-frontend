import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { ApiError } from '@/types/api'

const emailSchema = z.object({
  email: z.string().email('Введите корректный email'),
})

const codeSchema = z.object({
  code: z
    .string()
    .length(6, 'Код должен содержать 6 цифр')
    .regex(/^\d+$/, 'Только цифры'),
})

type Step = 'email' | 'code'

export function AuthModal() {
  const { isOpen, closeAuth, redirectPath } = useAuthModal()
  const { sendCodeMutation, loginMutation, refetchProfile } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [retryAfter, setRetryAfter] = useState(0)

  const emailForm = useForm({ resolver: zodResolver(emailSchema), defaultValues: { email: '' } })
  const codeForm = useForm({ resolver: zodResolver(codeSchema), defaultValues: { code: '' } })

  useEffect(() => {
    if (!isOpen) {
      setStep('email')
      setEmail('')
      emailForm.reset()
      codeForm.reset()
      setRetryAfter(0)
    }
  }, [isOpen, emailForm, codeForm])

  useEffect(() => {
    if (retryAfter <= 0) return
    const t = setInterval(() => setRetryAfter((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [retryAfter])

  const onSendCode = emailForm.handleSubmit(async (data) => {
    try {
      const res = await sendCodeMutation.mutateAsync(data.email)
      setEmail(data.email)
      setRetryAfter(res.retry_after ?? 60)
      setStep('code')
    } catch {
      /* shown via mutation state */
    }
  })

  const onLogin = codeForm.handleSubmit(async (data) => {
    try {
      await loginMutation.mutateAsync({ email, code: data.code })
      await refetchProfile()
      closeAuth()
      navigate(redirectPath ?? '/profile')
    } catch {
      /* shown via mutation state */
    }
  })

  const sendError = sendCodeMutation.error as ApiError | null
  const loginError = loginMutation.error as ApiError | null

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAuth}
      title={step === 'email' ? 'Вход в neVPN' : 'Подтверждение'}
    >
      {step === 'email' ? (
        <form onSubmit={onSendCode} className="space-y-4">
          <p className="text-sm text-navy-600">
            Укажите email — мы отправим код для входа в личный кабинет.
          </p>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            error={emailForm.formState.errors.email?.message ?? sendError?.message}
            {...emailForm.register('email')}
          />
          <Button type="submit" className="w-full" isLoading={sendCodeMutation.isPending}>
            Получить код
          </Button>
        </form>
      ) : (
        <form onSubmit={onLogin} className="space-y-4">
          <p className="text-sm text-navy-600">
            Код отправлен на <span className="font-medium text-navy-900">{email}</span>
          </p>
          <Input
            label="Код из письма"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            error={codeForm.formState.errors.code?.message ?? loginError?.message}
            {...codeForm.register('code')}
          />
          <Button type="submit" className="w-full" isLoading={loginMutation.isPending}>
            Войти
          </Button>
          <div className="flex flex-col gap-2 text-center text-sm">
            <button
              type="button"
              className="text-navy-600 hover:text-navy-900 disabled:opacity-50"
              disabled={retryAfter > 0 || sendCodeMutation.isPending}
              onClick={() => sendCodeMutation.mutate(email)}
            >
              {retryAfter > 0 ? `Отправить снова через ${retryAfter} с` : 'Отправить код снова'}
            </button>
            <button
              type="button"
              className="text-navy-500 hover:text-navy-800"
              onClick={() => setStep('email')}
            >
              Изменить email
            </button>
          </div>
        </form>
      )}
    </Modal>
  )
}
