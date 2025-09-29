// client/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';

const DashboardPage = ({ user }) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/resume/history', {
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch history.');
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user.displayName}!</h1>
      <p className="text-gray-400 mb-8">
        Here's a summary of your activity and progress.
      </p>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Resume Analysis History</h2>
        {isLoading ? (
          <p>Loading history...</p>
        ) : history.length > 0 ? (
          <ul className="space-y-4">
            {history.map((item) => (
              <li
                key={item._id}
                className="bg-gray-700 p-4 rounded-md flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-white">
                    {item.isTargetedAnalysis
                      ? 'Targeted Analysis'
                      : 'General Analysis'}{' '}
                    - Score: <span className="text-blue-400">{item.score}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Analyzed on: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                  View Details
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">
            You haven't analyzed any resumes yet. Go to the Resume Analyzer to
            get started!
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
