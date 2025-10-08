import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent text-sm font-semibold leading-tight transition-[color,background,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 data-[state=open]:scale-[0.97]',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-glow-sm hover:shadow-glow-md hover:-translate-y-0.5 active:translate-y-0',
        destructive:
          'bg-destructive text-destructive-foreground shadow-glow-sm hover:shadow-glow-md hover:-translate-y-0.5 active:translate-y-0',
        outline:
          'border-border bg-transparent text-foreground hover:bg-muted/60 hover:text-foreground',
        secondary:
          'bg-secondary/90 text-secondary-foreground shadow-glow-sm hover:bg-secondary hover:shadow-glow-md hover:-translate-y-0.5',
        ghost:
          'bg-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground',
        subtle:
          'bg-card text-card-foreground shadow-glow-sm hover:shadow-glow-md hover:bg-card/90',
        link: 'text-primary underline-offset-[6px] hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-12 rounded-lg px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
