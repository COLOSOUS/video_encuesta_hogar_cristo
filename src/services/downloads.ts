import axios from 'axios';

const API_URL = 'http://localhost:5000';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const downloadVideo = async (videoId: number) => {
  const response = await axios.get(
    `${API_URL}/api/admin/download/video/${videoId}`,
    { ...getAuthHeaders(), responseType: 'blob' }
  );
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `video_${videoId}.webm`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const downloadAudio = async (audioId: number) => {
  const response = await axios.get(
    `${API_URL}/api/admin/download/audio/${audioId}`,
    { ...getAuthHeaders(), responseType: 'blob' }
  );
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `audio_${audioId}.webm`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};