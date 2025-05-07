import axios from 'axios';

const API_URL ='http://localhost:5000';

export const login = async (credentials: { username: string; password: string }) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
  return response.data;
};

export const register = async (userData: { username: string; password: string }) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, userData);
  return response.data;
};