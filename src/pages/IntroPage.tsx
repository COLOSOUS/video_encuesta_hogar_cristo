import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IntroStep } from '../components/IntroStep';
import { useFormStore } from '../store/formStore';
import { questionGroups } from '../config/questions';
import axios from 'axios';

const API_URL = 'https://formulariohc.cl'; // Asegúrate de usar el endpoint correcto

export const IntroPage: React.FC = () => {
  const navigate = useNavigate();
  const setRut = useFormStore((state) => state.setRut);
  const setSubmissionId = useFormStore((state) => state.setSubmissionId); // Asumiendo que tienes esta función en el store

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (rut: string) => {
    try {
      // Establecer el rut en el estado global
      setRut(rut);

      // Hacer una petición a la API para registrar el rut y obtener el submissionId
      const response = await axios.post(`${API_URL}/api/submit`, { rut });

      if (response.status === 200) {
        const { submissionId } = response.data;
        setSubmissionId(submissionId); // Guardar el submissionId en el estado global

        // Navegar a la siguiente página después de guardar el submissionId
        navigate(`/question/${questionGroups[0].id}`);
      } else {
        setError('Error al enviar los datos.');
      }
    } catch (error) {
      console.error('Error al registrar el rut:', error);
      setError('Hubo un problema al enviar los datos.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed inset-0 z-0">
        <img
          src="/images/fondo1.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
            <IntroStep onSubmit={handleSubmit} />
            {error && <p className="text-red-500 mt-4">{error}</p>} {/* Mostrar error si ocurre */}
          </div>
        </div>
      </div>
    </div>
  );
};