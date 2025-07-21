import { useState } from 'react';
import { TextField, Button, Typography, Box, Snackbar, Card, CardContent, Stack } from '@mui/material';
import { login } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ Use named import

export default function Login({ setToken, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(username, password);

    if (data.token) {
      setToken(data.token);
      localStorage.setItem('token', data.token);

      // ✅ Decode user info from token
      const decoded = jwtDecode(data.token);
      const extractedUser = {
        id: decoded.id,
        username: decoded.username
      };

      localStorage.setItem('user', JSON.stringify(extractedUser));
      setUser(extractedUser);

      setSnackbar({ open: true, message: 'Login successful!' });
      navigate('/dashboard');
    } else {
      setSnackbar({ open: true, message: data.error || 'Login failed' });
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #a5d6a7 0%, #66bb6a 100%)'
    }}>
      <Card sx={{ minWidth: 350, p: 3, borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h4" align="center" fontWeight={800} color="primary">
              Eden Kitchen Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, fontWeight: 700 }}>
                Login
              </Button>
              <Button color="secondary" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/register')}>
                Register
              </Button>
            </form>
          </Stack>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
}