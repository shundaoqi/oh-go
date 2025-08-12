'use client';

import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper,
  Badge 
} from '@mui/material';
import { 
  Dashboard, 
  ViewList, 
  History, 
  Person 
} from '@mui/icons-material';
import { useState } from 'react';

export interface NavigationItem {
  label: string;
  value: string;
  icon: React.ReactElement;
  badge?: number;
}

export interface NavigationProps {
  value?: string;
  onChange?: (value: string) => void;
  items?: NavigationItem[];
}

const defaultItems: NavigationItem[] = [
  {
    label: 'ダッシュボード',
    value: 'dashboard',
    icon: <Dashboard />
  },
  {
    label: '利用状況',
    value: 'status',
    icon: <ViewList />
  },
  {
    label: '履歴',
    value: 'history',
    icon: <History />
  },
  {
    label: 'プロフィール',
    value: 'profile',
    icon: <Person />
  }
];

export const Navigation: React.FC<NavigationProps> = ({
  value: controlledValue,
  onChange,
  items = defaultItems
}) => {
  const [internalValue, setInternalValue] = useState('dashboard');
  
  const currentValue = controlledValue ?? internalValue;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <Paper 
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} 
      elevation={3}
    >
      <BottomNavigation
        value={currentValue}
        onChange={handleChange}
        showLabels
      >
        {items.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={
              item.badge ? (
                <Badge badgeContent={item.badge} color="error">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )
            }
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};