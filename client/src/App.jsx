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
    api
      .get('/auth/user')
      .then((res) => {
        if (res.data) {
          setUser(res.data);
          if (window.location.pathname === '/') navigate('/dashboard');
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--bg)' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent)' }}
          >
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L9 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5L7 1Z"
                fill="#fff"
              />
            </svg>
          </div>
          <div
            className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
            style={{
              borderColor: 'var(--accent)',
              borderTopColor: 'transparent',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {user && <Navbar user={user} />}
      <main style={user ? { paddingTop: '3.5rem' } : {}}>
        <div className={user ? 'max-w-5xl mx-auto px-5 py-8' : ''}>
          <Routes>
            {user ? (
              <>
                <Route
                  path="/dashboard"
                  element={<DashboardPage user={user} />}
                />
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
