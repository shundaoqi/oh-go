import { Box, Typography } from '@mui/material';

export interface FooterProps {
  copyright?: string;
  version?: string;
}

export const Footer: React.FC<FooterProps> = ({
  copyright = '© 2025 おごり自販機管理アプリ',
  version
}) => {
  return (
    <Box 
      component="footer"
      className="bg-gray-50 border-t border-gray-200 py-4 px-4 text-center"
      sx={{ marginTop: 'auto' }}
    >
      <Typography variant="body2" color="text.secondary">
        {copyright}
      </Typography>
      {version && (
        <Typography variant="caption" color="text.secondary" className="block mt-1">
          Version {version}
        </Typography>
      )}
    </Box>
  );
};