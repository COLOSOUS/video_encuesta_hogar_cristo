import React from 'react';
import { Question } from '../types';
import { ExampleResponse } from './ExampleResponse';

interface ChoiceQuestionProps {
  question: Question;
  onAnswerSelected: (questionId: string, answer: { mas: string; menos: string }) => void;
  currentAnswer?: { mas: string; menos: string };
}

export const ChoiceQuestion: React.FC<ChoiceQuestionProps> = ({
  question,
  onAnswerSelected,
  currentAnswer = { mas: '', menos: '' }
}) => {
  const handleOptionChange = (option: string, type: 'mas' | 'menos') => {
    const newAnswer = { ...currentAnswer };
    
    // If selecting the same option in the other column, clear it
    if (type === 'mas' && option === currentAnswer.menos) {
      newAnswer.menos = '';
    } else if (type === 'menos' && option === currentAnswer.mas) {
      newAnswer.mas = '';
    }
    
    // Toggle selection
    if (currentAnswer[type] === option) {
      newAnswer[type] = '';
    } else {
      newAnswer[type] = option;
    }
    
    onAnswerSelected(question.id, newAnswer);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <h2 className="text-xl font-semibold text-gray-200 pr-10">{question.label}</h2>
        {/*<ExampleResponse type="choice" question={question.label} />*/}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-300">Palabra</th>
              <th className="px-4 py-2 text-center text-gray-300">Más</th>
              <th className="px-4 py-2 text-center text-gray-300">Menos</th>
            </tr>
          </thead>
          <tbody>
            {question.options?.map((option) => (
              <tr key={option} className="border-t border-gray-700">
                <td className="px-4 py-3 text-gray-200">{option}</td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={currentAnswer.mas === option}
                    onChange={() => handleOptionChange(option, 'mas')}
                    className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={currentAnswer.menos === option}
                    onChange={() => handleOptionChange(option, 'menos')}
                    className="form-checkbox h-4 w-4 text-red-600 bg-gray-700 border-gray-600 focus:ring-red-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-400">
        Selecciona una palabra para cada columna (Más/Menos)
      </p>
    </div>
  );
};