import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
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

export default function Dashboard({ user, devices = [], users = [] }) {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const deviceCount = devices.length;
  const userCount = users.length;

  const getWelcomeAlignment = () => {
    if (deviceCount === 2) return 'center';
    return 'flex-start';
  };

  const renderDeviceSection = (device) => (
    <Grid container spacing={2}>
      {/* 🔋🌡️ System Health */}
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Battery deviceId={device.id} />
          <Temperature deviceId={device.id} />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Alerts deviceId={device.id} />
      </Grid>

      {/* ⛽ Fuel Monitoring & History */}
      <Grid item xs={6}>
        <Stack spacing={2}>
          <FuelMode deviceId={device.id} />
          <ModeHistory deviceId={device.id} />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <UsageChart deviceId={device.id} />
      </Grid>

      {/* 💌 Support & Engagement */}
      <Grid item xs={6}>
        <ServiceRequest deviceId={device.id} />
      </Grid>
      <Grid item xs={6}>
        <SpecialOffer deviceId={device.id} />
      </Grid>
    </Grid>
  );

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

      {/* ❗ Fallback UI */}
      {deviceCount === 0 && (
        <Typography variant="body1" color="text.secondary">
          No devices are currently connected. Please add one to get started.
        </Typography>
      )}

      {/* 🔹 Adaptive Layout for Devices */}
      {deviceCount > 0 && (
        <>
          {/* Render in pairs */}
          {Array.from({ length: Math.ceil(deviceCount / 2) }, (_, rowIndex) => {
            const leftDevice = devices[rowIndex * 2];
            const rightDevice = devices[rowIndex * 2 + 1];

            return (
              <Grid container spacing={4} key={rowIndex} sx={{ mb: 4 }}>
                {/* Left Device */}
                {leftDevice && (
                  <Grid item xs={12} md={deviceCount === 1 ? 12 : 6}>
                    {renderDeviceSection(leftDevice)}
                  </Grid>
                )}

                {/* Right Device */}
                {rightDevice && (
                  <Grid item xs={12} md={6}>
                    {renderDeviceSection(rightDevice)}
                  </Grid>
                )}
              </Grid>
            );
          })}
        </>
      )}
    </Box>
  );
}