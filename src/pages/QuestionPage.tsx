import React, { useEffect } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { QuestionGroup } from '../components/QuestionGroup';
import { useFormStore } from '../store/formStore';
import { questionGroups, questions } from '../config/questions';
import { recordPageTimestamp, savePercentageValue } from '../services/api';


export const QuestionPage: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addVideo, addAnswer, getVideoByQuestionId, getAnswerByQuestionId, submissionId } = useFormStore();

  const currentGroupIndex = questionGroups.findIndex(g => g.id === id);
  const group = questionGroups[currentGroupIndex];

  useEffect(() => {
    // Asegúrate de que la página haga scroll hacia arriba
     window.scrollTo({ top: 0, behavior: 'smooth' });
    if (submissionId && id) {
      const pageName = `question_${id}`;
      recordPageTimestamp(submissionId, pageName);
    } else {
      console.error("Missing submissionId or id");
    }

    if (submissionId && id) {
      const pageName = `question_${id}`;
      recordPageTimestamp(submissionId, pageName);
      console.log('Submitting with submissionId:', submissionId, 'and pageName:', `question_${id}`);
      
    } else {
      console.error('Missing submissionId or pageName');
    }
  }, [id, submissionId]);

  if (!group) {
    return <Navigate to="/" replace />;
  }

  const handleVideoRecorded = (questionId: string, blob: Blob) => {
    addVideo(questionId, blob);
  };

  const handleAnswerSelected = async (questionId: string, answer: any) => {
    addAnswer(questionId, answer);

    // If this is a percentage question, save it separately
    if (questionId === 'tactics_percentage' && submissionId) {
      await savePercentageValue(submissionId, answer);
    }
  };

  const handleNext = () => {
    
    console.log("Revisar s_id",submissionId)
    if (currentGroupIndex === questionGroups.length - 1) {
      navigate('/review');
      // Asegúrate de que la página haga scroll hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(`/question/${questionGroups[currentGroupIndex + 1].id}`);
      // Asegúrate de que la página haga scroll hacia arriba
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentGroupIndex === 0) {
      navigate('/');
    } else {
      navigate(`/question/${questionGroups[currentGroupIndex - 1].id}`);
    }
  };

  const isGroupComplete = group.questions.every(question => {
    if (question.type === 'video') {
      return !!getVideoByQuestionId(question.id);
    }
    if (question.type === 'choice') {
      const answer = getAnswerByQuestionId(question.id);
      return answer && answer.mas && answer.menos;
    }
    return !!getAnswerByQuestionId(question.id);
  });

  const backgroundImage = group.questions[0]?.type === 'video'
    ? "/images/fondo2.jpg"
    : "/images/fondo1.jpg";

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed inset-0 z-0">
        <img 
          src={backgroundImage}
          alt="Background" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{group.title}</h2>
              <p className="text-xl font-semibold text-gray-200 mb-4">
  {group.id === "personality" ? (
  <>
  <ul className="list-disc pl-6">
    <li>Te presentaremos 24 grupos de cuatro palabras cada grupo.</li>
    <li>En cada grupo de cuatro palabras, debes escoger dos palabras:</li>
    <li>La que más te representa, marcándola en la columna “Más”.</li>
    <li>La que menos te representa, marcándola en la columna “Menos”.</li>
    <li>No hay respuestas correctas ni incorrectas.</li>
  </ul>
</>
  ) : (
    <>{group.description}</>
  )}
</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-400">
                Sección {currentGroupIndex + 1} de {questionGroups.length}
              </p>
            </div>

            <QuestionGroup
              questions={group.questions}
              groupId={group.id}
              onVideoRecorded={handleVideoRecorded}
              onAnswerSelected={handleAnswerSelected}
              getVideoByQuestionId={getVideoByQuestionId}
              getAnswerByQuestionId={getAnswerByQuestionId}
            />

            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrevious}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Anterior</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!isGroupComplete}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isGroupComplete
                    ? 'bg-orange-600 hover:bg-orange-700'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                <span>
                  {!isGroupComplete 
                    ? 'Siguiente'
                    : currentGroupIndex === 0 
                      ? 'Siguiente'
                      : currentGroupIndex === 1 
                        ? 'Siguiente'
                        : currentGroupIndex === 2
                        ? 'Siguiente'
                        : currentGroupIndex === 3 
                          ? 'Siguiente'
                        : currentGroupIndex === questionGroups.length - 1 
                          ? 'Terminar Encuesta'
                          : 'Siguiente'
                  }
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
