import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = ({ user }) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/resume/history', { credentials: 'include' });
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

  const quickActions = [
    { to: '/analyzer', icon: '📄', label: 'Analyze Resume', desc: 'Get AI-powered feedback' },
    { to: '/jobs', icon: '🔍', label: 'Find Jobs', desc: 'Search curated listings' },
    { to: '/interview', icon: '🎯', label: 'Practice Interview', desc: 'Prepare with AI coach' },
  ];

  return (
    <div className="max-w-5xl mx-auto animate-fadeInUp">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--gold)' }}>Dashboard</p>
        <h1 className="font-display text-4xl font-semibold" style={{ color: 'var(--cream)' }}>
          Welcome back, {user.displayName?.split(' ')[0]}.
        </h1>
        <p className="mt-2 text-base" style={{ color: 'var(--mist)' }}>
          Here's an overview of your career progress.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {quickActions.map(({ to, icon, label, desc }) => (
          <Link
            key={to}
            to={to}
            className="card p-5 flex items-center gap-4 group transition-all duration-200"
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-dim)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--ink-4)'}
          >
            <div className="text-2xl w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'var(--ink-3)', border: '1px solid var(--ink-5)' }}>
              {icon}
            </div>
            <div>
              <div className="font-semibold text-sm group-hover:text-gold-gradient transition-all" style={{ color: 'var(--cream)' }}>
                {label}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--mist)' }}>{desc}</div>
            </div>
            <svg className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--gold)' }}>
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </Link>
        ))}
      </div>

      {/* History */}
      <div className="card p-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg" style={{ color: 'var(--cream)' }}>Analysis History</h2>
          <Link to="/analyzer" className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
            style={{ color: 'var(--gold)', background: 'rgba(201, 168, 76, 0.08)', border: '1px solid rgba(201, 168, 76, 0.15)' }}>
            + New Analysis
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="shimmer-loading rounded-lg h-16" />
            ))}
          </div>
        ) : history.length > 0 ? (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item._id}
                className="card-elevated p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="score-circle w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                    style={{
                      border: '2px solid var(--gold-dim)',
                      color: 'var(--gold-light)',
                      background: 'rgba(201, 168, 76, 0.08)',
                    }}>
                    {item.score}
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: 'var(--cream)' }}>
                      {item.isTargetedAnalysis ? 'Targeted Analysis' : 'General Analysis'}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--mist)' }}>
                      {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <button className="text-xs font-medium transition-colors"
                  style={{ color: 'var(--gold)' }}
                  onMouseEnter={e => e.target.style.color = 'var(--gold-light)'}
                  onMouseLeave={e => e.target.style.color = 'var(--gold)'}>
                  View →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="text-4xl mb-3">📄</div>
            <p className="font-medium mb-1" style={{ color: 'var(--cream)' }}>No analyses yet</p>
            <p className="text-sm mb-5" style={{ color: 'var(--mist)' }}>Upload your resume to get started</p>
            <Link to="/analyzer" className="btn-primary px-6 py-2.5 text-sm inline-block">
              Analyze My Resume
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
