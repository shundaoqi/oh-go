import { Alert, AlertProps } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

export interface SuccessMessageProps extends Omit<AlertProps, 'severity'> {
  message?: string;
  title?: string;
  onClose?: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  title,
  onClose,
  children,
  ...props
}) => {
  if (!message && !children) return null;

  return (
    <Alert 
      severity="success" 
      icon={<CheckCircle />}
      onClose={onClose}
      className="mb-4"
      {...props}
    >
      {title && (
        <div className="font-semibold mb-1">
          {title}
        </div>
      )}
      {message && <div>{message}</div>}
      {children}
    </Alert>
  );
};