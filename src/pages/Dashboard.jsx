import {
  Typography,
  Box,
  Grid,
  Avatar,
  Card,
  CardContent,
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

  const leftDevice = devices[0];
  const rightDevice = devices[1];

  const renderDeviceColumn = (device) => (
    <Grid container spacing={3}>
      {/* System Health Row */}
      {/* 🔋🌡️ System Health — Row for Two Devices */}
<Grid container spacing={4} sx={{ mb: 4 }}>
  {/* Left Device System Health */}
  <Grid item xs={12} md={6}>
    <Grid container spacing={2}>
      {/* Battery + Temperature */}
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Battery deviceId={devices[0].id} />
          <Temperature deviceId={devices[0].id} />
        </Stack>
      </Grid>

      {/* Alerts */}
      <Grid item xs={6}>
        <Alerts deviceId={devices[0].id} />
      </Grid>
    </Grid>
  </Grid>

  {/* Right Device System Health */}
  <Grid item xs={12} md={6}>
    <Grid container spacing={2}>
      {/* Battery + Temperature */}
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Battery deviceId={devices[1].id} />
          <Temperature deviceId={devices[1].id} />
        </Stack>
      </Grid>

      {/* Alerts */}
      <Grid item xs={6}>
        <Alerts deviceId={devices[1].id} />
      </Grid>
    </Grid>
  </Grid>
</Grid>

      {/* Fuel Monitoring Row */}
      <Grid item xs={6}>
        <Stack spacing={3}>
          <FuelMode deviceId={device.id} />
          <ModeHistory deviceId={device.id} />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <UsageChart deviceId={device.id} />
      </Grid>

      {/* Support Row */}
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
      {/* Welcome Card */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
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
                  You have {deviceCount} devices and {userCount} users connected.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  All devices are operating normally.
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Two Devices Layout */}
      {deviceCount === 2 ? (
        <Grid container spacing={4}>
          {/* Left Device */}
          <Grid item xs={12} md={6}>
            {renderDeviceColumn(leftDevice)}
          </Grid>

          {/* Right Device */}
          <Grid item xs={12} md={6}>
            {renderDeviceColumn(rightDevice)}
          </Grid>
        </Grid>
      ) : (
        <Typography color="text.secondary">
          This layout supports exactly two devices. Additional layout rules for other counts coming soon.
        </Typography>
      )}
    </Box>
  );
}