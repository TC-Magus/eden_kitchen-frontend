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

import FuelMode from '../components/FuelMode';
import Battery from '../components/Battery';
import Temperature from '../components/Temperature';
import ModeHistory from '../components/ModeHistory';
import ServiceRequest from '../components/ServiceRequest';
import Alerts from '../components/Alerts';
import SpecialOffer from '../components/SpecialOffer';
import UsageChart from '../components/UsageChart';

function SectionTitle({ children }) {
  return <Typography className="section-title">{children}</Typography>;
}

export default function Dashboard({ user }) {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
    );
  }, []);

  const stats = [
    {
      label: 'Devices',
      value: 2,
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
      {/* Greeting */}
      <Box className="dark-card" sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          {greeting}, {user?.name?.split(' ')[0] || 'User'}!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back to your dashboard.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        {stats.map(stat => (
          <Grid item xs={6} md={3} key={stat.label}>
            <Box className="dark-card">
              <Stack direction="row" alignItems="center" spacing={2}>
                {stat.icon}
                <Box>
                  <Typography variant="h5">{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* System Health */}
      <SectionTitle>System Health</SectionTitle>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Battery />
            <Temperature />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Alerts />
        </Grid>
      </Grid>

      {/* Fuel + Usage */}
      <SectionTitle>Fuel Monitoring & History</SectionTitle>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <FuelMode />
            <ModeHistory />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <UsageChart />
        </Grid>
      </Grid>

      {/* Support */}
      <SectionTitle>Support & Offers</SectionTitle>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ServiceRequest />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <SpecialOffer />
            <Card className="dark-card">
              <CardContent>
                <Typography variant="body2">
                  System operating normally. Last sync: 5 mins ago.
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
