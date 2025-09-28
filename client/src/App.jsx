// client/src/App.jsx
import { useState, useEffect } from 'react';

// A simple component for our home/login page
const HomePage = () => (
  <div className="flex flex-col items-center justify-center text-center">
    <h1 className="text-5xl font-bold text-blue-400">AI Career Coach</h1>
    <p className="mt-4 text-lg text-gray-300">Login to get started.</p>
    <a
      href="http://localhost:5001/api/auth/google"
      className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
    >
      Login with Google
    </a>
  </div>
);

// A simple component for our dashboard
const Dashboard = ({ user }) => (
  <div className="flex flex-col items-center justify-center text-center">
    <img
      src={user.image}
      alt="Profile"
      className="w-24 h-24 rounded-full mb-4 border-2 border-blue-400"
    />
    <h1 className="text-3xl font-bold text-white">
      Welcome, {user.displayName}!
    </h1>
    <p className="mt-2 text-gray-400">{user.email}</p>
    <a
      href="http://localhost:5001/api/auth/logout"
      className="mt-8 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
    >
      Logout
    </a>
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/auth/user', {
          // We need to send credentials (cookies) to the backend
          credentials: 'include',
        });
        if (res.ok) {
          const userData = await res.json();
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Could not fetch user', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // For now, we'll use the URL path to decide what to render
  const path = window.location.pathname;
  let content;

  if (loading) {
    content = <p className="text-white">Loading...</p>;
  } else if (path.startsWith('/dashboard') && user) {
    content = <Dashboard user={user} />;
  } else if (user) {
    // If user is logged in but not on dashboard, redirect them
    window.location.href = '/dashboard';
  } else {
    content = <HomePage />;
  }

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      {content}
    </div>
  );
}

export default App;
