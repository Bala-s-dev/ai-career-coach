import React, { useState } from 'react';
import api from '../api';

const InterviewPrepPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isGettingFeedback, setIsGettingFeedback] = useState(false);

  const handleStart = async (e) => {
    e.preventDefault();
    if (!jobTitle.trim()) return;
    setIsLoading(true);
    setError('');
    try {
      const res = await api.post('/interview/questions', { jobTitle });
      setQuestions(res.data.questions);
      setSessionStarted(true);
      setCurrentIndex(0);
      setUserAnswer('');
      setFeedback('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate questions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;
    setIsGettingFeedback(true);
    setError('');
    setFeedback('');
    try {
      const res = await api.post('/interview/feedback', {
        question: questions[currentIndex],
        answer: userAnswer,
      });
      setFeedback(res.data.feedback);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get feedback.');
    } finally {
      setIsGettingFeedback(false);
    }
  };

  const handleNext = () => {
    setCurrentIndex((i) => i + 1);
    setUserAnswer('');
    setFeedback('');
  };

  const handleReset = () => {
    setSessionStarted(false);
    setJobTitle('');
    setQuestions([]);
    setCurrentIndex(0);
    setUserAnswer('');
    setFeedback('');
    setError('');
  };

  const isFinished = sessionStarted && currentIndex >= questions.length;
  const progress =
    questions.length > 0
      ? Math.round((currentIndex / questions.length) * 100)
      : 0;

  return (
    <div className="max-w-2xl mx-auto animate-fadeInUp">
      <div className="mb-7">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
          Interview Coach
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>
          AI-generated practice questions with instant feedback.
        </p>
      </div>

      {/* Setup */}
      {!sessionStarted && (
        <div className="card p-6">
          <h2
            className="text-sm font-semibold mb-4"
            style={{ color: 'var(--text-1)' }}
          >
            Start a practice session
          </h2>
          <form onSubmit={handleStart} className="space-y-4">
            <div>
              <label
                className="block text-xs font-medium mb-2"
                style={{ color: 'var(--text-2)' }}
              >
                Target job title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Software Engineer, Product Manager…"
                className="input-base"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !jobTitle.trim()}
              className="btn-primary w-full py-2.5 text-sm"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating questions…
                </span>
              ) : (
                'Start Session'
              )}
            </button>
          </form>
        </div>
      )}

      {/* Active session */}
      {sessionStarted && !isFinished && (
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="card p-4">
            <div
              className="flex justify-between text-xs mb-2"
              style={{ color: 'var(--text-3)' }}
            >
              <span>
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span>{progress}% complete</span>
            </div>
            <div
              className="h-1.5 rounded-full"
              style={{ background: 'var(--border2)' }}
            >
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: 'var(--accent)' }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded"
                style={{
                  background: 'var(--surface2)',
                  color: 'var(--accent-h)',
                  border: '1px solid var(--border2)',
                }}
              >
                Q{currentIndex + 1}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-3)' }}>
                Interview question
              </span>
            </div>
            <p
              className="text-base font-medium leading-snug"
              style={{ color: 'var(--text-1)' }}
            >
              {questions[currentIndex]}
            </p>
          </div>

          {/* Answer */}
          <div className="card p-5">
            <form onSubmit={handleSubmitAnswer} className="space-y-3">
              <label
                className="block text-xs font-medium"
                style={{ color: 'var(--text-2)' }}
              >
                Your Answer
              </label>
              <textarea
                rows={6}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Write your answer here. Use specific examples and be concise…"
                className="input-base resize-none"
                disabled={!!feedback}
              />

              {!feedback && (
                <button
                  type="submit"
                  disabled={isGettingFeedback || !userAnswer.trim()}
                  className="btn-primary w-full py-2.5 text-sm"
                >
                  {isGettingFeedback ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Getting feedback…
                    </span>
                  ) : (
                    'Submit Answer'
                  )}
                </button>
              )}
            </form>

            {/* Feedback */}
            {feedback && (
              <div className="mt-4 space-y-3 animate-fadeInUp">
                <div
                  className="rounded-lg p-4"
                  style={{
                    background: 'rgba(99,102,241,0.07)',
                    border: '1px solid rgba(99,102,241,0.2)',
                  }}
                >
                  <p
                    className="text-xs font-semibold mb-2"
                    style={{ color: 'var(--accent-h)' }}
                  >
                    AI Feedback
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-2)' }}
                  >
                    {feedback}
                  </p>
                </div>
                <button
                  onClick={handleNext}
                  className="btn-primary w-full py-2.5 text-sm"
                >
                  {currentIndex + 1 < questions.length
                    ? 'Next Question →'
                    : 'Finish Session'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Finished */}
      {isFinished && (
        <div className="card p-10 text-center animate-fadeInUp">
          <div className="text-4xl mb-4">🎯</div>
          <h2
            className="text-xl font-bold mb-2"
            style={{ color: 'var(--text-1)' }}
          >
            Session Complete!
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-2)' }}>
            Great work. Consistency is the key to interview success.
          </p>
          <button
            onClick={handleReset}
            className="btn-primary px-8 py-2.5 text-sm"
          >
            Start New Session
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="mt-4 px-4 py-3 rounded-lg text-sm"
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#fca5a5',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default InterviewPrepPage;
