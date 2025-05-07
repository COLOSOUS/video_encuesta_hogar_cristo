import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  PartyPopper, 
  ThumbsUp, 
  CheckCircle, 
  Trophy,
  Home
} from 'lucide-react';
import { useFormStore } from '../store/formStore';

const icons = {
  celebration: PartyPopper,
  thumbsUp: ThumbsUp,
  checkmark: CheckCircle,
  trophy: Trophy
};

type IconType = keyof typeof icons;

interface LocationState {
  message: string;
  icon: IconType;
}

export const SuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const name = localStorage.getItem('participantName') || '[NOMBRE]';
  
 return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?auto=format&fit=crop&w=1920&h=1080"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-xl">
            <div className="mb-6">
              <Trophy className="w-24 h-24 mx-auto text-green-500" />
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-lg font-semibold mb-4">Muchas gracias</p>

              <p className="text-gray-300 leading-relaxed mb-4">
                Queremos agradecerte sinceramente por tu participación en esta simulación de ventas.
                Tu compromiso y dedicación han sido fundamentales para el éxito de este ejercicio.
                Los resultados obtenidos serán clave para mejorar nuestras prácticas comerciales.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                Esperamos que el informe con las mejores prácticas identificadas sea de gran ayuda
                para perfeccionar aún más tus estrategias de ventas.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                Gracias nuevamente por tu valioso aporte y disposición durante esta experiencia.
              </p>

              <p className="text-gray-300 leading-relaxed">
                Saludos cordiales,<br />
                El equipo de ventas
              </p>
            </div>
            <div className="mt-8 text-center">
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
