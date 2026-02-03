import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import api from './api'; //
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage'; 
import JobSearchPage from './pages/JobSearchPage';
import InterviewPrepPage from './pages/InterviewPrepPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Uses the production URL and handles credentials automatically
        const res = await api.get('/auth/user'); 
        if (res.data) {
          setUser(res.data);
          if (window.location.pathname === '/') {
            navigate('/dashboard');
          }
        }
      } catch (error) {
        console.error('Could not fetch user', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white pt-20">
      {user && <Navbar user={user} />}
      <main className="container mx-auto p-4">
        <Routes>
          {user ? (
            <>
              <Route path="/dashboard" element={<DashboardPage user={user} />}/>
              <Route path="/analyzer" element={<ResumeAnalyzerPage />} />
              <Route path="/jobs" element={<JobSearchPage />} />
              <Route path="/interview" element={<InterviewPrepPage />} />
              <Route path="*" element={<DashboardPage user={user} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<HomePage />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;