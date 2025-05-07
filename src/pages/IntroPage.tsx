import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IntroStep } from '../components/IntroStep';
import { useFormStore } from '../store/formStore';
import { questionGroups } from '../config/questions';
import { AlertCircle } from 'lucide-react';

export const IntroPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRut } = useFormStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (rut: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Initialize or resume session
      await setRut(rut);
      
      // Get the current step from the store
      const currentStep = useFormStore.getState().currentStep;
      
      // Navigate to the appropriate page based on progress
      if (currentStep === 0) {
        // New session, start from the beginning
        navigate(`/question/${questionGroups[0].id}`);
      } else if (currentStep >= questionGroups.length) {
        // Session was completed, go to review
        navigate('/review');
      } else {
        // Resume from last saved position
        navigate(`/question/${questionGroups[currentStep].id}`);
      }
    } catch (error) {
      console.error('Error initializing session:', error);
      setError('Error al iniciar sesión. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&h=1080"
          alt="Background" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <div className="bg-teal-100/10 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
            {error && (
              <div className="bg-red-500/10 border border-red-500 p-4 m-4 rounded-lg flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-200">{error}</p>
              </div>
            )}
            
            <IntroStep 
              onSubmit={handleSubmit} 
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};