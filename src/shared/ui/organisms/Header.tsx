'use client';

import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { useState, ReactNode } from 'react';

export interface HeaderProps {
  title?: string;
  userDisplayName?: string;
  onLogout?: () => void;
  children?: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'おごり自販機管理',
  userDisplayName,
  onLogout,
  children
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout?.();
  };

  return (
    <AppBar position="static" className="shadow-sm">
      <Toolbar>
        <Typography variant="h6" component="div" className="flex-grow">
          {title}
        </Typography>
        
        {children}
        
        {userDisplayName && (
          <div className="flex items-center">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>
                <Typography variant="body2" className="text-gray-600">
                  {userDisplayName}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToApp className="mr-2" />
                ログアウト
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};