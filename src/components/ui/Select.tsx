'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-900 mb-2 font-heading">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200',
              'text-slate-900 font-body text-base appearance-none cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white',
              'transition-colors duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'pr-10',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none"
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 font-body">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-slate-500 font-body">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
