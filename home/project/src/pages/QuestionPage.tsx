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
    if (submissionId && id) {
      recordPageTimestamp(submissionId, `question_${id}`);
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

  // Rest of the component remains the same...
};