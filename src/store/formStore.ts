import { create } from 'zustand';
import { RecordedVideo, PersonalityAnswer } from '../types';

interface FormState {
  rut: string;
  name: string;
  submissionId: string | null;  // Agregar submissionId
  videos: RecordedVideo[];
  answers: Record<string, PersonalityAnswer>;
  autoFillEnabled: boolean;
  setRut: (rut: string) => void;
  setName: (name: string) => void;
  setSubmissionId: (submissionId: string | null) => void;  // Cambiado para aceptar null
  addVideo: (questionId: string, blob: Blob) => void;
  addAnswer: (questionId: string, answer: PersonalityAnswer) => void;
  getVideoByQuestionId: (questionId: string) => RecordedVideo | undefined;
  getAnswerByQuestionId: (questionId: string) => PersonalityAnswer | undefined;
  toggleAutoFill: () => void;
  reset: () => void;
}

// store/formStore.ts
export const useFormStore = create<FormState>((set, get) => ({
  rut: '',
  name: '',
  submissionId: null,  // Aquí está el submissionId
  videos: [],
  answers: {},
  autoFillEnabled: false,
  setRut: (rut) => set({ rut }),
  setName: (name) => {
    set({ name });
    localStorage.setItem('participantName', name);
  },
  setSubmissionId: (submissionId) => set({ submissionId }),  // Esta función ahora acepta string o null
  addVideo: (questionId, blob) => {
    set((state) => {
      const existingIndex = state.videos.findIndex(v => v.questionId === questionId);
      if (existingIndex >= 0) {
        const newVideos = [...state.videos];
        newVideos[existingIndex] = { questionId, blob };
        return { videos: newVideos };
      }
      return { videos: [...state.videos, { questionId, blob }] };
    });
  },
  addAnswer: (questionId, answer) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer }
    }));
  },
  getVideoByQuestionId: (questionId) => {
    return get().videos.find(v => v.questionId === questionId);
  },
  getAnswerByQuestionId: (questionId) => {
    return get().answers[questionId];
  },
  toggleAutoFill: () => set((state) => ({ autoFillEnabled: !state.autoFillEnabled })),
  reset: () => set({ rut: '', name: '', submissionId: null, videos: [], answers: {}, autoFillEnabled: false }),
}));
