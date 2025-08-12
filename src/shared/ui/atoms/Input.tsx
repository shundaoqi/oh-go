import { TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'standard' | 'outlined' | 'filled';
}

export const Input = forwardRef<HTMLDivElement, InputProps>(
  ({ variant = 'outlined', fullWidth = true, ...props }, ref) => {
    return (
      <TextField
        ref={ref}
        variant={variant}
        fullWidth={fullWidth}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';