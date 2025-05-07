import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Trash2, LogOut } from 'lucide-react';
import { getSubmissions, deleteSubmission } from '../services/admin';
import { downloadVideo, downloadAudio } from '../services/downloads';

interface Submission {
  id: number;
  rut: string;
  created_at: string;
  videos: Array<{ id: number; question_id: string; video_path: string }>;
  audios: Array<{ id: number; question_id: string; audio_path: string }>;
  answers: Array<{ id: number; question_id: string; answer: string }>;
}

export const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const data = await getSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error('Error loading submissions:', error);
      alert('Error loading submissions');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await deleteSubmission(id);
        setSubmissions(submissions.filter(s => s.id !== id));
      } catch (error) {
        console.error('Error deleting submission:', error);
        alert('Error deleting submission');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    RUT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Media
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {submission.rut}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {submission.videos.map((video) => (
                          <button
                            key={video.id}
                            onClick={() => downloadVideo(video.id)}
                            className="flex items-center space-x-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                          >
                            <Download className="w-4 h-4" />
                            <span>Video {video.question_id}</span>
                          </button>
                        ))}
                        {submission.audios.map((audio) => (
                          <button
                            key={audio.id}
                            onClick={() => downloadAudio(audio.id)}
                            className="flex items-center space-x-1 px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
                          >
                            <Download className="w-4 h-4" />
                            <span>Audio {audio.question_id}</span>
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(submission.id)}
                        className="flex items-center space-x-1 px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};