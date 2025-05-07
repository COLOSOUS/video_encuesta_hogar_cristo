// Interfaces
export interface Question {
  id: string;
  label: string;
  type: 'video' | 'choice' | 'likert' | 'percentage';
  groupId?: string;
  imageUrl?: string;
}

export interface QuestionGroup {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface RecordedVideo {
  questionId: string;
  blob: Blob;
}

export interface FormSubmission {
  rut: string;
  videos: RecordedVideo[];
  answers: Record<string, any>;
}

// Definir el tipo de respuesta
export type PersonalityAnswer = string | number | boolean | string[] | number[] | boolean[];
// Esto permite que las respuestas sean de tipo texto (string), número (number), booleano (boolean),
// o