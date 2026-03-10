import React, { useState } from 'react';
import api from '../api';

const InterviewPrepPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isGettingFeedback, setIsGettingFeedback] = useState(false);

  const handleStartSession = async (e) => {
    e.preventDefault();
    if (!jobTitle) return;
    setIsLoading(true); setError(''); setQuestions([]);
    try {
      const response = await api.post('/interview/questions', { jobTitle });
      setQuestions(response.data.questions);
      setSessionStarted(true);
      setCurrentQuestionIndex(0);
      setFeedback(''); setUserAnswer('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate questions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!userAnswer) return;
    setIsGettingFeedback(true); setError(''); setFeedback('');
    try {
      const response = await api.post('/interview/feedback', {
        question: questions[currentQuestionIndex],
        answer: userAnswer,
      });
      setFeedback(response.data.feedback);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get feedback.');
    } finally {
      setIsGettingFeedback(false);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setUserAnswer(''); setFeedback('');
  };

  const isSessionFinished = currentQuestionIndex >= questions.length;
  const progress = questions.length > 0 ? ((currentQuestionIndex) / questions.length) * 100 : 0;

  return (
    <div className="max-w-3xl mx-auto animate-fadeInUp">
      <div className="mb-8">
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--gold)' }}>Interview Coach</p>
        <h1 className="font-display text-4xl font-semibold" style={{ color: 'var(--cream)' }}>
          Practice makes perfect
        </h1>
        <p className="mt-2" style={{ color: 'var(--mist)' }}>
          AI-generated questions with instant, detailed feedback.
        </p>
      </div>

      {/* Setup */}
      {!sessionStarted && (
        <div className="card p-8">
          <h2 className="font-semibold text-lg mb-5" style={{ color: 'var(--cream)' }}>Start a practice session</h2>
          <form onSubmit={handleStartSession} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--mist-light)' }}>
                Target job title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g., Senior Software Engineer, Product Manager..."
                className="input-base"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !jobTitle}
              className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
                  </svg>
                  Generating questions…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  Start Practice Session
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Active session */}
      {sessionStarted && !isSessionFinished && (
        <div className="space-y-5">
          {/* Progress */}
          <div className="card p-5">
            <div className="flex items-center justify-between text-sm mb-3">
              <span style={{ color: 'var(--mist)' }}>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span style={{ color: 'var(--gold)' }}>{Math.round(progress)}% complete</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'var(--ink-4)' }}>
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--gold), var(--gold-light))' }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="card p-7">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'rgba(201, 168, 76, 0.15)', color: 'var(--gold)', border: '1px solid rgba(201, 168, 76, 0.2)' }}>
                Q
              </div>
              <span className="text-xs font-medium" style={{ color: 'var(--mist)' }}>Interview Question</span>
            </div>
            <p className="text-lg font-medium leading-snug" style={{ color: 'var(--cream)' }}>
              {questions[currentQuestionIndex]}
            </p>
          </div>

          {/* Answer */}
          <div className="card p-7">
            <form onSubmit={handleSubmitAnswer} className="space-y-4">
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--mist-light)' }}>
                Your Answer
              </label>
              <textarea
                rows={7}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here. Be specific and use examples from your experience..."
                className="input-base resize-none"
                disabled={!!feedback}
              />
              {!feedback && (
                <button
                  type="submit"
                  disabled={isGettingFeedback || !userAnswer}
                  className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
                >
                  {isGettingFeedback ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
                      </svg>
                      Getting feedback…
                    </>
                  ) : 'Submit Answer'}
                </button>
              )}
            </form>

            {feedback && (
              <div className="mt-5 pt-5 animate-fadeInUp" style={{ borderTop: '1px solid var(--ink-4)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                    style={{ background: 'rgba(201, 168, 76, 0.1)', color: 'var(--gold)', border: '1px solid rgba(201, 168, 76, 0.2)' }}>
                    AI
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--gold)' }}>AI Feedback</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--mist-light)' }}>{feedback}</p>
                <button
                  onClick={handleNextQuestion}
                  className="btn-primary w-full py-3 text-sm mt-5 flex items-center justify-center gap-2"
                >
                  {currentQuestionIndex + 1 < questions.length ? (
                    <>Next Question <span>→</span></>
                  ) : 'Finish Session'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Finished */}
      {isSessionFinished && questions.length > 0 && (
        <div className="card p-10 text-center animate-fadeInUp">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="font-display text-3xl font-semibold mb-2" style={{ color: 'var(--cream)' }}>
            Session Complete!
          </h2>
          <p className="mb-6" style={{ color: 'var(--mist)' }}>
            Excellent work. Consistency is the key to interview success.
          </p>
          <button
            onClick={() => { setSessionStarted(false); setJobTitle(''); setQuestions([]); }}
            className="btn-primary px-8 py-3 text-sm"
          >
            Start New Session
          </button>
        </div>
      )}

      {error && (
        <p className="text-center text-sm mt-4" style={{ color: '#fca5a5' }}>{error}</p>
      )}
    </div>
  );
};

export default InterviewPrepPage;
