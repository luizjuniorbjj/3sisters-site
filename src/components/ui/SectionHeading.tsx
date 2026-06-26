'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';

interface SectionHeadingProps {
  subtitle?: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  subtitle,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={cn('space-y-4', alignClass, className)}>
      {subtitle && (
        <Badge variant="primary">{subtitle}</Badge>
      )}
      <h2 className={cn(
        'font-heading font-bold text-4xl md:text-5xl text-slate-900 leading-tight',
        'max-w-3xl'
      )}>
        {title}
      </h2>
      {description && (
        <p className="font-body text-lg text-slate-600 max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
