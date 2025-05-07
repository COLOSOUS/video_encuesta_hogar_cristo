import { create } from 'zustand';
import axios from 'axios';
import { RecordedVideo, PersonalityAnswer } from '../types';

interface FormState {
  rut: string;
  name: string;
  videos: RecordedVideo[];
  answers: Record<string, PersonalityAnswer>;
  autoFillEnabled: boolean;
  currentStep: number;
  sessionId: string | null;
  setRut: (rut: string) => Promise<void>;
  setName: (name: string) => void;
  addVideo: (questionId: string, blob: Blob) => void;
  addAnswer: (questionId: string, answer: PersonalityAnswer) => Promise<void>;
  getVideoByQuestionId: (questionId: string) => RecordedVideo | undefined;
  getAnswerByQuestionId: (questionId: string) => PersonalityAnswer | undefined;
  toggleAutoFill: () => void;
  reset: () => void;
  updateProgress: (step: number) => Promise<void>;
  loadExistingSession: (rut: string) => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3500';

export const useFormStore = create<FormState>((set, get) => ({
  rut: '',
  name: '',
  videos: [],
  answers: {},
  autoFillEnabled: false,
  currentStep: 0,
  sessionId: null,

  setRut: async (rut) => {
    try {
      const response = await axios.post(`${API_URL}/api/sessions/init`, { rut });
      const { sessionId, currentStep, answers, videos } = response.data;
      
      set({ 
        rut,
        sessionId,
        currentStep,
        answers: answers || {},
        videos: videos || []
      });
    } catch (error) {
      console.error('Error initializing session:', error);
      throw error;
    }
  },

  setName: (name) => {
    set({ name });
    localStorage.setItem('participantName', name);
  },

  addVideo: async (questionId, blob) => {
    const { sessionId } = get();
    if (!sessionId) return;

    try {
      set((state) => {
        const existingIndex = state.videos.findIndex(v => v.questionId === questionId);
        if (existingIndex >= 0) {
          const newVideos = [...state.videos];
          newVideos[existingIndex] = { questionId, blob };
          return { videos: newVideos };
        }
        return { videos: [...state.videos, { questionId, blob }] };
      });

      const formData = new FormData();
      formData.append('video', blob);
      await axios.post(`${API_URL}/api/sessions/${sessionId}/videos/${questionId}`, formData);
    } catch (error) {
      console.error('Error saving video:', error);
      throw error;
    }
  },

  addAnswer: async (questionId, answer) => {
    const { sessionId } = get();
    if (!sessionId) return;

    try {
      set((state) => ({
        answers: { ...state.answers, [questionId]: answer }
      }));

      await axios.post(`${API_URL}/api/sessions/${sessionId}/answers`, {
        questionId,
        answer
      });
    } catch (error) {
      console.error('Error saving answer:', error);
      throw error;
    }
  },

  getVideoByQuestionId: (questionId) => {
    return get().videos.find(v => v.questionId === questionId);
  },

  getAnswerByQuestionId: (questionId) => {
    return get().answers[questionId];
  },

  toggleAutoFill: () => set((state) => ({ autoFillEnabled: !state.autoFillEnabled })),

  reset: () => set({ 
    rut: '', 
    name: '', 
    videos: [], 
    answers: {}, 
    autoFillEnabled: false,
    currentStep: 0,
    sessionId: null
  }),

  updateProgress: async (step: number) => {
    const { sessionId } = get();
    if (!sessionId) return;

    try {
      await axios.post(`${API_URL}/api/sessions/${sessionId}/progress`, { step });
      set({ currentStep: step });
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  },

  loadExistingSession: async (rut: string) => {
    try {
      const response = await axios.get(`${API_URL}/api/sessions/${rut}/latest`);
      const { sessionId, currentStep, answers, videos } = response.data;
      
      set({
        rut,
        sessionId,
        currentStep,
        answers: answers || {},
        videos: videos || []
      });
    } catch (error) {
      console.error('Error loading session:', error);
      throw error;
    }
  }
}));
