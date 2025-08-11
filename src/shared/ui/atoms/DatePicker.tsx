'use client';

import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { forwardRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';

export interface DatePickerProps {
  label?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  minDate?: Date;
  maxDate?: Date;
  fullWidth?: boolean;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ 
    label, 
    value, 
    onChange, 
    disabled, 
    error, 
    helperText, 
    minDate, 
    maxDate, 
    fullWidth = true 
  }, ref) => {
    const handleChange = (newValue: Dayjs | null) => {
      onChange?.(newValue ? newValue.toDate() : null);
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiDatePicker
          label={label}
          value={value ? dayjs(value) : null}
          onChange={handleChange}
          disabled={disabled}
          minDate={minDate ? dayjs(minDate) : undefined}
          maxDate={maxDate ? dayjs(maxDate) : undefined}
          slots={{
            textField: TextField,
          }}
          slotProps={{
            textField: {
              ref,
              fullWidth,
              error,
              helperText,
              variant: 'outlined'
            },
          }}
        />
      </LocalizationProvider>
    );
  }
);

DatePicker.displayName = 'DatePicker';