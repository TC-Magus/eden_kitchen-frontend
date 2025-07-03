// src/components/FuelMode.jsx

import React, { useEffect, useState } from 'react';
import { getModeHistory, setFuelMode } from '../utils/api';
import { Card, CardContent, Typography, Button, Stack, Box } from '@mui/material';

const FuelMode = () => {
  const stove_id = 1; // Replace with dynamic ID later if needed
  const [currentMode, setCurrentMode] = useState('solar');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLatestMode = async () => {
      const history = await getModeHistory(stove_id);
      if (history.length > 0) {
        setCurrentMode(history[0].mode);
      }
    };
    fetchLatestMode();
  }, []);

  const handleToggle = async () => {
    const newMode = currentMode === 'solar' ? 'biogas' : 'solar';
    setLoading(true);
    try {
      await setFuelMode(stove_id, newMode);
      setCurrentMode(newMode);
    } catch (err) {
      alert('Failed to switch mode');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Fuel Mode Control
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Currently running on: <strong>{currentMode.toUpperCase()}</strong>
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant={currentMode === 'solar' ? 'contained' : 'outlined'}
            color="warning"
            onClick={handleToggle}
            disabled={loading}
          >
            ☀️ Solar
          </Button>

          <Button
            variant={currentMode === 'biogas' ? 'contained' : 'outlined'}
            color="success"
            onClick={handleToggle}
            disabled={loading}
          >
            🌿 Biogas
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FuelMode;
