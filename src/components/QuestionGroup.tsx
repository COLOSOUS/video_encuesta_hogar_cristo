import React from 'react';
import { Question } from '../types';
import { ChoiceQuestion } from './ChoiceQuestion';
import { LikertQuestion } from './LikertQuestion';
import { QuestionStep } from './QuestionStep';
import { PercentageQuestion } from './PercentageQuestion';
import { useFormStore } from '../store/formStore';


interface QuestionGroupProps {
  questions: Question[];
  groupId: string;
  onVideoRecorded: (questionId: string, blob: Blob) => void;
  onAnswerSelected: (questionId: string, answer: any) => void;
  getVideoByQuestionId: (questionId: string) => { blob: Blob } | undefined;
  getAnswerByQuestionId: (questionId: string) => any;
}

export const QuestionGroup: React.FC<QuestionGroupProps> = ({
  questions,
  groupId,
  onVideoRecorded,
  onAnswerSelected,
  getVideoByQuestionId,
  getAnswerByQuestionId
}) => {
  const autoFillEnabled = useFormStore(state => state.autoFillEnabled);
  const toggleAutoFill = useFormStore(state => state.toggleAutoFill);

  const handleAutoFill = () => {
    if (!autoFillEnabled) {
      questions.forEach(question => {
        if (question.type === 'choice' && question.options) {
          const options = [...question.options];
          const mas = options.splice(Math.floor(Math.random() * options.length), 1)[0];
          const menos = options[Math.floor(Math.random() * options.length)];
          
          onAnswerSelected(question.id, { mas, menos });
        }
      });
    }
    toggleAutoFill();
  };

  const showAutoFill = groupId === 'personality';

  return (
    <div className="space-y-8">
      {showAutoFill && (
        <div className="flex justify-end">
          <button
            onClick={handleAutoFill}
            className={`px-4 py-2 rounded-lg transition-colors ${
              autoFillEnabled 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {autoFillEnabled ? 'Desactivar Auto-respuesta' : 'Auto-responder'}
          </button>
        </div>
      )}

      {questions.map((question) => (
        <div key={question.id} className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-6">
          {question.type === 'video' && (
            <QuestionStep
              question={question}
              onVideoRecorded={onVideoRecorded}
            />
          )}
          {question.type === 'choice' && (
            
            <ChoiceQuestion
              question={question}
              onAnswerSelected={onAnswerSelected}
              currentAnswer={getAnswerByQuestionId(question.id) || { mas: '', menos: '' }}
            />
          )}
          {question.type === 'likert' && (
            <LikertQuestion
              question={question}
              onAnswerSelected={onAnswerSelected}
              currentAnswer={getAnswerByQuestionId(question.id)}
            />
          )}
          {question.type === 'percentage' && (
            <PercentageQuestion
              question={question}
              onAnswerSelected={onAnswerSelected}
              currentAnswer={getAnswerByQuestionId(question.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};