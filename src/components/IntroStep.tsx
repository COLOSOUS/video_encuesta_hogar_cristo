import React from 'react';
import { useForm } from 'react-hook-form';
import { ClipboardList, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/formStore';

interface IntroStepProps {
  onSubmit: (rut: string) => void;
}

export const IntroStep: React.FC<IntroStepProps> = ({ onSubmit }) => {
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
  <div className="max-w-2xl mx-auto px-6 py-10 text-center space-y-6 text-white">
  <h1 className="text-4xl font-bold">
    ¡Bienvenido a esta simulación de ventas!
  </h1>

  <p className="text-lg">
    Te invitamos a participar en una encuesta cuyo objetivo <br />
    es identificar las prácticas más exitosas de nuestro <br />
    equipo.
  </p>

  <p className="text-lg">
    Por tu participación obtendrás los resultados de un test de <br />
    personalidad que te permitirá conocer más sobre ti mismo.
  </p>

  <p className="text-lg">
    Esta encuesta debería durar aproximadamente 20 minutos.
  </p>

  <p className="text-lg font-semibold underline">
    Es muy importante que respondas en un lugar tranquilo, sin ruido <br />
    y donde puedas concentrarte.
  </p>
</div>
+
  <div className="prose prose-invert max-w-none space-y-6 text-center">
   
    <p className="text-lg text-gray-300">
      Participar en esta encuesta posee el beneficio de recibir los resultados del test de personalidad. Participar en esta encuesta no posee ningún riesgo para ti. La Dirección de Recursos del Hogar de Cristo conocerá solo los resultados de la encuesta y no las respuestas específicas de cada participante.
    </p>
    <p className="text-lg text-gray-300">Esta encuesta tiene tres partes:</p>

    <div>
      <p className="font-semibold text-white">Primera parte: Simularás un proceso de ventas.</p>
      <p className="text-lg text-gray-300">
        Te mostraremos imágenes de transeúntes y te pediremos que lo abordes tal y como lo haces en tu trabajo.
      </p>
      <p className="text-lg text-gray-300">
        Esta simulación requiere que grabes tu respuesta con la cámara de tu dispositivo. Para ello, al entrar a la encuesta, tu celular o computador te pedirá autorización para activar tu cámara y micrófono.
      </p>
      <p className="text-lg text-gray-300">
        Puedes responder desde tu celular si tienes Android. Si tienes Mac iOS, te recomendamos responder desde un computador.
      </p>
    </div>

    <div>
      <p className="font-semibold text-white">Segunda parte: Responderás una pregunta sobre tus técnicas de ventas.</p>
      <p className="text-lg text-gray-300">
        Esta es una pregunta simple donde te pediremos que nos cuentes cómo has aprendido tus técnicas de venta.
      </p>
    </div>

    <div>
      <p className="font-semibold text-white">Tercera parte: Responderás un test de personalidad simple.</p>
      <p className="text-lg text-gray-300">
        Por último, responderás un test de personalidad. El objetivo del test NO ES EVALUARTE, sino que tú aprendas de ti mismo.
      </p>
      <p className="text-lg text-gray-300">
        Para que conozcas más de tu personalidad, dentro de una semana después de que finalices la encuesta completa, te enviaremos a tu correo los resultados del test.
      </p>
    </div>

    <p className="text-lg text-gray-300">
      Cualquier duda, puedes contactar al equipo investigador de la Universidad Católica en el email: <a href="mailto:encuestaHdC@uc.cl" className="text-orange-400 underline">encuestaHdC@uc.cl</a>
    </p>

    <p className="text-lg text-gray-300">
      Agradecemos tu colaboración y el tiempo dedicado a este ejercicio.
    </p>

    <p className="text-lg text-gray-300">
      ¡Saludos cordiales!
    </p>

    <p className="text-lg text-gray-300">
      El equipo investigador de la Universidad Católica y<br />
      Gerencia de Recursos Humanos,<br />
      Dirección Nacional de Recursos<br />
      Hogar de Cristo
    </p>
  </div>
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
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Comenzar encuesta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};