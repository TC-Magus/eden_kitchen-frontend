import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, LinearProgress } from '@mui/material';

const Battery = () => {
  const [battery, setBattery] = useState(0);

  useEffect(() => {
    const simulateBattery = () => {
      const simulated = Math.floor(Math.random() * 100) + 1; // 1-100%
      setBattery(simulated);
    };
    simulateBattery();

    // Optional: auto-refresh every 10s
    const interval = setInterval(simulateBattery, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Battery Level
        </Typography>
        <Typography variant="body2" gutterBottom>
          {battery}% remaining
        </Typography>
        <LinearProgress variant="determinate" value={battery} sx={{ height: 10, borderRadius: 5 }} />
      </CardContent>
    </Card>
  );
};

export default Battery;
