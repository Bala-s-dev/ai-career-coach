// client/src/pages/InterviewPrepPage.jsx
import React, { useState } from 'react';

const InterviewPrepPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionStarted, setSessionStarted] = useState(false);

  const handleStartSession = async (e) => {
    e.preventDefault();
    if (!jobTitle) return;

    setIsLoading(true);
    setError('');
    setQuestions([]);

    try {
      const response = await fetch('/api/interview/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions.');
      }

      const data = await response.json();
      setQuestions(data.questions);
      setSessionStarted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Interview Coach
      </h1>

      {!sessionStarted ? (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleStartSession}>
            <label
              htmlFor="job-title"
              className="block text-lg font-medium text-gray-300 mb-2"
            >
              Enter the job title you're interviewing for:
            </label>
            <input
              id="job-title"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-200"
            />
            <div className="text-center mt-6">
              <button
                type="submit"
                disabled={isLoading || !jobTitle}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg disabled:bg-gray-500 transition duration-300 text-lg"
              >
                {isLoading
                  ? 'Generating Questions...'
                  : 'Start Practice Session'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Here are your questions for a{' '}
            <span className="text-blue-400">{jobTitle}</span> role:
          </h2>
          <ul className="space-y-4">
            {questions.map((q, index) => (
              <li key={index} className="bg-gray-700 p-4 rounded-md">
                <p className="text-gray-300">
                  <span className="font-bold text-gray-100">Q{index + 1}:</span>{' '}
                  {q}
                </p>
              </li>
            ))}
          </ul>
          {/* We will add the interactive Q&A part here later */}
        </div>
      )}

      {error && <p className="text-center text-red-400 mt-4">{error}</p>}
    </div>
  );
};

export default InterviewPrepPage;
