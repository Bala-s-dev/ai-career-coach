import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import api from './api';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
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
        const res = await api.get('/auth/user');
        if (res.data) {
          setUser(res.data);
          if (window.location.pathname === '/') navigate('/dashboard');
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--ink)' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #e8c96a, #c9a84c)' }}>
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L9 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5L7 1Z" fill="#0d0d0f"/>
            </svg>
          </div>
          <div className="flex gap-1">
            {[0,1,2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: 'var(--gold)',
                  animation: `bounce 0.9s ease-in-out ${i * 0.15}s infinite`,
                }} />
            ))}
          </div>
        </div>
        <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }`}</style>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>
      {user && <Navbar user={user} />}
      <main className={user ? 'pt-20 pb-12' : ''}>
        <div className={user ? 'max-w-6xl mx-auto px-6' : ''}>
          <Routes>
            {user ? (
              <>
                <Route path="/dashboard" element={<DashboardPage user={user} />} />
                <Route path="/analyzer" element={<ResumeAnalyzerPage />} />
                <Route path="/jobs" element={<JobSearchPage />} />
                <Route path="/interview" element={<InterviewPrepPage />} />
                <Route path="*" element={<DashboardPage user={user} />} />
              </>
            ) : (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="*" element={<LandingPage />} />
              </>
            )}
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
