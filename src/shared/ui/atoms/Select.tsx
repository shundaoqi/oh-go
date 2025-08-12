import { FormControl, InputLabel, Select as MuiSelect, MenuItem, SelectProps as MuiSelectProps } from '@mui/material';
import { forwardRef, ReactNode } from 'react';

export interface SelectOption {
  value: string | number;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends Omit<MuiSelectProps, 'children'> {
  label?: string;
  options: SelectOption[];
  fullWidth?: boolean;
  placeholder?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ label, options, fullWidth = true, placeholder, ...props }, ref) => {
    return (
      <FormControl fullWidth={fullWidth} variant="outlined">
        {label && <InputLabel>{label}</InputLabel>}
        <MuiSelect
          ref={ref}
          label={label}
          displayEmpty={!!placeholder}
          {...props}
        >
          {placeholder && (
            <MenuItem value="" disabled>
              <span className="text-gray-500">{placeholder}</span>
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    );
  }
);

Select.displayName = 'Select';