import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

const data = [
  { time: '08:00', battery: 90 },
  { time: '09:00', battery: 82 },
  { time: '10:00', battery: 76 },
  { time: '11:00', battery: 69 },
  { time: '12:00', battery: 65 },
  { time: '13:00', battery: 58 },
  { time: '14:00', battery: 52 }
];

export default function UsageChart() {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, mt: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Battery Usage Over Time
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip />
            <Line type="monotone" dataKey="battery" stroke="#66bb6a" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
