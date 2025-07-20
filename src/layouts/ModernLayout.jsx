import { useState } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemIcon, ListItemText,
  Avatar, Typography, Divider, useMediaQuery, IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import edenLogo from '../assets/logo.png';
import '../App.css';

const drawerWidth = 220;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Devices', icon: <DevicesOtherIcon />, path: '/devices' },
  { text: 'Users', icon: <GroupIcon />, path: '/users' },
];

// Helper to get initials and color
function getAvatarProps(name) {
  if (!name) return { children: 'A', sx: { bgcolor: '#1976d2', color: '#fff' } };
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const colors = ['#1976d2', '#43a047', '#d32f2f', '#fbc02d', '#7b1fa2'];
  const color = colors[(name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % colors.length];
  return { children: initials, sx: { bgcolor: color, color: '#fff' } };
}

export default function ModernLayout({ children, onLogout, user }) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(prev => !prev);

  const displayName = user?.name || 'Eden Kitchen';
  const displayEmail = user?.email || 'admin@edenkitchen.com';

  const drawerContent = (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
        <Avatar src={edenLogo} sx={{ width: 80, height: 80, mb: 2 }} />
        <Typography variant="h6" fontWeight={700}>{displayName}</Typography>
        <Typography variant="body2" color="rgba(255,255,255,0.7)">{displayEmail}</Typography>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.12)' }} />
      <List>
        {navItems.map(item => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              my: 1,
              mx: 2,
              background: location.pathname === item.path
                ? 'rgba(129, 199, 132, 0.2)'
                : 'none',
              '&:hover': {
                background: 'rgba(129, 199, 132, 0.1)',
              },
            }}
            onClick={isMobile ? handleDrawerToggle : undefined}
          >
            <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box flexGrow={1} />
      <List>
        <ListItem button onClick={onLogout} sx={{ borderRadius: 2, mx: 2, mb: 2, '&:hover': { background: 'rgba(129, 199, 132, 0.1)' } }}>
          <ListItemIcon sx={{ color: '#fff' }}><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box className="watermark-wrapper" sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Hamburger menu icon for mobile */}
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1301 }}
        >
          <MenuIcon sx={{ color: '#1b4332' }} />
        </IconButton>
      )}

      {/* Conditional Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              background: '#1b4332',
              color: '#fff',
              border: 'none',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: '#1b4332',
              color: '#fff',
              border: 'none',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 4 },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100vw'
        }}
      >
        {children}
        <Box sx={{ mt: 'auto', textAlign: 'center', py: 2, color: 'rgba(0,0,0,0.4)' }}>
          © {new Date().getFullYear()} Eden Kitchen Platform
        </Box>
      </Box>
    </Box>
  );
}
