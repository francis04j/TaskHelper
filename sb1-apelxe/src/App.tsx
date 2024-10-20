import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TaskListPage from './pages/TaskListPage';
import TaskDetailPage from './pages/TaskDetailPage';
import CreateTaskPage from './pages/CreateTaskPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import RegisterBusinessPage from './pages/RegisterBusinessPage';
import WhyRegisterBusinessPage from './pages/WhyRegisterBusiness';
import AuthModal from './components/AuthModal';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tasks" element={<TaskListPage />} />
              <Route path="/tasks/:id" element={<TaskDetailPage />} />
              <Route path="/create-task" element={<CreateTaskPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/register-business" element={<RegisterBusinessPage />} />
              <Route path="/why-register-business" element={<WhyRegisterBusinessPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/terms" element={<TermsAndConditionsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;