import { CircularProgress, Box, Typography } from '@mui/material';

export interface LoadingProps {
  size?: number | 'small' | 'medium' | 'large';
  message?: string;
  fullScreen?: boolean;
  color?: 'primary' | 'secondary' | 'inherit';
}

export const Loading: React.FC<LoadingProps> = ({ 
  size = 'medium', 
  message, 
  fullScreen = false, 
  color = 'primary' 
}) => {
  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50'
    : 'flex items-center justify-center p-4';

  return (
    <Box className={containerClass}>
      <Box className="flex flex-col items-center gap-2">
        <CircularProgress size={size} color={color} />
        {message && (
          <Typography variant="body2" className="text-gray-600">
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};