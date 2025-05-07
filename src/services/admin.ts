import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const getSubmissions = async () => {
  const response = await axios.get(`${API_URL}/api/admin/submissions`, getAuthHeaders());
  return response.data;
};

export const deleteSubmission = async (id: number) => {
  await axios.delete(`${API_URL}/api/admin/submissions/${id}`, getAuthHeaders());
};