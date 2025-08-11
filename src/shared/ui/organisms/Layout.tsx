'use client';

import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ReactNode } from 'react';
import { Header, HeaderProps } from './Header';
import { Navigation, NavigationProps } from './Navigation';
import { Footer, FooterProps } from './Footer';

export interface LayoutProps {
  children: ReactNode;
  header?: HeaderProps;
  navigation?: NavigationProps;
  footer?: FooterProps;
  showNavigation?: boolean;
  showFooter?: boolean;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  navigation,
  footer,
  showNavigation = true,
  showFooter = false
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="flex flex-col min-h-screen">
        {header && <Header {...header} />}
        
        <Box 
          component="main" 
          className={`flex-1 ${showNavigation ? 'pb-16' : ''}`}
        >
          {children}
        </Box>
        
        {showFooter && footer && <Footer {...footer} />}
        
        {showNavigation && <Navigation {...navigation} />}
      </Box>
    </ThemeProvider>
  );
};