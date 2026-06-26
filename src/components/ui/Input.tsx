'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-900 mb-2 font-heading">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200',
            'text-slate-900 placeholder-slate-500 font-body text-base',
            'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white',
            'transition-colors duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
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

Input.displayName = 'Input';
