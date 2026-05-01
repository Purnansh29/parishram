import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loading pages for Code Splitting & Performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const StudentsManagement = lazy(() => import('./pages/StudentsManagement'));
const TeachersManagement = lazy(() => import('./pages/TeachersManagement'));
const FinanceManagement = lazy(() => import('./pages/FinanceManagement'));
const MockTests = lazy(() => import('./pages/MockTests'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Profile = lazy(() => import('./pages/Profile'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const MyCourses = lazy(() => import('./pages/MyCourses'));
const TestPlayer = lazy(() => import('./pages/TestPlayer'));

// Full Screen Loader for Suspense Fallback
const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-accentPrimary rounded-full animate-spin mb-4"></div>
    <p className="text-gray-500 font-medium animate-pulse">Loading Parishram...</p>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage type="login" />} />
            <Route path="/signup" element={<AuthPage type="signup" />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/students" element={<ProtectedRoute><StudentsManagement /></ProtectedRoute>} />
            <Route path="/dashboard/teachers" element={<ProtectedRoute><TeachersManagement /></ProtectedRoute>} />
            <Route path="/dashboard/finance" element={<ProtectedRoute><FinanceManagement /></ProtectedRoute>} />
            <Route path="/dashboard/mock-tests" element={<ProtectedRoute><MockTests /></ProtectedRoute>} />
            <Route path="/dashboard/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/dashboard/my-courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
            <Route path="/dashboard/course/:courseId" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
            <Route path="/dashboard/test/:id" element={<ProtectedRoute><TestPlayer /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
