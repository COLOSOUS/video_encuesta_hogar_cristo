import axios from 'axios';
import { FormSubmission } from '../types';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const recordPageTimestamp = async (submissionId: string, pageName: string) => {
  try {
    await supabase
      .from('page_timestamps')
      .insert([
        { submission_id: submissionId, page_name: pageName }
      ]);
  } catch (error) {
    console.error('Error recording page timestamp:', error);
  }
};

export const savePercentageValue = async (submissionId: string, value: number) => {
  try {
    await supabase
      .from('percentage_values')
      .insert([
        { submission_id: submissionId, value }
      ]);
  } catch (error) {
    console.error('Error saving percentage value:', error);
  }
};

export const uploadFormData = async (data: FormSubmission): Promise<void> => {
  try {
    // First, create the submission
    const { data: submission, error: submissionError } = await supabase
      .from('submissions')
      .insert([{ rut: data.rut }])
      .select()
      .single();

    if (submissionError) throw submissionError;

    // Upload videos to Supabase Storage
    const videoPromises = data.videos.map(async (video) => {
      const fileName = `${submission.id}/${video.questionId}.webm`;
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, video.blob);

      if (uploadError) throw uploadError;

      return supabase
        .from('videos')
        .insert([{
          submission_id: submission.id,
          question_id: video.questionId,
          video_path: fileName
        }]);
    });

    // Save answers
    const answersPromise = supabase
      .from('answers')
      .insert(
        Object.entries(data.answers).map(([questionId, answer]) => ({
          submission_id: submission.id,
          question_id: questionId,
          answer
        }))
      );

    await Promise.all([...videoPromises, answersPromise]);
  } catch (error) {
    console.error('Error uploading form data:', error);
    throw error;
  }
};