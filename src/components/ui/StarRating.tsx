'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: string;
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showLabel = true,
  color = 'text-yellow-400',
}: StarRatingProps) {
  const iconSize = sizeMap[size];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={iconSize}
            className={cn('fill-current', color)}
          />
        ))}

        {hasHalfStar && (
          <div key="half" className="relative inline-flex">
            <Star size={iconSize} className={cn('text-slate-300')} />
            <div className="absolute overflow-hidden w-1/2">
              <Star
                size={iconSize}
                className={cn('fill-current', color)}
              />
            </div>
          </div>
        )}

        {Array.from({ length: maxRating - fullStars - (hasHalfStar ? 1 : 0) }).map(
          (_, i) => (
            <Star
              key={`empty-${i}`}
              size={iconSize}
              className="text-slate-300"
            />
          )
        )}
      </div>

      {showLabel && (
        <span className="font-heading font-bold text-lg text-slate-900">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
