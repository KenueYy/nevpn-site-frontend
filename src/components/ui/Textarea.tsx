import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full">
        {label ? (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-navy-800">
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'min-h-[100px] w-full rounded-lg border bg-white px-4 py-3 text-navy-950 outline-none transition-colors placeholder:text-navy-400',
            error
              ? 'border-red-400 focus:border-red-500'
              : 'border-navy-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100',
            className,
          )}
          {...props}
        />
        {error ? <p className="mt-1.5 text-sm text-red-600">{error}</p> : null}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'
