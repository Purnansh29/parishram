import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import StudentsManagement from './pages/StudentsManagement';
import TeachersManagement from './pages/TeachersManagement';
import FinanceManagement from './pages/FinanceManagement';
import MockTests from './pages/MockTests';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import CourseDetail from './pages/CourseDetail';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
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
          <Route path="/dashboard/course/:courseId" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
