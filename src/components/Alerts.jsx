import { Card, CardContent, Typography, List, ListItem, ListItemText, Alert } from '@mui/material';

const mockAlerts = [
  { type: 'warning', message: 'Battery level is below 20%' },
  { type: 'error', message: 'Gas sensor detected overflow risk' },
  { type: 'info', message: 'Temperature is stabilizing' }
];

export default function Alerts() {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Alerts
        </Typography>
        <List dense>
          {mockAlerts.map((alert, index) => (
            <ListItem key={index}>
              <Alert severity={alert.type} sx={{ width: '100%' }}>
                {alert.message}
              </Alert>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
