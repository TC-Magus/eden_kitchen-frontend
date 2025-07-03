import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
// import { getModeHistory } from '../api'; // uncomment when backend ready

const ModeHistory = () => {
  const stove_id = 1; // Later replace with dynamic
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Simulated fallback data for now
    const simulated = [
      { id: 1, mode: 'solar', timestamp: '2025-07-02T09:42:00Z' },
      { id: 2, mode: 'biogas', timestamp: '2025-07-01T17:28:00Z' }
    ];
    setHistory(simulated);

    // Real backend fetch when ready
    /*
    const fetchHistory = async () => {
      try {
        const data = await getModeHistory(stove_id);
        setHistory(data);
      } catch (err) {
        console.error("Failed to fetch mode history:", err);
      }
    };
    fetchHistory();
    */
  }, []);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, mt: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Mode Switch History
        </Typography>
        <List dense>
          {history.map(entry => (
            <ListItem key={entry.id}>
              <ListItemText
                primary={`Mode: ${entry.mode}`}
                secondary={`Time: ${new Date(entry.timestamp).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ModeHistory;
