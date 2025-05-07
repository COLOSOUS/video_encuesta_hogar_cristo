import React from 'react';
import { Question } from '../types';
import { PercentageSlider } from './PercentageSlider';
import { EvolutionAnimation } from './EvolutionAnimation';
import { ExampleResponse } from './ExampleResponse';
interface PercentageQuestionProps {
  question: Question;
  onAnswerSelected: (questionId: string, answer: number) => void;
  currentAnswer?: number;
}

export const PercentageQuestion: React.FC<PercentageQuestionProps> = ({
  question,
  onAnswerSelected,
  currentAnswer = 0
}) => {
  return (
    <div className="space-y-8">
      
      <div className="space-y-6">
  <div className="relative">
    <div className="grid grid-cols-[100%,3%] items-start">
      <h3 className="text-xl font-semibold text-gray-200">{question.label}</h3>
      <ExampleResponse type="percentage" question="" />
    </div>
  </div>
</div>
      
      <div className="max-w-2xl mx-auto">
        <PercentageSlider 
          value={currentAnswer} 
          onChange={(value) => onAnswerSelected(question.id, value)}
        />
      </div>

      <EvolutionAnimation percentage={currentAnswer} />
    </div>
  );
};