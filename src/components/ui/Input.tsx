import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full">
        {label ? (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-navy-800">
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-11 w-full rounded-lg border bg-white px-4 text-navy-950 outline-none transition-colors placeholder:text-navy-400',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-navy-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100',
            className,
          )}
          {...props}
        />
        {error ? <p className="mt-1.5 text-sm text-red-600">{error}</p> : null}
        {hint && !error ? <p className="mt-1.5 text-sm text-navy-500">{hint}</p> : null}
      </div>
    )
  },
)
Input.displayName = 'Input'
