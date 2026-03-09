import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';
import { Slot as SlotPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/shared/lib/utils.ts';
import { Spinner } from '@/shared/ui/spinner.tsx';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        'default-light':
          'bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:bg-primary/60 dark:hover:bg-primary/50',
        'warning-light':
          'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 focus-visible:ring-yellow-500/20',
        success:
          'bg-success text-white hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/40 dark:bg-success/60',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        'destructive-outline':
          'border border-destructive/50 text-destructive shadow-xs hover:bg-destructive/10 dark:bg-destructive/10 dark:hover:bg-destructive/20',
        'destructive-ghost':
          'hover:bg-destructive/10 text-destructive dark:hover:bg-destructive/10',
        outline:
          'border shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        'destructive-light':
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20'
      },
      size: {
        default: "h-10 px-4 text-base py-2 has-[>svg]:px-3 [&_svg:not([class*='size-'])]:size-5",
        sm: "h-8 rounded-md gap-1.5 text-sm px-3 has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 rounded-md text-lg px-6 has-[>svg]:px-4 [&_svg:not([class*='size-'])]:size-6",
        icon: "size-10 text-base [&_svg:not([class*='size-'])]:size-5",
        'icon-sm': "size-8 text-sm [&_svg:not([class*='size-'])]:size-4",
        'icon-lg': "size-12 text-lg [&_svg:not([class*='size-'])]:size-6"
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

interface ButtonPropsBase
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

type ButtonProps = ButtonPropsBase &
  (
    | { asChild: true }
    | {
        asChild?: false;
        loading?: boolean;
      }
  );

const Button = ({ className, children, variant, size, ...props }: ButtonProps) => {
  const { asChild, ...rest } = props;
  if (asChild) {
    return (
      <SlotPrimitive.Slot className={cn(buttonVariants({ variant, size, className }))} {...rest}>
        {children}
      </SlotPrimitive.Slot>
    );
  }

  const { loading = false, disabled, ...otherProps } = props;

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={loading || disabled}
      {...otherProps}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
};

export { Button, buttonVariants };
