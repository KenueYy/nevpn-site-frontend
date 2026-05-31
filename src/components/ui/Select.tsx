import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, id, children, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full">
        {label ? (
          <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-navy-800">
            {label}
          </label>
        ) : null}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'h-11 w-full rounded-lg border bg-white px-4 text-navy-950 outline-none transition-colors',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-navy-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        {error ? <p className="mt-1.5 text-sm text-red-600">{error}</p> : null}
        {hint && !error ? <p className="mt-1.5 text-sm text-navy-500">{hint}</p> : null}
      </div>
    )
  },
)
Select.displayName = 'Select'
