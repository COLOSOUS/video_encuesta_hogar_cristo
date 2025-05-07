import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { useFormStore } from '../store/formStore';
import { submitFinalData } from '../services/api';

export const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { rut, videos, answers, reset, submissionId } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const submission = {
        submissionId,
        rut,
        videos: videos.map((v: { questionId: string; blob: Blob }) => ({
          questionId: v.questionId,
          blob: v.blob,
        })),
        answers,
      };

      console.log(submissionId);
      console.log(submission);

      await submitFinalData(submission);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación de 2 segundos        
      navigate('/success');
      reset();
    } catch (error) {
      console.error('Error al enviar la encuesta:', error);
      const message = error instanceof Error ? error.message : 'Error desconocido';
      setErrorMessage(message);
      alert(`Error al enviar la encuesta: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Ejecutar automáticamente al montar el componente
  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <img
          src="https://i.gifer.com/ZZ5H.gif" // URL de ejemplo, puedes reemplazarla por tu GIF transparente
          alt="Enviando"
          className="w-16 h-16 mx-auto"
        />
        <p className="text-white text-lg mt-4">Enviando la encuesta...</p>
      </div>
    </div>
  );
};