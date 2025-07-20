import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Stack
} from '@mui/material';

import { useEffect, useState } from 'react';
import Battery from '../components/Battery';
import Temperature from '../components/Temperature';
import FuelMode from '../components/FuelMode';
import ModeHistory from '../components/ModeHistory';
import ServiceRequest from '../components/ServiceRequest';
import SpecialOffer from '../components/SpecialOffer';
import Alerts from '../components/Alerts';
import UsageChart from '../components/UsageChart';

export default function Dashboard({ user, devices, users }) {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const deviceCount = devices?.length || 0;
  const userCount = users?.length || 0;

  const getWelcomeAlignment = () => {
    if (deviceCount === 2) return 'center';
    return 'flex-start';
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* ✅ Welcome Card */}
      <Box sx={{ display: 'flex', justifyContent: getWelcomeAlignment(), mb: 4 }}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            background: 'linear-gradient(to right, #66bb6a, #a5d6a7)',
            color: '#fff',
            maxWidth: 480,
            width: '100%'
          }}
        >
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  bgcolor: '#fff',
                  color: '#667eea',
                  fontWeight: 700,
                  fontSize: 32
                }}
              >
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight={800}>
                  {greeting}, {user?.name?.split(' ')[0] || 'User'}!
                </Typography>
                <Typography variant="body1">
                  You have {deviceCount} device{deviceCount !== 1 ? 's' : ''} and {userCount} user{userCount !== 1 ? 's' : ''} connected.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  All devices are operating normally.
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* ❗ Fallback if no devices */}
      {deviceCount === 0 && (
        <Typography variant="h6" color="text.secondary" sx={{ mt: 4 }}>
          No devices connected yet. Add a new one to get started.
        </Typography>
      )}

      {/* 🔹 Device Sections */}
      {deviceCount > 0 && (
        <Grid container spacing={4}>
          {devices.map((device, index) => (
            <Grid
              item
              xs={12}
              sm={deviceCount === 1 ? 12 : 6}
              md={deviceCount >= 3 ? 6 : 6}
              key={device.id}
            >
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {device.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {device.description}
                  </Typography>

                  {/* System Health */}
                  <Typography variant="subtitle1" fontWeight={600} mt={2} mb={1}>
                    System Health
                  </Typography>
                  <Stack spacing={2}>
                    <Battery deviceId={device.id} />
                    <Temperature deviceId={device.id} />
                  </Stack>

                  {/* Fuel Monitoring & History */}
                  <Typography variant="subtitle1" fontWeight={600} mt={3} mb={1}>
                    Fuel Monitoring & History
                  </Typography>
                  <Stack spacing={2}>
                    <FuelMode deviceId={device.id} />
                    <ModeHistory deviceId={device.id} />
                  </Stack>

                  {/* Support & Engagement */}
                  <Typography variant="subtitle1" fontWeight={600} mt={3} mb={1}>
                    Support & Engagement
                  </Typography>
                  <Stack spacing={2}>
                    <ServiceRequest deviceId={device.id} />
                    <SpecialOffer deviceId={device.id} />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* 🔔 Alerts */}
      <Typography variant="h6" fontWeight={700} sx={{ mt: 6, mb: 2 }}>
        Alerts
      </Typography>
      <Alerts />

      {/* 📊 UsageChart */}
      <Typography variant="h6" fontWeight={700} sx={{ mt: 6, mb: 2 }}>
        Overall Usage Trends
      </Typography>
      <UsageChart />
    </Box>
  );
}