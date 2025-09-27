// client/src/App.jsx
import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // We use a proxy to avoid CORS issues in development
    // Vite handles this, see vite.config.js setup next
    fetch('http://localhost:5001/api/test')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error('Failed to fetch:', err));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold text-blue-400">AI Career Coach</h1>
      <p className="mt-4 text-lg text-gray-300">
        Your journey to a dream job starts here.
      </p>
      <div className="mt-8 p-4 bg-gray-800 rounded-lg shadow-lg">
        <p className="text-green-400">
          Message from server:{' '}
          <span className="font-semibold text-white">
            {message || 'Loading...'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;
