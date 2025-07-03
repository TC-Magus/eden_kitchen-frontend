import { Typography, Box, Card, CardContent, Grid, Avatar, Stack } from '@mui/material';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import GroupIcon from '@mui/icons-material/Group';
import FuelMode from '../components/FuelMode';
import Battery from '../components/Battery';
import Temperature from '../components/Temperature';
import ModeHistory from '../components/ModeHistory';
import ServiceRequest from '../components/ServiceRequest';


export default function Dashboard() {
  // Example stats (replace with real data if available)
  const stats = [
    { label: 'Devices', value: 8, icon: <DevicesOtherIcon fontSize="large" color="primary" /> },
    { label: 'Users', value: 24, icon: <GroupIcon fontSize="large" color="secondary" /> },
  ];

  return (
    <Box>
      {/* Existing welcome card */}
      <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3, background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2}>
            <Avatar sx={{ width: 72, height: 72, bgcolor: '#fff', color: '#667eea', fontWeight: 700, fontSize: 32 }}>A</Avatar>
            <Box>
              <Typography variant="h4" fontWeight={800}>Welcome, Admin!</Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>Manage your devices and users with ease.</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
  
      {/* Existing stats grid */}
      <Grid container spacing={3}>
        {stats.map(stat => (
          <Grid item xs={12} sm={6} md={4} key={stat.label}>
            <Card sx={{ borderRadius: 3, boxShadow: 2, p: 2 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {stat.icon}
                  <Box>
                    <Typography variant="h5" fontWeight={700}>{stat.value}</Typography>
                    <Typography color="text.secondary">{stat.label}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Battery />
        </Grid>
        <Grid item xs={12} md={6}>
          <Temperature />
        </Grid>
      </Grid>
  
      {/* 🔥 NEW: Fuel Mode Component */}
      <Box mt={4}>
        <FuelMode />
        <Box mt={4}>
          <ModeHistory />
        </Box>
      </Box> 
      <Box mt={4}>
        <ServiceRequest />
      </Box>
    </Box>
    
  );
  
}
