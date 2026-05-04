import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = ({ user }) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/resume/history', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setHistory(data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const firstName = user?.displayName?.split(' ')[0] || 'there';

  const actions = [
    {
      to: '/analyzer',
      label: 'Analyze Resume',
      desc: 'Upload and score your resume',
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M9 12h6M9 16h6M9 8h2M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
      ),
    },
    {
      to: '/jobs',
      label: 'Find Jobs',
      desc: 'Search curated listings',
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      ),
    },
    {
      to: '/interview',
      label: 'Practice Interview',
      desc: 'AI coaching and feedback',
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  const getScoreColor = (s) =>
    s >= 75 ? 'var(--success)' : s >= 50 ? 'var(--warning)' : 'var(--danger)';

  const getBadge = (s) => {
    if (s >= 75) return { cls: 'badge-low', label: 'Strong' };
    if (s >= 50) return { cls: 'badge-medium', label: 'Good' };
    return { cls: 'badge-high', label: 'Needs work' };
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeInUp">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>
          Here's an overview of your career progress.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {actions.map(({ to, label, desc, icon }) => (
          <Link
            key={to}
            to={to}
            className="card p-4 flex items-center gap-3 group"
            style={{ textDecoration: 'none', transition: 'border-color 0.15s' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = 'var(--accent)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = 'var(--border)')
            }
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: 'var(--surface2)',
                color: 'var(--accent-h)',
              }}
            >
              {icon}
            </div>
            <div className="min-w-0">
              <p
                className="text-sm font-semibold truncate"
                style={{ color: 'var(--text-1)' }}
              >
                {label}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                {desc}
              </p>
            </div>
            <svg
              className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ color: 'var(--text-3)' }}
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        ))}
      </div>

      {/* History */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2
            className="font-semibold text-sm"
            style={{ color: 'var(--text-1)' }}
          >
            Analysis History
          </h2>
          <Link to="/analyzer" className="btn-primary text-xs px-3 py-1.5">
            + New Analysis
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="shimmer-loading h-14 rounded-lg" />
            ))}
          </div>
        ) : history.length > 0 ? (
          <div className="space-y-2">
            {history.map((item) => {
              const score = item.score ?? 0;
              const badge = getBadge(score);
              return (
                <div
                  key={item._id}
                  className="card-elevated px-4 py-3 flex items-center gap-4"
                >
                  {/* Score */}
                  <div
                    className="text-base font-bold shrink-0 w-9 text-center tabular-nums"
                    style={{ color: getScoreColor(score) }}
                  >
                    {score}
                  </div>
                  <div
                    className="w-px h-7 shrink-0"
                    style={{ background: 'var(--border2)' }}
                  />
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium truncate"
                      style={{ color: 'var(--text-1)' }}
                    >
                      {item.isTargetedAnalysis
                        ? 'Targeted Analysis'
                        : 'General Analysis'}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <span
                    className={`${badge.cls} text-xs font-medium px-2 py-0.5 rounded-full shrink-0`}
                  >
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10">
            <svg
              className="mx-auto mb-3"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              style={{ color: 'var(--text-3)' }}
            >
              <path d="M9 12h6M9 16h6M9 8h2M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
            </svg>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: 'var(--text-1)' }}
            >
              No analyses yet
            </p>
            <p className="text-xs mb-4" style={{ color: 'var(--text-3)' }}>
              Upload your resume to get started
            </p>
            <Link to="/analyzer" className="btn-primary text-xs px-4 py-2">
              Analyze My Resume
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
