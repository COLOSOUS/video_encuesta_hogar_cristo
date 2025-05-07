import React from 'react';
import { Question } from '../types';
import { ExampleResponse } from './ExampleResponse';

interface LikertQuestionProps {
  question: Question;
  onAnswerSelected: (questionId: string, answer: string) => void;
  currentAnswer?: string;
}

export const LikertQuestion: React.FC<LikertQuestionProps> = ({
  question,
  onAnswerSelected,
  currentAnswer
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <h2 className="text-xl font-semibold text-gray-200 pr-10"> {question.label}</h2>
        <ExampleResponse type="percentage" question={question.label} />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-1/3"></th>
              {question.options?.map((option) => (
                <th key={option} className="text-center p-2 text-sm text-gray-300">
                  {option}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2"></td>
              {question.options?.map((option) => (
                <td key={option} className="text-center">
                  <label className="inline-flex items-center justify-center">
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={currentAnswer === option}
                      onChange={(e) => onAnswerSelected(question.id, e.target.value)}
                      className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                    />
                  </label>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};