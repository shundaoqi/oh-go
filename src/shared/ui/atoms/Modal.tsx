'use client';

import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  IconButton 
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { ReactNode } from 'react';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disableBackdropClick?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  disableBackdropClick = false
}) => {
  const handleClose = (event: object, reason?: string) => {
    if (disableBackdropClick && reason === 'backdropClick') {
      return;
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        className: 'rounded-lg'
      }}
    >
      {title && (
        <DialogTitle className="flex items-center justify-between">
          <span>{title}</span>
          <IconButton 
            onClick={onClose}
            size="small"
            className="text-gray-500"
          >
            <Close />
          </IconButton>
        </DialogTitle>
      )}
      
      <DialogContent className="pb-4">
        {children}
      </DialogContent>
      
      {actions && (
        <DialogActions className="px-6 pb-4">
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};