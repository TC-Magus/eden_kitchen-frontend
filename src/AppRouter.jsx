import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import ModernLayout from './layouts/ModernLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import Users from './pages/Users';

export default function AppRouter() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  


  const handleLogout = () => {
    setToken('');
    setUser(null); // 👈 add this
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // 👈 add this
  };
  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={
          token ? (
            <ModernLayout onLogout={handleLogout} user={user}>
              <Dashboard user={user} />
            </ModernLayout>
          ) : <Navigate to="/login" />
        } />
        <Route path="/devices" element={
          token ? (
            <ModernLayout onLogout={handleLogout}>
              <Devices token={token} />
            </ModernLayout>
          ) : <Navigate to="/login" />
        } />
        <Route path="/users" element={
          token ? (
            <ModernLayout onLogout={handleLogout}>
              <Users token={token} />
            </ModernLayout>
          ) : <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
}
