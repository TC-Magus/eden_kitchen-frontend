// Centralized API utility for backend requests
const API_BASE = 'https://eden-backend-mru8.onrender.com/api';

export const login = (username, password) =>
  fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => res.json());

export const register = (username, password, email) =>
  fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email })
  }).then(res => res.json());

export const getDevices = (token) =>
  fetch(`${API_BASE}/devices`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());

export const getDevice = (id, token) =>
  fetch(`${API_BASE}/devices/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());

export const createDevice = (device, token) =>
  fetch(`${API_BASE}/devices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(device)
  }).then(res => res.json());

export const updateDevice = (id, device, token) =>
  fetch(`${API_BASE}/devices/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(device)
  }).then(res => res.json());

export const deleteDevice = (id, token) =>
  fetch(`${API_BASE}/devices/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());

  export const getUsers = async (token) => {
    try {
      const res = await axios.get('http://localhost:3000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (err) {
      if (err.response) {
        console.error("Failed to get users:", {
          status: err.response.status,
          data: err.response.data,
          headers: err.response.headers
        });
      } else {
        console.error("Failed to get users:", err.message);
      }
      
    }
  };
  

export const updateUser = (id, user, token) =>
  fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(user)
  }).then(res => res.json());

export const deleteUser = (id, token) =>
  fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());

export const addUserToDevice = (userId, deviceId, token) =>
  fetch(`${API_BASE}/devices/add-user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ userId, deviceId })
  }).then(res => res.json());

export const getUsersInDevice = (deviceId, token) =>
  fetch(`${API_BASE}/devices/${deviceId}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());

// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const getModeHistory = async (stove_id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/mode-history/${stove_id}`);
    return response.data;
  } catch (err) {
    console.error('Failed to fetch mode history', err);
    return [];
  }
};

export const setFuelMode = async (stove_id, mode) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/mode-history`, {
      stove_id,
      mode,
    });
    return response.data;
  } catch (err) {
    console.error('Failed to set fuel mode', err);
    throw err;
  }
};

export const sendServiceRequest = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/service-requests`, data);
    return response.data;
  } catch (err) {
    console.error("Failed to submit service request", err);
    throw err;
  }
};
