// client/src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
        const res = await fetch('http://localhost:5001/api/auth/user', {
          credentials: 'include',
        });
        if (res.ok) {
          const userData = await res.json();
          if (userData) {
            setUser(userData);
            // If user is logged in, redirect them from home to dashboard
            if (window.location.pathname === '/') {
              navigate('/dashboard');
            }
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Could not fetch user', error);
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
      {' '}
      {/* pt-20 for navbar height */}
      {user && <Navbar user={user} />}
      <main className="container mx-auto p-4">
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
              {/* Redirect any other path to dashboard if logged in */}
              <Route path="*" element={<DashboardPage user={user} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
              {/* Redirect any other path to home if not logged in */}
              <Route path="*" element={<HomePage />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
