import React from 'react';
import { cn } from '@/lib/utils';

// Polymorphic props — Button can render as <button> OR <a> when href is provided.
// Visual styling is identical; only the underlying element changes.
type ButtonOwnProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  className?: string;
};

type ButtonProps = ButtonOwnProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement> &
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof ButtonOwnProps
  >;

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-inter font-medium rounded-xl transition-all duration-300 cursor-pointer';

    const variantStyles = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md',
      secondary:
        'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-900 shadow-sm hover:shadow-md',
      outline:
        'border-2 border-slate-300 text-slate-900 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50',
    };

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-8 py-3.5 text-base',
      lg: 'px-10 py-4 text-lg',
    };

    const classes = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
