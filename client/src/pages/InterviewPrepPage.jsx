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
  const progress = questions.length > 0 ? (currentQuestionIndex / questions.length) * 100 : 0;

  return (
    <div className="max-w-3xl mx-auto animate-fadeInUp">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'rgba(239,159,39,0.9)' }}>Interview Coach</p>
        <h1 className="font-display text-4xl font-bold" style={{ color: 'var(--hero)' }}>Practice makes perfect</h1>
        <p className="mt-2" style={{ color: 'var(--body-text)' }}>AI-generated questions with instant, detailed feedback.</p>
      </div>

      {/* Setup */}
      {!sessionStarted && (
        <div className="card p-8">
          <h2 className="font-display font-semibold text-lg mb-6" style={{ color: 'var(--hero)' }}>Start a practice session</h2>
          <form onSubmit={handleStartSession} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--body-text)' }}>
                Target job title
              </label>
              <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g., Senior Software Engineer, Product Manager..."
                className="input-base" />
            </div>
            <button type="submit" disabled={isLoading || !jobTitle}
              className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2">
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
              <span style={{ color: 'var(--meta)' }}>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span style={{ color: '#c4bfff' }}>{Math.round(progress)}% complete</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <div className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #534AB7, #4fd4a8)' }} />
            </div>
          </div>

          {/* Question card */}
          <div className="card p-7">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'rgba(83,74,183,0.2)', color: '#c4bfff', border: '1px solid rgba(83,74,183,0.3)' }}>
                Q
              </div>
              <span className="text-xs font-medium" style={{ color: 'var(--meta)' }}>Interview Question</span>
              <span className="pulse-live ml-auto" />
            </div>
            <p className="text-lg font-medium leading-snug" style={{ color: 'var(--hero)' }}>
              {questions[currentQuestionIndex]}
            </p>
          </div>

          {/* Answer card */}
          <div className="card p-7">
            <form onSubmit={handleSubmitAnswer} className="space-y-4">
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--body-text)' }}>Your Answer</label>
              <textarea rows={7} value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here. Be specific and use examples from your experience..."
                className="input-base resize-none" disabled={!!feedback} />
              {!feedback && (
                <button type="submit" disabled={isGettingFeedback || !userAnswer}
                  className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2">
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

            {/* AI Feedback */}
            {feedback && (
              <div className="mt-5 pt-5 animate-fadeInUp" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="p-5 rounded-xl mb-4"
                  style={{ background: 'rgba(83,74,183,0.08)', border: '1px solid rgba(83,74,183,0.2)' }}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: 'rgba(83,74,183,0.2)', color: '#c4bfff', border: '1px solid rgba(83,74,183,0.3)' }}>
                      AI
                    </div>
                    <span className="text-sm font-semibold" style={{ color: '#c4bfff' }}>AI Feedback</span>
                    <span className="pulse-live ml-auto" />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--body-text)' }}>{feedback}</p>
                </div>
                <button onClick={handleNextQuestion}
                  className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2">
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
        <div className="card p-12 text-center animate-fadeInUp">
          <div className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center text-4xl"
            style={{ background: 'rgba(29,158,117,0.12)', border: '1px solid rgba(29,158,117,0.22)' }}>
            🎯
          </div>
          <h2 className="font-display text-3xl font-bold mb-2" style={{ color: 'var(--hero)' }}>Session Complete!</h2>
          <p className="mb-8" style={{ color: 'var(--body-text)' }}>Excellent work. Consistency is the key to interview success.</p>
          <button onClick={() => { setSessionStarted(false); setJobTitle(''); setQuestions([]); }}
            className="btn-primary px-10 py-3.5 text-sm">
            Start New Session
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 rounded-xl text-sm text-center"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default InterviewPrepPage;
