import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ScorePip = ({ score }) => {
  const pct = Math.min(100, Math.max(0, score));
  const r = 22, circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const color = pct >= 75 ? '#4fd4a8' : pct >= 50 ? '#f5bc5c' : '#fca5a5';
  return (
    <div className="relative w-12 h-12 shrink-0">
      <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
        <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="3"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-xs font-bold" style={{ color }}>{score}</span>
      </div>
    </div>
  );
};

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
    {
      to: '/analyzer',
      iconBg: 'rgba(83,74,183,0.18)',
      iconBorder: 'rgba(83,74,183,0.28)',
      iconColor: '#a89dff',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12h6M9 16h6M9 8h2M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/></svg>,
      label: 'Analyze Resume',
      desc: 'Get AI-powered feedback',
    },
    {
      to: '/jobs',
      iconBg: 'rgba(29,158,117,0.15)',
      iconBorder: 'rgba(29,158,117,0.25)',
      iconColor: '#4fd4a8',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
      label: 'Find Jobs',
      desc: 'Search curated listings',
    },
    {
      to: '/interview',
      iconBg: 'rgba(239,159,39,0.15)',
      iconBorder: 'rgba(239,159,39,0.25)',
      iconColor: '#f5bc5c',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
      label: 'Practice Interview',
      desc: 'Prepare with AI coach',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto animate-fadeInUp">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'rgba(83,74,183,0.9)' }}>Dashboard</p>
        <h1 className="font-display text-4xl font-bold" style={{ color: 'var(--hero)' }}>
          Welcome back, {user.displayName?.split(' ')[0]}.
        </h1>
        <p className="mt-2 text-base" style={{ color: 'var(--body-text)' }}>Here's your career intelligence overview.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {quickActions.map(({ to, iconBg, iconBorder, iconColor, icon, label, desc }) => (
          <Link key={to} to={to}
            className="card p-5 flex items-center gap-4 group transition-all duration-200 cursor-pointer">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
              style={{ background: iconBg, border: `1px solid ${iconBorder}`, color: iconColor }}>
              {icon}
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ color: 'var(--hero)' }}>{label}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--meta)' }}>{desc}</div>
            </div>
            <svg className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--meta)' }}>
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </Link>
        ))}
      </div>

      {/* History */}
      <div className="card p-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-semibold text-lg" style={{ color: 'var(--hero)' }}>Analysis History</h2>
          <Link to="/analyzer" className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{ color: '#c4bfff', background: 'rgba(83,74,183,0.15)', border: '1px solid rgba(83,74,183,0.25)' }}>
            + New Analysis
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="shimmer-loading rounded-xl h-16" />)}
          </div>
        ) : history.length > 0 ? (
          <div className="space-y-3">
            {history.map((item) => {
              const score = item.score ?? 0;
              const isHigh = score >= 75;
              const isMid = score >= 50 && score < 75;
              const badgeBg   = isHigh ? 'rgba(29,158,117,0.18)' : isMid ? 'rgba(239,159,39,0.18)' : 'rgba(239,68,68,0.15)';
              const badgeBdr  = isHigh ? 'rgba(29,158,117,0.3)'  : isMid ? 'rgba(239,159,39,0.3)'  : 'rgba(239,68,68,0.25)';
              const badgeClr  = isHigh ? '#4fd4a8'               : isMid ? '#f5bc5c'               : '#fca5a5';
              const badgeTxt  = isHigh ? 'High Match'            : isMid ? 'Good Fit'              : 'Needs Work';
              return (
                <div key={item._id} className="card-elevated p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <ScorePip score={score} />
                    <div>
                      <p className="font-medium text-sm" style={{ color: 'var(--hero)' }}>
                        {item.isTargetedAnalysis ? 'Targeted Analysis' : 'General Analysis'}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--meta)' }}>
                        {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full"
                      style={{ background: badgeBg, border: `1px solid ${badgeBdr}`, color: badgeClr }}>
                      {badgeTxt}
                    </span>
                    <button className="text-xs font-medium transition-colors" style={{ color: 'var(--meta)' }}
                      onMouseEnter={e => e.target.style.color = 'var(--hero)'}
                      onMouseLeave={e => e.target.style.color = 'var(--meta)'}>
                      View →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'rgba(83,74,183,0.12)', border: '1px solid rgba(83,74,183,0.2)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a89dff" strokeWidth="1.5">
                <path d="M9 12h6M9 16h6M9 8h2M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/>
              </svg>
            </div>
            <p className="font-semibold mb-1" style={{ color: 'var(--hero)' }}>No analyses yet</p>
            <p className="text-sm mb-5" style={{ color: 'var(--meta)' }}>Upload your resume to get started</p>
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
