import { Alert, AlertProps } from '@mui/material';
import { Error } from '@mui/icons-material';

export interface ErrorMessageProps extends Omit<AlertProps, 'severity'> {
  message?: string;
  title?: string;
  onClose?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  title,
  onClose,
  children,
  ...props
}) => {
  if (!message && !children) return null;

  return (
    <Alert 
      severity="error" 
      icon={<Error />}
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