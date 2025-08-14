import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetail from './pages/PostDetail';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Landing from './pages/LandingPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CheckEmail from './pages/CheckEmail';
import ResetSuccess from './pages/ResetSuccess';

import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const location = useLocation();
  const showFooter = location.pathname === '/'; // show only on landing page

  return (
    <div className="min-h-screen flex flex-col bg-[#111714] text-white">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/check-email" element={<CheckEmail />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/reset-success" element={<ResetSuccess />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
            <Route path="/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
          </Routes>
        </div>
      </main>

      {showFooter && <Footer />}
    </div>
  );
};

export default App;
