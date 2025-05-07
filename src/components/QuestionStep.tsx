import React from 'react';
import { Question } from '../types';
import { VideoRecorder } from './VideoRecorder';
import { ExampleResponse } from './ExampleResponse';

interface QuestionStepProps {
  question: Question;
  onVideoRecorded: (questionId: string, blob: Blob) => void;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({ question, onVideoRecorded }) => {

const labels=question.label
const getRandomLabel = () => {
  const randomIndex = Math.floor(Math.random() * labels.length);
  return labels[randomIndex];
};
  return (

    <div className="space-y-6">
      <div className="relative">
      <div className="grid grid-cols-[100%,3%] items-start">
                  









      
      <div>
      {getRandomLabel().split("\\n").map((part, index) => {
    // Define los estilos según el valor de `question.id`
    let sizeClass = "";
    if (question.id === "video1") {
      sizeClass = index === 0 
      ?"text-xl font-semibold text-gray-200 mb-4" 
      : index === 1 
      ? "text-xl font-semibold text-gray-200 mb-4" 
      : "text-2xl font-bold text-gray-200";
    } else if (question.id === "video2") {
      sizeClass = index === 0 
      ?"text-xl font-semibold text-gray-200 mb-4" 
      : index === 1 
      ? "text-xl font-semibold text-gray-200 mb-4" 
      : "text-2xl font-bold text-gray-200";
    } else if (question.id === "video3") {
      sizeClass = index === 0 
      ?"text-xl font-semibold text-gray-200 mb-4" 
      : index === 1 
      ? "text-xl font-semibold text-gray-200 mb-4" 
      : "text-2xl font-bold text-gray-200";

    } else if (question.id === "video4") {
      sizeClass = index === 0 
      ?"text-xl font-semibold text-gray-200 mb-4" 
      : index === 1 
      ? "text-xl font-semibold text-gray-200 mb-4" 
      : "text-2xl font-bold text-gray-200";

    } 
    
    
else {
      sizeClass = "text-xl font-semibold text-gray-200"; // Estilo predeterminado
    }








    return (
      <h2 key={index} className={`${sizeClass} pr-10`}>
        {part}
      </h2>
    );
  })}
</div>
















{/* <ExampleResponse type="video" question={question.label} /> */}
</div>
      </div>
      
      {question.imageUrl && (
  <div className="flex justify-center items-top ">
  <div className="relative rounded-lg overflow-hidden inline-block">
    <img
      src={question.imageUrl}
      alt="Scenario"
      className="w-full h-auto"
    />
  </div>
</div>
)}

      
      <VideoRecorder
        key={question.id}
        questionId={question.id}
        onVideoRecorded={onVideoRecorded}
      />
    </div>
  );


  
};