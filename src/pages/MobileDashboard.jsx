import {
  Box,
  Typography,
  Stack,
  IconButton,
  Card,
  CardContent,
  Divider,
  useTheme
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default function MobileDashboard({ user, devices = [], users = [], token }) {
  const theme = useTheme();
  const greeting = getGreeting();
  const device = devices[0]; // Simplified for mobile: display first device

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', pb: 8 }}>
      {/* 🧭 Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, pt: 2 }}>
        <Typography variant="h6" fontWeight={800}>
          {greeting}, {user?.username || 'User'}!
        </Typography>
        <IconButton>
          <MenuIcon />
        </IconButton>
      </Stack>

      {/* 📌 Device Summary */}
      <Typography variant="body2" color="text.secondary" sx={{ px: 2, mt: 1 }}>
        {device?.name || 'Eden Stove'} — Status: Operational
      </Typography>

      {/* 🔋 System Health */}
      <Section title="System Health">
        <DeviceCard
          icon={<BatteryChargingFullIcon color="primary" />}
          title="Battery"
          content="Battery level: 83%"
        />
        <DeviceCard
          icon={<DeviceThermostatIcon color="primary" />}
          title="Temperature"
          content="Current temp: 42°C"
        />
        <DeviceCard
          icon={<WarningAmberIcon color="error" />}
          title="Alerts"
          content="No active alerts"
        />
      </Section>

      {/* ⛽ Fuel & Monitoring */}
      <Section title="Monitoring">
        <DeviceCard
          icon={<GasMeterIcon color="primary" />}
          title="Fuel Mode"
          content="Mode: Smart Burn"
        />
        <DeviceCard
          icon={<ShowChartIcon color="info" />}
          title="Usage Chart"
          content="View usage patterns over time"
        />
      </Section>

      {/* 💬 Engagement */}
      <Section title="Support & Services">
        <DeviceCard
          icon={<SupportAgentIcon color="primary" />}
          title="Service Request"
          content="No open tickets"
        />
        <DeviceCard
          icon={<LocalOfferIcon color="secondary" />}
          title="Special Offers"
          content="You have 2 new offers"
        />
      </Section>
    </Box>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function Section({ title, children }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" fontWeight={700} sx={{ px: 2, mb: 1 }}>
        {title}
      </Typography>
      <Stack spacing={2} sx={{ px: 2 }}>
        {children}
      </Stack>
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
}

function DeviceCard({ icon, title, content }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: 'background.paper' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1}>
          {icon}
          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}