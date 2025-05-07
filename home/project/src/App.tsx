import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { IntroPage } from './pages/IntroPage';
import { QuestionPage } from './pages/QuestionPage';
import { ReviewPage } from './pages/ReviewPage';
import { SuccessPage } from './pages/SuccessPage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { useFormStore } from './store/formStore';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const token = localStorage.getItem('token');

  if (!isAdmin || !token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  const isInitialized = useFormStore(state => !!state.rut);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IntroPage />} />
          <Route
            path="question/:id"
            element={isInitialized ? <QuestionPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="review"
            element={isInitialized ? <ReviewPage /> : <Navigate to="/" replace />}
          />
          <Route path="success" element={<SuccessPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}