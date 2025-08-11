import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error = false,
  helperText,
  children,
  fullWidth = true
}) => {
  return (
    <Box className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <Typography 
          variant="subtitle2" 
          className={`mb-1 ${error ? 'text-red-600' : 'text-gray-700'}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Typography>
      )}
      
      {children}
      
      {helperText && (
        <Typography 
          variant="caption" 
          className={`mt-1 block ${error ? 'text-red-600' : 'text-gray-500'}`}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};