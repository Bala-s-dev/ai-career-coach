import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const PriorityBadge = ({ priority }) => {
  const map = {
    High: 'badge-high',
    Medium: 'badge-medium',
    Low: 'badge-low',
  };
  return (
    <span
      className={`${map[priority] || 'badge-low'} text-xs font-medium px-2 py-0.5 rounded-full`}
    >
      {priority}
    </span>
  );
};

const ScoreDisplay = ({ score }) => {
  const pct = Math.min(100, Math.max(0, score || 0));
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const color =
    pct >= 75
      ? 'var(--success)'
      : pct >= 50
        ? 'var(--warning)'
        : 'var(--danger)';
  return (
    <div className="relative shrink-0" style={{ width: 96, height: 96 }}>
      <svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke="var(--border2)"
          strokeWidth="7"
        />
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold tabular-nums" style={{ color }}>
          {score}
        </span>
        <span className="text-xs" style={{ color: 'var(--text-3)' }}>
          /100
        </span>
      </div>
    </div>
  );
};

const ResumeAnalyzerPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (f) => {
    setFile(f);
    setAnalysis(null);
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type === 'application/pdf') handleFileChange(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a resume file.');
      return;
    }
    setIsLoading(true);
    setAnalysis(null);
    setError('');
    const fd = new FormData();
    fd.append('resume', file);
    fd.append('jobDescription', jobDescription);
    try {
      const res = await api.post('/resume/analyze', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAnalysis(res.data.analysis);
      setResumeText(res.data.extractedText);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Something went wrong.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindJobs = async () => {
    setIsLoadingJobs(true);
    setError('');
    try {
      const res = await api.post('/resume/generate-job-query', { resumeText });
      navigate('/jobs', { state: { autoQuery: res.data.query } });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Could not generate query.',
      );
    } finally {
      setIsLoadingJobs(false);
    }
  };

  // Bug fix: fallback chain so either field works
  const score = analysis?.matchScore ?? analysis?.overallScore ?? 0;

  return (
    <div className="max-w-3xl mx-auto animate-fadeInUp">
      <div className="mb-7">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
          Resume Analyzer
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>
          Upload your PDF and get an AI-powered analysis in seconds.
        </p>
      </div>

      {/* Upload form */}
      <div className="card p-6 mb-4">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Drop zone */}
          <div>
            <label
              className="block text-xs font-medium mb-2"
              style={{ color: 'var(--text-2)' }}
            >
              Resume (PDF)
            </label>
            <div
              className={`file-drop-zone p-6 text-center ${isDragging ? 'active' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('resume-upload').click()}
            >
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.75"
                  >
                    <path d="M9 12h6M9 16h6M9 8h2M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
                  </svg>
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-1)' }}
                  >
                    {file.name}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-3)' }}>
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="text-xs ml-2 px-2 py-0.5 rounded"
                    style={{
                      color: 'var(--text-3)',
                      background: 'var(--surface2)',
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <svg
                    className="mx-auto mb-2"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    style={{ color: 'var(--text-3)' }}
                  >
                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm" style={{ color: 'var(--text-2)' }}>
                    Drop PDF here or{' '}
                    <span style={{ color: 'var(--accent-h)' }}>browse</span>
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: 'var(--text-3)' }}
                  >
                    PDF only · max 10 MB
                  </p>
                </>
              )}
            </div>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          </div>

          {/* Job description */}
          <div>
            <label
              className="block text-xs font-medium mb-2"
              style={{ color: 'var(--text-2)' }}
            >
              Job Description{' '}
              <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>
                (optional — enables targeted scoring)
              </span>
            </label>
            <textarea
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description for targeted keyword analysis..."
              className="input-base resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !file}
            className="btn-primary w-full py-2.5 text-sm"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing…
              </span>
            ) : (
              'Analyze My Resume'
            )}
          </button>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div
          className="mb-4 px-4 py-3 rounded-lg text-sm"
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#fca5a5',
          }}
        >
          {error}
        </div>
      )}

      {/* Results */}
      {analysis && (
        <div className="space-y-4 animate-fadeInUp">
          {/* Find Jobs CTA */}
          <div className="card p-4 flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: 'var(--text-1)' }}
              >
                Ready to apply?
              </p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                Auto-find jobs matched to your resume
              </p>
            </div>
            <button
              onClick={handleFindJobs}
              disabled={isLoadingJobs}
              className="btn-primary text-xs px-4 py-2 shrink-0"
            >
              {isLoadingJobs ? 'Finding…' : 'Find Jobs For Me →'}
            </button>
          </div>

          {/* Score card */}
          <div className="card p-6 flex items-center gap-6">
            <ScoreDisplay score={score} />
            <div>
              <h2
                className="font-semibold text-base mb-1"
                style={{ color: 'var(--text-1)' }}
              >
                {analysis.matchScore ? 'Job Match Score' : 'Resume Score'}
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-2)' }}
              >
                {analysis.summary}
              </p>
            </div>
          </div>

          {/* Keywords */}
          {analysis.keywordGaps?.length > 0 && (
            <div className="card p-5">
              <h3
                className="text-sm font-semibold mb-3"
                style={{ color: 'var(--text-1)' }}
              >
                Keywords to Add
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.keywordGaps.map((kw, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      background: 'var(--surface2)',
                      color: 'var(--accent-h)',
                      border: '1px solid var(--border2)',
                    }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Improvements */}
          {analysis.improvements?.length > 0 && (
            <div className="card p-5">
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: 'var(--text-1)' }}
              >
                Improvements
              </h3>
              <div className="space-y-4">
                {analysis.improvements.map((item, i) => (
                  <div key={i} className="card-elevated p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          background: 'var(--bg)',
                          color: 'var(--text-2)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {item.category}
                      </span>
                      <PriorityBadge priority={item.priority} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <div
                        className="rounded-lg p-3 text-xs"
                        style={{
                          background: 'rgba(239,68,68,0.06)',
                          border: '1px solid rgba(239,68,68,0.12)',
                        }}
                      >
                        <p
                          className="font-semibold mb-1"
                          style={{ color: '#fca5a5' }}
                        >
                          Before
                        </p>
                        <p
                          className="italic leading-relaxed"
                          style={{ color: 'var(--text-2)' }}
                        >
                          "{item.before}"
                        </p>
                      </div>
                      <div
                        className="rounded-lg p-3 text-xs"
                        style={{
                          background: 'rgba(16,185,129,0.06)',
                          border: '1px solid rgba(16,185,129,0.15)',
                        }}
                      >
                        <p
                          className="font-semibold mb-1"
                          style={{ color: '#6ee7b7' }}
                        >
                          After
                        </p>
                        <p
                          className="leading-relaxed font-medium"
                          style={{ color: '#6ee7b7' }}
                        >
                          "{item.after}"
                        </p>
                      </div>
                    </div>

                    <div
                      className="rounded-lg p-3 text-xs"
                      style={{
                        borderLeft: '3px solid var(--warning)',
                        background: 'rgba(245,158,11,0.05)',
                      }}
                    >
                      <p
                        className="font-semibold mb-1"
                        style={{ color: 'var(--warning)' }}
                      >
                        Why it matters
                      </p>
                      <p
                        className="leading-relaxed"
                        style={{ color: 'var(--text-2)' }}
                      >
                        {item.rationale}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzerPage;
