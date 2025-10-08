import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border border-border/45 bg-muted/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow-glow-sm hover:shadow-glow-md',
        secondary:
          'border-transparent bg-secondary/90 text-secondary-foreground hover:bg-secondary',
        destructive:
          'border-transparent bg-destructive/90 text-destructive-foreground hover:bg-destructive',
        success:
          'border-transparent bg-success/90 text-success-foreground hover:bg-success',
        warning:
          'border-transparent bg-warning/90 text-warning-foreground hover:bg-warning',
        outline: 'border-border text-foreground hover:bg-muted/50',
        ghost: 'border-transparent bg-transparent text-muted-foreground hover:bg-muted/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
