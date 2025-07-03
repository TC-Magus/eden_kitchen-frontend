import { useEffect, useState } from 'react';
import { getUsers, updateUser, deleteUser } from '../utils/api';
import {
  Box, Typography, Grid, Card, CardContent, CardActions, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, Button, Avatar, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Users({ token }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);  // NEW
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ username: '', email: '' });

  const fetchUsers = async () => {
    try {
      const data = await getUsers(token);
      console.log("Fetched users:", data);

      if (Array.isArray(data)) {
        setUsers(data);
        setError(null); // clear previous errors
      } else {
        console.warn("Unexpected data from API:", data);
        setUsers([]);
        setError("Failed to load users. Unexpected response.");
      }
    } catch (err) {
      console.error("❌ Fetch error in Users:", err);
      setUsers([]);
      setError("Failed to fetch users. Make sure you’re logged in.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleOpen = (user) => {
    setEdit(user || null);
    setForm(user ? { username: user.username, email: user.email } : { username: '', email: '' });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (edit) await updateUser(edit.id, form, token);
    setOpen(false);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id, token);
    fetchUsers();
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Users</Typography>

      {error && (
        <Typography color="error" mb={2}>{error}</Typography>
      )}

      <Grid container spacing={3} columns={12}>
        {Array.isArray(users) && users.length > 0 ? (
          users.map(u => (
            <Grid key={u.id} xs={12} sm={6} md={4}>
              <Card sx={{
                borderRadius: 3, boxShadow: 4, transition: '0.2s',
                '&:hover': { boxShadow: 8, transform: 'translateY(-4px)' }
              }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: '#667eea', color: '#fff', fontWeight: 700 }}>
                      {u.username[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>{u.username}</Typography>
                      <Typography variant="body2" color="text.secondary">{u.email}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <IconButton color="primary" onClick={() => handleOpen(u)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(u.id)}><DeleteIcon /></IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : !error ? (
          <Typography>No users to display.</Typography>
        ) : null}
      </Grid>

      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: 3, minWidth: 350 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Edit User</DialogTitle>
        <DialogContent>
          <TextField label="Username" fullWidth margin="normal" value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))} autoFocus sx={{ mb: 2 }} />
          <TextField label="Email" fullWidth margin="normal" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} variant="outlined" color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
