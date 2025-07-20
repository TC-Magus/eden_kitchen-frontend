// DashboardContainer.jsx
import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { getDevices, getUsers } from '../utils/api';

export default function DashboardContainer({ user, token }) {
  const [devices, setDevices] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const devs = await getDevices(token);
      const usrs = await getUsers(token);
      setDevices(devs || []);
      setUsers(usrs || []);
    }
    fetchData();
  }, [token]);

  return <Dashboard user={user} devices={devices} users={users} />;
}