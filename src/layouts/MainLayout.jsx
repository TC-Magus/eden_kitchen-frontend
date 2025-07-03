import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function MainLayout({ children, onLogout }) {
  const navigate = useNavigate();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Eden Kitchen App
          </Typography>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/devices">Devices</Button>
          <Button color="inherit" component={Link} to="/users">Users</Button>
          <Button color="inherit" onClick={() => { onLogout(); navigate('/login'); }}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>{children}</Box>
    </Box>
  );
}
