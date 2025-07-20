import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import GroupIcon from '@mui/icons-material/Group';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const StatCard = ({ icon, label, value, iconColor }) => (
  <Card
    sx={{
      bgcolor: '#252947',
      color: '#E0E0E0',
      borderRadius: 3,
      boxShadow: 3,
      p: 2,
    }}
  >
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar sx={{ bgcolor: iconColor, width: 48, height: 48 }}>
        {icon}
      </Avatar>
      <Box>
        <Typography variant="subtitle2" color="gray">
          {label}
        </Typography>
        <Typography variant="h6">{value}</Typography>
      </Box>
    </Stack>
  </Card>
);

export default function Dashboard() {
  return (
    <Box>
      {/* Welcome Header */}
      <Typography variant="h4" fontWeight={600} mb={3} color="white">
        Welcome back to Eden Kitchen
      </Typography>

      {/* Quick Stats */}
      <Grid container spacing={3} mb={5}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<DevicesOtherIcon />}
            label="Active Devices"
            value="12"
            iconColor="#4CD9C1"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<GroupIcon />}
            label="Connected Users"
            value="8"
            iconColor="#A080FF"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<BatteryChargingFullIcon />}
            label="Battery Status"
            value="Good"
            iconColor="#FFD166"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<ThermostatIcon />}
            label="Temperature"
            value="24°C"
            iconColor="#FF6B6B"
          />
        </Grid>
      </Grid>

      {/* Section Divider */}
      <Divider sx={{ borderColor: '#333', mb: 4 }} />

      {/* Control and Alerts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#252947', borderRadius: 3, boxShadow: 2, p: 3 }}>
            <Typography variant="h6" mb={2} color="white">
              Controls
            </Typography>
            <Typography variant="body2" color="gray">
              • Stove: ON  
            </Typography>
            <Typography variant="body2" color="gray">
              • Fan: Auto Mode  
            </Typography>
            <Typography variant="body2" color="gray">
              • Exhaust: Scheduled  
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#252947', borderRadius: 3, boxShadow: 2, p: 3 }}>
            <Typography variant="h6" mb={2} color="white">
              Alerts & Offers
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <WarningAmberIcon sx={{ color: '#FF6B6B' }} />
              <Typography variant="body2" color="gray">
                Overheat warning on Burner 2
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocalOfferIcon sx={{ color: '#4CD9C1' }} />
              <Typography variant="body2" color="gray">
                Save 20% on power with eco-mode
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
