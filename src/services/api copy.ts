import axios from 'axios';
import { FormSubmission } from '../types';

const API_URL = 'http://localhost:5000';

export const uploadFormData = async (data: FormSubmission): Promise<void> => {
  try {
    if (!data.rut) throw new Error('RUT is required');
    if (!Array.isArray(data.videos)) throw new Error('Videos must be an array');
    
    const formData = new FormData();
    formData.append('rut', data.rut);

    data.videos.forEach((video, index) => {
      if (!video.blob || !video.questionId) {
        throw new Error(`Invalid video data at index ${index}`);
      }

      const videoBlob = new Blob([video.blob], { type: 'video/webm' });
      formData.append(`video_${video.questionId}`, videoBlob, `video_${video.questionId}.webm`);
    });

    const simplifiedAnswers = Object.entries(data.answers || {}).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, any>);

    formData.append('answers', JSON.stringify(simplifiedAnswers));

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    const response = await axios.post(`${API_URL}/api/submit`, formData);

    if (response.status !== 200) {
      throw new Error('Error submitting form');
    }
  } catch (error) {
    console.error('Error uploading form data:', error);
    throw error;
  }
};