'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PricingToggleProps {
  onChange?: (isYearly: boolean) => void;
  defaultYearly?: boolean;
}

export function PricingToggle({ onChange, defaultYearly = false }: PricingToggleProps) {
  const [isYearly, setIsYearly] = useState(defaultYearly);

  const handleToggle = () => {
    const newValue = !isYearly;
    setIsYearly(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="inline-flex items-center gap-6">
      <span
        className={cn(
          'font-heading font-medium text-lg transition-colors',
          !isYearly ? 'text-slate-900' : 'text-slate-500'
        )}
      >
        Monthly
      </span>

      <button
        onClick={handleToggle}
        className={cn(
          'relative inline-flex h-12 w-24 items-center rounded-full transition-colors duration-300',
          isYearly ? 'bg-blue-600' : 'bg-slate-300'
        )}
        aria-label="Toggle pricing period"
      >
        <span
          className={cn(
            'inline-block h-10 w-10 transform rounded-full bg-white transition-transform duration-300',
            isYearly ? 'translate-x-[52px]' : 'translate-x-1'
          )}
        />
      </button>

      <div className="flex items-baseline gap-1">
        <span
          className={cn(
            'font-heading font-medium text-lg transition-colors',
            isYearly ? 'text-slate-900' : 'text-slate-500'
          )}
        >
          Yearly
        </span>
        {isYearly && (
          <span className="inline-block bg-emerald-100 text-emerald-900 text-xs font-bold px-2 py-1 rounded-full ml-1">
            SAVE 20%
          </span>
        )}
      </div>
    </div>
  );
}
