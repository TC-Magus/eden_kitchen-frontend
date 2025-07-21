import {
    Box,
    Typography,
    Stack,
    IconButton,
    Card,
    CardContent,
    Button,
    Divider,
    useTheme
  } from '@mui/material';
  import MenuIcon from '@mui/icons-material/Menu';
  import MoreVertIcon from '@mui/icons-material/MoreVert';
  import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
  import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
  import GasMeterIcon from '@mui/icons-material/GasMeter';
  import SupportAgentIcon from '@mui/icons-material/SupportAgent';
  
  export default function MobileDashboard({ user }) {
    const theme = useTheme();
    const greeting = getGreeting();
  
    return (
      <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', pb: 8 }}>
        {/* 🧭 Top Bar */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, pt: 2 }}>
          <Typography variant="h6" fontWeight={800}>
            {greeting}, {user?.username || 'User'}!
          </Typography>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Stack>
  
        {/* 🌿 Category Tabs */}
        <Stack direction="row" spacing={2} sx={{ px: 2, pt: 1 }}>
          <Button variant="contained" sx={{ borderRadius: 5 }}>General</Button>
          <Button variant="outlined" sx={{ borderRadius: 5 }}>Research Paper</Button>
        </Stack>
  
        {/* 🔋 System Health Section */}
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
        </Section>
  
        {/* ⛽ Monitoring Section */}
        <Section title="Fuel Monitoring">
          <DeviceCard
            icon={<GasMeterIcon color="primary" />}
            title="Fuel Mode"
            content="Mode: Smart Burn"
            actions={<Button size="small" variant="outlined">Change Mode</Button>}
          />
        </Section>
  
        {/* 💬 Support Section */}
        <Section title="Support & Services">
          <DeviceCard
            icon={<SupportAgentIcon color="primary" />}
            title="Service Request"
            content="No open tickets"
            actions={<Button size="small" variant="outlined">Add Request</Button>}
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
  
  function DeviceCard({ icon, title, content, actions }) {
    return (
      <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: 'background.paper' }}>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1}>
              {icon}
              <Typography variant="subtitle1" fontWeight={600}>{title}</Typography>
            </Stack>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {content}
          </Typography>
          {actions && <Box sx={{ mt: 2 }}>{actions}</Box>}
        </CardContent>
      </Card>
    );
  }