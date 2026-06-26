'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'bordered' | 'elevated';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  padding?: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white shadow-sm',
  bordered: 'bg-white border border-slate-200',
  elevated: 'bg-white shadow-lg',
};

const paddingStyles: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  className,
  variant = 'default',
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl',
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
