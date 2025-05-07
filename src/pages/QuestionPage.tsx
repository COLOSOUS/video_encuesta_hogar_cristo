import React, { useEffect } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { QuestionGroup } from '../components/QuestionGroup';
import { useFormStore } from '../store/formStore';
import { questionGroups, questions } from '../config/questions';

export const QuestionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    addVideo, 
    addAnswer, 
    getVideoByQuestionId, 
    getAnswerByQuestionId,
    updateProgress,
    currentStep 
  } = useFormStore();

  const currentGroupIndex = questionGroups.findIndex(g => g.id === id);
  const group = questionGroups[currentGroupIndex];

  useEffect(() => {
    if (group) {
      updateProgress(currentGroupIndex);
    }
  }, [group, currentGroupIndex, updateProgress]);

  if (!group) {
    return <Navigate to="/" replace />;
  }

  const handleVideoRecorded = async (questionId: string, blob: Blob) => {
    await addVideo(questionId, blob);
  };

  const handleAnswerSelected = async (questionId: string, answer: any) => {
    await addAnswer(questionId, answer);
  };

  const handleNext = () => {
    if (currentGroupIndex === questionGroups.length - 1) {
      navigate('/review');
    } else {
      navigate(`/question/${questionGroups[currentGroupIndex + 1].id}`);
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
              <p className="text-gray-400">{group.description}</p>
            </div>  

            <div className="mb-4">
              <p className="text-sm text-gray-400">
                Sección {currentGroupIndex + 1} de {questionGroups.length}
              </p>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / (questionGroups.length - 1)) * 100}%` }}
                />
              </div>
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
                    ? 'Complete todas las preguntas'
                    : currentGroupIndex === questionGroups.length - 1 
                      ? 'Finalizar Encuesta'
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