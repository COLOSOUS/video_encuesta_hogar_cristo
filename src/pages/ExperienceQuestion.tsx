import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PercentageSlider } from '../components/PercentageSlider';
import { EvolutionAnimation } from '../components/EvolutionAnimation';
import { useFormStore } from '../store/formStore';

export const ExperienceQuestion: React.FC = () => {
  const [percentage, setPercentage] = useState(0);
  const navigate = useNavigate();
  const { addAnswer } = useFormStore();

  const handleNext = () => {
    addAnswer('experience_percentage', percentage);
    navigate('/review');
    // Asegúrate de que la página haga scroll hacia arriba
  window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
<div className="min-h-screen bg-gray-900">
  <div className="fixed inset-0 z-0">
    <img 
      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop"
      alt="Background" 
      className="w-1/2 h-1/2 object-cover opacity-20 mx-auto"
    />
  </div>

  <div className="relative z-10">
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="bg-teal-100/10 backdrop-blur-sm rounded-xl p-8 shadow-xl">
        <div className="space-y-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Tu Experiencia en Captación
            </h2>
            <p className="text-4xl text-gray-300 leading-relaxed text-center">
  ¿Qué porcentaje de las tácticas/estrategias para captar socios has desarrollado tú mismo 
  (es decir, a través de tu propia experiencia) en comparación a lo que has aprendido de 
  otras personas en el Hogar De Cristo? (supervisores u otros captadores)
</p>
          </div>

              <div className="max-w-2xl mx-auto">
                <PercentageSlider 
                  value={percentage} 
                  onChange={setPercentage} 
                />
              </div>

              <EvolutionAnimation percentage={percentage} />

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Anterior</span>
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
                >
                  <span>Siguiente</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};