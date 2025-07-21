import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Avatar,
  Grid,
  Button,
  useTheme
} from '@mui/material';

import { useState, useEffect } from 'react';
import Battery from '../components/Battery';
import Temperature from '../components/Temperature';
import FuelMode from '../components/FuelMode';
import ModeHistory from '../components/ModeHistory';
import ServiceRequest from '../components/ServiceRequest';
import SpecialOffer from '../components/SpecialOffer';
import Alerts from '../components/Alerts';
import UsageChart from '../components/UsageChart';
import MenuIcon from '@mui/icons-material/Menu';

export default function MobileDashboard({ user, devices = [], users = [] }) {
  const theme = useTheme();
  const [greeting, setGreeting] = useState('');
  const [activeDeviceId, setActiveDeviceId] = useState(devices[0]?.id || null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const activeDevice = devices.find((d) => d.id === activeDeviceId);

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', pb: 8 }}>
      {/* 🧭 Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, pt: 2 }}>
        <Typography variant="h6" fontWeight={800}>
          {greeting}, {user?.username || 'User'}!
        </Typography>
        <MenuIcon />
      </Stack>

      {/* 🎛️ Device Tab Selector */}
      <Stack direction="row" spacing={1} sx={{ px: 2, pt: 2, pb: 2, flexWrap: 'wrap' }}>
        {devices.map((device) => (
          <Button
            key={device.id}
            variant={device.id === activeDeviceId ? 'contained' : 'outlined'}
            sx={{ borderRadius: 5, textTransform: 'none' }}
            onClick={() => setActiveDeviceId(device.id)}
          >
            {device.name || `Device ${device.id}`}
          </Button>
        ))}
      </Stack>

      {/* 🧩 Active Device Section */}
      {activeDevice && (
        <Box sx={{ px: 2 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            {activeDevice.name || `Device ${activeDevice.id}`}
          </Typography>

          <Grid container spacing={2}>
            {/* 🔋🌡️ System Health */}
            <Grid item xs={12}>
              <Stack spacing={2}>
                <Battery deviceId={activeDevice.id} />
                <Temperature deviceId={activeDevice.id} />
                <Alerts deviceId={activeDevice.id} />
              </Stack>
            </Grid>

            {/* ⛽ Fuel Monitoring & History */}
            <Grid item xs={12}>
              <Stack spacing={2}>
                <FuelMode deviceId={activeDevice.id} />
                <ModeHistory deviceId={activeDevice.id} />
                <UsageChart deviceId={activeDevice.id} />
              </Stack>
            </Grid>

            {/* 💌 Support & Engagement */}
            <Grid item xs={12}>
              <Stack spacing={2}>
                <ServiceRequest deviceId={activeDevice.id} />
                <SpecialOffer deviceId={activeDevice.id} />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* ❗ Fallback UI */}
      {devices.length === 0 && (
        <Typography variant="body1" color="text.secondary" sx={{ px: 2 }}>
          No devices are currently connected. Please add one to get started.
        </Typography>
      )}
    </Box>
  );
}