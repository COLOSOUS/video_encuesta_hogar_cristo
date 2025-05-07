import React from 'react';
import { useForm } from 'react-hook-form';
import { ClipboardList, Shield, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IntroStepProps {
  onSubmit: (rut: string) => void;
  isLoading: boolean;
}

export const IntroStep: React.FC<IntroStepProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ rut: string }>();
  const navigate = useNavigate();

  const handleFormSubmit = (data: { rut: string }) => {
    onSubmit(data.rut);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 h-64 w-full">
        <img 
          src="/images/banner.jpg"
          alt="Banner" 
          className="w-full h-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900"></div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => navigate('/admin/login')}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-700/80 hover:bg-gray-600/80 rounded-lg transition-colors backdrop-blur-sm"
        >
          <Shield className="w-5 h-5" />
          <span>Admin Panel</span>
        </button>
      </div>

      <div className="relative pt-8 px-6">
        <div className="flex items-center justify-center mb-6">
          <img 
            src="/images/logo.png"
            alt="Hogar de Cristo Logo" 
            className="h-60 sm:h-80 md:h-100 lg:h-180 object-contain"
          />
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
        <div className="space-y-8 max-w-2xl mx-auto">
  <div className="text-center">
    <ClipboardList className="w-16 h-16 mx-auto mb-6 text-orange-500" />
    <h1 className="text-3xl font-bold mb-4">¡Bienvenido a esta simulación de ventas!</h1>
    <p className="text-gray-300">Esta encuesta tiene tres partes.</p>
  </div>

  <div className="prose prose-invert max-w-none space-y-6">
    
    <p className="text-lg text-gray-300">
      <strong></strong>Te invitamos a participar en una encuesta de para identificar las prácticas más exitosas en nuestro equipo.
    </p>
    
    <p className="text-lg text-gray-300">
      <strong>Primera parte:</strong> Te pediremos que simules un proceso de ventas.<br />
      <strong>Segunda parte:</strong> Te preguntaremos sobre tus técnicas de ventas.<br />
      <strong>Tercera parte:</strong> Y responderás un test de personalidad simple.
    </p>
    
    
    <p className="text-lg text-gray-300">
      Puedes responder desde tu celular si tienes Android.<br />
      Si tienes Mac iOS, te recomendamos responder desde un computador.
    </p>
    
    <p className="text-lg text-gray-300">
    Agradecemos tu colaboración y el tiempo dedicado a este ejercicio.<br />
    Saludos cordiales,
Equipo Hogar de Cristo

    </p>
  </div>

  


</div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label htmlFor="rut" className="block text-sm font-medium mb-1">
                Ingresa tu RUT (sin puntos ni guión ej: 12345678):
              </label>
              <input
                id="rut"
                {...register('rut', {
                  required: 'El RUT es requerido',
                  pattern: {
                    value: /^[0-9]{7,8}[0-9K]$/i,
                    message: 'RUT inválido'
                  }
                })}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                placeholder="12345678K"
              />
              {errors.rut && (
                <p className="mt-1 text-sm text-red-500">{errors.rut.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Cargando...</span>
                </>
              ) : (
                <span>Comenzar Simulación</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};