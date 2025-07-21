import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  IconButton,
  Divider,
  ButtonBase,
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

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', pb: 8 }}>
      {/* 🧭 Top Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, pt: 2 }}>
        <Typography variant="h6" fontWeight={800}>
          {greeting}, {user?.username || 'User'}!
        </Typography>
        <IconButton>
          <MenuIcon />
        </IconButton>
      </Stack>

      {/* 🔁 Loop through devices */}
      {devices.map((device) => (
        <Box key={device.id} sx={{ mt: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} sx={{ px: 2, mb: 1 }}>
            {device.name || `Device ${device.id}`} — Status: Online
          </Typography>

          {/* 🔋 System Health */}
          <Section title="System Health">
            <InteractiveCard
              icon={<BatteryChargingFullIcon color="primary" />}
              title="Battery"
              content={`Battery level: ${device.batteryLevel || 'N/A'}%`}
              onClick={() => console.log('Open battery history for', device.id)}
            />
            <InteractiveCard
              icon={<DeviceThermostatIcon color="primary" />}
              title="Temperature"
              content={`Current temp: ${device.temperature || 'N/A'}°C`}
              onClick={() => console.log('Open temperature details for', device.id)}
            />
            <InteractiveCard
              icon={<WarningAmberIcon color="error" />}
              title="Alerts"
              content={device.alerts?.length ? `Active alerts: ${device.alerts.length}` : 'No active alerts'}
              onClick={() => console.log('View alerts for', device.id)}
            />
          </Section>

          {/* ⛽ Monitoring */}
          <Section title="Monitoring">
            <InteractiveCard
              icon={<GasMeterIcon color="primary" />}
              title="Fuel Mode"
              content={`Mode: ${device.fuelMode || 'Smart'}`}
              onClick={() => console.log('Change fuel mode for', device.id)}
            />
            <InteractiveCard
              icon={<ShowChartIcon color="info" />}
              title="Usage Chart"
              content="Tap to view usage trends"
              onClick={() => console.log('Open usage chart for', device.id)}
            />
          </Section>

          {/* 💬 Support */}
          <Section title="Support & Services">
            <InteractiveCard
              icon={<SupportAgentIcon color="primary" />}
              title="Service Request"
              content="No active tickets"
              onClick={() => console.log('Submit service request for', device.id)}
            />
            <InteractiveCard
              icon={<LocalOfferIcon color="secondary" />}
              title="Special Offers"
              content="2 new offers available"
              onClick={() => console.log('View offers for', device.id)}
            />
          </Section>
        </Box>
      ))}
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

function InteractiveCard({ icon, title, content, onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        display: 'block',
        textAlign: 'left',
        width: '100%',
        borderRadius: 3,
        boxShadow: 2,
        bgcolor: 'background.paper'
      }}
    >
      <Card sx={{ borderRadius: 3 }}>
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
    </ButtonBase>
  );
}