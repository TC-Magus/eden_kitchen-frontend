import React, { useState } from 'react';
import {
  Card, CardContent, Typography, TextField,
  MenuItem, Button, Snackbar, Alert
} from '@mui/material';
import { sendServiceRequest } from '../utils/api';

const ServiceRequest = () => {
  const [requestType, setRequestType] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const stove_id = 1; // replace with real stove_id later

  const user_id = 1; // Replace with actual user logic later

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendServiceRequest({
        stove_id,
        user_id,
        type: requestType,
        description
      });
      setSuccess(true);
      setRequestType('');
      setDescription('');
    } catch (err) {
      alert('Failed to submit request.');
      console.error(err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, mt: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Submit a Service Request
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select fullWidth required
            label="Request Type"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Repair">Repair</MenuItem>
            <MenuItem value="Installation">Installation</MenuItem>
            <MenuItem value="Battery Replacement">Battery Replacement</MenuItem>
          </TextField>

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Sending...' : 'Submit Request'}
          </Button>
        </form>

        <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
          <Alert severity="success" variant="filled">Request submitted!</Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default ServiceRequest;
