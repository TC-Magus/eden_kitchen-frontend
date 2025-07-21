import { useMediaQuery } from '@mui/material';
import Dashboard from './Dashboard';           // 📺 Laptop layout — stays untouched
import MobileDashboard from './MobileDashboard'; // 📱 Mobile layout — now enhanced
import { useEffect, useState } from 'react';
import { getDevices, getUsers } from '../utils/api';

export default function DashboardContainer({ user, token }) {
  const [devices, setDevices] = useState([]);
  const [users, setUsers] = useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    async function fetchData() {
      const devs = await getDevices(token);
      const usrs = await getUsers(token);
      setDevices(devs || []);
      setUsers(usrs || []);
    }
    fetchData();
  }, [token]);

  return isMobile ? (
    <MobileDashboard user={user} devices={devices} users={users} token={token} />
  ) : (
    <Dashboard user={user} devices={devices} users={users} token={token} />
  );
}