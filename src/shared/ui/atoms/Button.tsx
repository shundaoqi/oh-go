import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { forwardRef } from 'react';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'text' | 'outlined';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, ...props }, ref) => {
    const muiVariant = variant === 'primary' ? 'contained' : 
                      variant === 'secondary' ? 'contained' : 
                      variant === 'text' ? 'text' : 'outlined';
    
    const colorScheme = variant === 'primary' ? 'primary' : 
                       variant === 'secondary' ? 'secondary' : 'primary';

    return (
      <MuiButton
        ref={ref}
        variant={muiVariant}
        color={colorScheme}
        className={`${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';