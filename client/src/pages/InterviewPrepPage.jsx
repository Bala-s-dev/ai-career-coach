// client/src/pages/InterviewPrepPage.jsx
import React, { useState } from 'react';

const InterviewPrepPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // State for the active interview session
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isGettingFeedback, setIsGettingFeedback] = useState(false);

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
      if (!response.ok) throw new Error('Failed to generate questions.');
      const data = await response.json();
      setQuestions(data.questions);
      setSessionStarted(true);
      setCurrentQuestionIndex(0);
      setFeedback('');
      setUserAnswer('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!userAnswer) return;
    setIsGettingFeedback(true);
    setError('');
    setFeedback('');
    try {
      const response = await fetch('/api/interview/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questions[currentQuestionIndex],
          answer: userAnswer,
        }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to get feedback.');
      const data = await response.json();
      setFeedback(data.feedback);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGettingFeedback(false);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setUserAnswer('');
    setFeedback('');
  };

  const isSessionFinished = currentQuestionIndex >= questions.length;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Interview Coach
      </h1>

      {/* --- SETUP VIEW --- */}
      {!sessionStarted && (
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
      )}

      {/* --- ACTIVE SESSION VIEW --- */}
      {sessionStarted && !isSessionFinished && (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
          <div>
            <p className="text-sm text-gray-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p className="text-xl text-white mt-1">
              {questions[currentQuestionIndex]}
            </p>
          </div>
          <form onSubmit={handleSubmitAnswer}>
            <textarea
              rows={7}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-200"
              disabled={!!feedback}
            />
            {!feedback && (
              <div className="text-center mt-4">
                <button
                  type="submit"
                  disabled={isGettingFeedback || !userAnswer}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg disabled:bg-gray-500"
                >
                  {isGettingFeedback ? 'Getting Feedback...' : 'Submit Answer'}
                </button>
              </div>
            )}
          </form>

          {feedback && (
            <div className="mt-4 border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-yellow-300">
                Feedback:
              </h3>
              <p className="text-gray-300 mt-2">{feedback}</p>
              <div className="text-center mt-6">
                <button
                  onClick={handleNextQuestion}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
                >
                  Next Question →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- FINISHED VIEW --- */}
      {isSessionFinished && questions.length > 0 && (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            Practice Session Complete!
          </h2>
          <p className="text-gray-300">
            Great work. You can start a new session anytime.
          </p>
          <button
            onClick={() => setSessionStarted(false)}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Start New Session
          </button>
        </div>
      )}

      {error && <p className="text-center text-red-400 mt-4">{error}</p>}
    </div>
  );
};

export default InterviewPrepPage;
