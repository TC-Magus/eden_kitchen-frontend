import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Temperature = () => {
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    const simulateTemperature = () => {
      const simulated = Math.floor(Math.random() * 150) + 50; // 50°C to 200°C
      setTemperature(simulated);
    };
    simulateTemperature();

    // Optional: auto-refresh every 10s
    const interval = setInterval(simulateTemperature, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Cooking Temperature
        </Typography>
        <Typography variant="h4" color="error" fontWeight={600}>
          {temperature}°C
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Temperature;
