import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Stack
} from '@mui/material';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import GroupIcon from '@mui/icons-material/Group';
import { useEffect, useState } from 'react';
import axios from 'axios';

import FuelMode from '../components/FuelMode';
import Battery from '../components/Battery';
import Temperature from '../components/Temperature';
import ModeHistory from '../components/ModeHistory';
import ServiceRequest from '../components/ServiceRequest';
import Alerts from '../components/Alerts';
import SpecialOffer from '../components/SpecialOffer';
import UsageChart from '../components/UsageChart';

function SystemStatus() {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          System Status
        </Typography>
        <Typography variant="body2" color="text.secondary">
          All devices are operating normally. Last sync: 5 mins ago.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function Dashboard({ user }) {
  const [greeting, setGreeting] = useState('');
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await axios.get(`${import.meta.env.API_BASE_URL}/devices`);
        setDevices(res.data);
      } catch (err) {
        console.error('Error fetching devices:', err);
      }
    };

    fetchDevices();
  }, []);

  const stats = [
    {
      label: 'Devices',
      value: devices.length,
      icon: <DevicesOtherIcon fontSize="large" color="primary" />
    },
    {
      label: 'Users',
      value: 5,
      icon: <GroupIcon fontSize="large" color="secondary" />
    }
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              background: 'linear-gradient(to right, #66bb6a, #a5d6a7)',
              color: '#fff'
            }}
          >
            <CardContent>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems="center"
                spacing={2}
              >
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    bgcolor: '#fff',
                    color: '#667eea',
                    fontWeight: 700,
                    fontSize: 32
                  }}
                ></Avatar>
                <Box>
                  <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>
                    {greeting}, {user?.name?.split(' ')[0] || 'User'}!
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Manage your devices and users with ease.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {stats.map(stat => (
          <Grid item xs={6} sm={3} md={3} key={stat.label}>
            <Card sx={{ borderRadius: 3, boxShadow: 2, p: 2 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {stat.icon}
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      {stat.value}
                    </Typography>
                    <Typography color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 👇 Device Live Status Cards */}
      <Typography variant="h6" fontWeight={700} sx={{ mt: 4, mb: 1 }}>
        Device Status Overview
      </Typography>

      <Grid container spacing={3}>
        {devices.map(device => (
          <Grid item xs={12} sm={6} md={4} key={device.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>
                  {device.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {device.description}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  Mode: {device.mode}
                </Typography>
                <Typography>
                  Battery: {device.battery_level}%
                </Typography>
                <Typography>
                  Temperature: {device.temperature}°C
                </Typography>
                <Typography>
                  Fuel Mode: {device.fuel_mode}
                </Typography>
                <Typography sx={{ mt: 1, fontWeight: 500 }}>
                  Alerts:
                </Typography>
                {device.alerts.length > 0 ? (
                  device.alerts.map((a, i) => (
                    <Typography key={i} color="error">• {a}</Typography>
                  ))
                ) : (
                  <Typography color="text.secondary">No alerts</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* System Health */}
      <Typography variant="h6" fontWeight={700} sx={{ mt: 4, mb: 1 }}>
        System Health
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={3}>
            <Battery />
            <Temperature />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Alerts />
        </Grid>
      </Grid>

      {/* Fuel Control + Mode History */}
      <Typography variant="h6" fontWeight={700} sx={{ mt: 4, mb: 1 }}>
        Fuel Monitoring & History
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <FuelMode />
            <ModeHistory />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ mt: { xs: 0, md: -2 } }}>
            <UsageChart />
          </Box>
        </Grid>
      </Grid>

      {/* Support & Engagement */}
      <Typography variant="h6" fontWeight={700} sx={{ mt: 4, mb: 1 }}>
        Support & Engagement
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Left Column: ServiceRequest */}
        <Grid item xs={12} md={6}>
          <ServiceRequest />
        </Grid>

        {/* Right Column: Stack of SpecialOffer + SystemStatus */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3} sx={{ mt: { xs: 0, md: 3 } }}>
            <SpecialOffer />
            <SystemStatus />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
