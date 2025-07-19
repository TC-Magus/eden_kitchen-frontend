// Layout shell with dark drawer and minimalist vibe

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

function getAvatarProps(name) {
  if (!name) return { children: 'A', sx: { bgcolor: '#7e57c2', color: '#fff' } };
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const color = '#7e57c2';
  return { children: initials, sx: { bgcolor: color, color: '#fff' } };
}

export default function ModernLayout({ children, onLogout, user }) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawerContent = (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
        <Avatar src={edenLogo} sx={{ width: 72, height: 72, mb: 2 }} />
        <Typography variant="h6">{user?.name || 'Eden User'}</Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email || 'admin@eden.com'}
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
      <List>
        {navItems.map(item => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              mx: 2, borderRadius: 2,
              background: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'none',
              '&:hover': { background: 'rgba(255,255,255,0.08)' },
            }}
          >
            <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem button onClick={onLogout} sx={{ mx: 2, mt: 2, borderRadius: 2 }}>
          <ListItemIcon sx={{ color: '#fff' }}><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box className="watermark-wrapper" sx={{ display: 'flex' }}>
      {isMobile && (
        <IconButton
          onClick={() => setMobileOpen(!mobileOpen)}
          sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1301 }}
        >
          <MenuIcon sx={{ color: '#fff' }} />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: '#1A1334',
            color: '#fff',
            border: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 4 }, maxWidth: '100vw' }}>
        {children}
      </Box>
    </Box>
  );
}
