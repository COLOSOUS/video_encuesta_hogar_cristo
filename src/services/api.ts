import axios from 'axios';
import { FormSubmission } from '../types';

const API_URL = 'https://formulariohc.cl';

let percentageSaved = false; // Para asegurarnos de que el porcentaje se guarda solo una vez

// Función para manejar el envío del formulario inicial
export const uploadFormData = async (
  data: FormSubmission,
  pageName: string,
  percentage: number
): Promise<void> => {
  try {
    if (!data.rut) {
      throw new Error('El rut no está definido o es nulo');
    }

    console.log('Enviando formulario con rut:', data.rut);  // Debug: Imprime el rut para verificar que se está enviando correctamente

    // Recuperar el submissionId desde localStorage
    let submissionId = localStorage.getItem('submissionId');

    if (!submissionId) {
      // Si el submissionId no existe, envía el formulario con solo el rut
      const formData = new FormData();
      formData.append('rut', data.rut);

      console.log('Formulario con rut:', data.rut);  // Debug: Verifica el FormData
      console.log(formData)

      // Enviar solo el rut al backend y obtener el submissionId
      const response = await axios.post(`${API_URL}/api/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Respuesta del servidor:', response.data);  // Debug: Verifica la respuesta del servidor

      if (response.status !== 200) {
        throw new Error('Error al enviar el formulario inicial');
      }

      // Guardar el submissionId para envíos posteriores
      submissionId = response.data.submissionId;
      localStorage.setItem('submissionId', submissionId); // Guardarlo en localStorage
      console.log('Formulario inicial enviado exitosamente. submissionId:', submissionId);  // Debug: Verifica el submissionId obtenido
    }

    // Registrar el timestamp de la página
    await recordPageTimestamp(submissionId, pageName);

    // Realiza el registro incremental (solo si no se guardó el porcentaje aún)
    if (!percentageSaved) {
      await savePercentageValue(submissionId, percentage);
      percentageSaved = true; // Marcar el porcentaje como guardado
    }

    // Enviar respuestas y videos si es necesario
    if (data.answers && data.videos) {
      const formDataFinal = new FormData();

      // Añadir las respuestas al formulario
      Object.entries(data.answers).forEach(([questionId, answer]) => {
        formDataFinal.append(`answers[${questionId}]`, JSON.stringify(answer));
      });

      // Añadir los videos al formulario
      data.videos.forEach((video: { questionId: string; blob: Blob }) => {
        formDataFinal.append(`videos[${video.questionId}]`, video.blob, `${video.questionId}.mp4`);
      });

      // Enviar las respuestas y los videos al backend
      const responseFinal = await axios.post(`${API_URL}/api/submit-final`, formDataFinal, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Respuesta final del servidor:', responseFinal.data);  // Debug: Verifica la respuesta del servidor

      if (responseFinal.status !== 200) {
        throw new Error('Error al enviar las respuestas y videos');
      }

      console.log('Respuestas y videos enviados exitosamente');
    }

  } catch (error) {
    console.error('Error al manejar el envío del formulario:', error);
    const message = error instanceof Error ? error.message : 'Error desconocido';
    alert(`Error al manejar el envío del formulario: ${message}`);
    throw error;
  }
};

// Función para registrar el timestamp
export const recordPageTimestamp = async (submissionId: string, pageName: string) => {
  try {
    console.log('Enviando timestamp para submissionId:', submissionId, 'Página:', pageName);

    const response = await axios.post(`${API_URL}/api/page-timestamp`, {
      submissionId,
      pageName,
    });

    if (response.status !== 200) {
      throw new Error('Error al registrar el timestamp de la página');
    }

    console.log('Timestamp registrado exitosamente');
  } catch (error) {
    console.error('Error al registrar el timestamp de la página:', error);
    throw error;
  }
};

// Función para guardar el valor porcentual
export const savePercentageValue = async (submissionId: string, value: number) => {
  try {
    console.log('Guardando porcentaje:', value, 'para submissionId:', submissionId);

    const response = await axios.post(`${API_URL}/api/save-percentage`, {
      submissionId,
      value,
    });

    if (response.status !== 200) {
      throw new Error('Error al guardar el valor porcentual');
    }

    console.log('Valor porcentual guardado exitosamente');
  } catch (error) {
    console.error('Error al guardar el valor porcentual:', error);
    throw error;
  }
};

// Función para enviar las respuestas finales al final de la encuesta
export const submitFinalData = async (
    
  data: FormSubmission,
): Promise<void> => {
  
  // Recuperar submissionId desde localStorage
  console.log(data.submissionId)
  let submissionId=data.submissionId
  

  try {
    if (!submissionId) {
      throw new Error('Submission ID no encontrado, por favor complete el formulario inicial.');
    }

    const formData = new FormData();
    formData.append('submissionId', submissionId);

    // Adjuntar videos con el formato adecuado
    data.videos.forEach((video) => {
      const videoBlob = new Blob([video.blob], { type: 'video/webm' });
      formData.append(`video_${video.questionId}`, videoBlob, `video_${video.questionId}.webm`);
    });

    // Convertir las respuestas a un objeto simple y añadir al FormData
    const simplifiedAnswers = Object.entries(data.answers).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, any>);
    formData.append('answers', JSON.stringify(simplifiedAnswers));

    // Imprimir los datos antes de enviarlos para verificación
    console.log('Enviando datos finales del formulario:', formData);

    // Enviar los datos finales del formulario al servidor
    const response = await axios.post(`${API_URL}/api/submit-final`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status !== 200) {
      throw new Error('Error al enviar los datos finales del formulario');
    }

    console.log('Formulario final enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar los datos finales del formulario:', error);
    throw error;
  }
};
