import React, { useState } from 'react';
import { Info, X } from 'lucide-react';


interface ExampleResponseProps {
  type: 'video' | 'choice' | 'likert'|'percentage';
  question: string;
}

export const ExampleResponse: React.FC<ExampleResponseProps> = ({ type, question }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getExampleContent = () => {
    if (type === 'video') {
      return (
        
        <div className="space-y-4">
          <p className="font-medium text-blue-400">Ejemplo de respuesta:</p>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <p className="text-gray-200 italic">
              "Buenos días/tardes, mi nombre es [Tu Nombre] y trabajo para el Hogar de Cristo. 
              Me gustaría compartir contigo información sobre nuestra labor social y cómo 
              puedes ser parte de esta gran causa. ¿Me podrías regalar unos minutos de tu tiempo?"
            </p>
            <div className="mt-4 text-sm text-gray-400">
              <p>Elementos clave de esta respuesta:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Saludo cordial y presentación personal</li>
                <li>Mención clara de la organización</li>
                <li>Propósito específico de la interacción</li>
                <li>Solicitud respetuosa de tiempo</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'percentage') {
      return (
        <div className="space-y-4">
          <p className="font-medium text-blue-400">Lo que debes saber:</p>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <p className="text-gray-200 italic">
              "Para esta pregunta, piensa en tus técnicas de venta en general, no en una técnica en particular.<br /><br />
              Por ejemplo, quizás tienes diez técnicas de venta (cómo escoges a quién hablarle en la calle, qué decirles para que paren a escucharte, cómo escoges sobre qué programa del Hogar hablarles, etc.).<br /><br />
              Para responder entonces, considera cuántas de estas 10 técnicas has desarrollado por ti mismo (es decir, a través de tu propia experiencia) mientras que las otras las aprendiste de otras personas del Hogar de Cristo (ya sea tu supervisor o tus colegas).<br /><br />
              Por ejemplo, si crees que de estas 10 técnicas, 1 la desarrollaste por ti mismo y 9 de otras personas, debes responder 10%. Si crees que 9 de las 10 técnicas las desarrollaste por ti mismo, entonces debes responder 90%."
            </p>
            
          </div>
        </div>
      );
    }



    if (type === 'likert') {
      return (
        <div className="space-y-4">
          <p className="font-medium text-blue-400">Cómo responder:</p>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <ul className="space-y-3 text-gray-200">
              <li>
                <span className="font-semibold text-blue-400">Muy en desacuerdo:</span>
                {" "}Totalmente opuesto a la afirmación
              </li>
              <li>
                <span className="font-semibold text-blue-400">En desacuerdo:</span>
                {" "}No coincide con tu opinión
              </li>
              <li>
                <span className="font-semibold text-blue-400">Neutral:</span>
                {" "}No tienes una posición definida
              </li>
              <li>
                <span className="font-semibold text-blue-400">De acuerdo:</span>
                {" "}Coincide con tu opinión
              </li>
              <li>
                <span className="font-semibold text-blue-400">Muy de acuerdo:</span>
                {" "}Totalmente alineado con tu pensamiento
              </li>
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <p className="font-medium text-blue-400">Consideraciones para tu respuesta:</p>
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <ul className="space-y-2 text-gray-200">
            <li className="flex items-start space-x-2">
              <span className="font-bold text-blue-400">•</span>
              <span>Reflexiona sobre tu experiencia personal</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-bold text-blue-400">•</span>
              <span>Considera el impacto en tu trabajo diario</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-bold text-blue-400">•</span>
              <span>Piensa en situaciones específicas que hayas enfrentado</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-bold text-blue-400">•</span>
              <span>Elige la opción que mejor refleje tu experiencia</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-0 right-0 p-2 text-blue-400 hover:text-blue-300 transition-colors"
        title="Ver ejemplo"
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'orange' }}>
      <Info 
        style={{ width: '35px', height: '35px' }} 
        color="orange" 
      />
      <p style={{ marginTop: '8px', fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>
        Info
      </p>
    </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-200">{question}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {getExampleContent()}
          </div>
        </div>
      )}
    </div>
  );
};