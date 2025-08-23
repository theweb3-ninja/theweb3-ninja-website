import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { toggleVariants, type ToggleVariants } from './toggle-variants';

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ToggleVariants {}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & ToggleVariants
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
