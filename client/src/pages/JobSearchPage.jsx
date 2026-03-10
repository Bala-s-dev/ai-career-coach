import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';

const JobSearchPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState('React Developer in India');
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e, directQuery) => {
    if (e) e.preventDefault();
    const searchQuery = directQuery || query;
    if (!searchQuery) return;
    setIsLoading(true); setJobs([]); setError('');
    try {
      const response = await api.get(`/jobs/search?query=${encodeURIComponent(searchQuery)}`);
      setJobs(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const autoQuery = location.state?.autoQuery;
    if (autoQuery) { setQuery(autoQuery); handleSearch(null, autoQuery); }
  }, [location.state]);

  const truncate = (text, max = 140) => {
    if (!text) return 'No description available.';
    return text.length <= max ? text : text.slice(0, max) + '…';
  };

  return (
    <div className="max-w-5xl mx-auto animate-fadeInUp">
      <div className="mb-8">
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--gold)' }}>Job Search</p>
        <h1 className="font-display text-4xl font-semibold" style={{ color: 'var(--cream)' }}>
          Find your next role
        </h1>
        <p className="mt-2" style={{ color: 'var(--mist)' }}>Search curated job listings worldwide.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <div className="relative flex-grow">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--mist)' }}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Job title, keywords, or company..."
            className="input-base pl-10"
          />
        </div>
        <button type="submit" disabled={isLoading}
          className="btn-primary px-7 py-3 text-sm font-semibold shrink-0">
          {isLoading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && (
        <p className="text-sm mb-6 text-center" style={{ color: '#fca5a5' }}>{error}</p>
      )}

      {isLoading && (
        <div className="space-y-3">
          {[1,2,3,4].map(i => <div key={i} className="shimmer-loading h-28 rounded-xl" />)}
        </div>
      )}

      {!isLoading && jobs.length > 0 && (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div key={job.job_id} className="card p-5 flex gap-4 items-start group transition-all duration-200"
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--ink-5)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--ink-4)'}>
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
                style={{ background: '#fff', border: '1px solid var(--ink-4)' }}>
                <img
                  src={job.employer_logo || ''}
                  alt={job.employer_name}
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span style="font-size:22px">${job.employer_name?.[0] || '?'}</span>`;
                  }}
                />
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-base leading-snug" style={{ color: 'var(--cream)' }}>{job.job_title}</h2>
                    <p className="text-sm mt-0.5 font-medium" style={{ color: 'var(--mist-light)' }}>{job.employer_name}</p>
                  </div>
                  <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer"
                    className="btn-primary px-4 py-2 text-xs shrink-0 font-semibold">
                    Apply →
                  </a>
                </div>
                <div className="flex items-center gap-2 mt-2 mb-2">
                  {job.job_city && (
                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'var(--ink-3)', color: 'var(--mist)' }}>
                      📍 {job.job_city}, {job.job_country}
                    </span>
                  )}
                  {job.job_employment_type && (
                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'var(--ink-3)', color: 'var(--mist)' }}>
                      {job.job_employment_type}
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--mist)' }}>{truncate(job.job_description)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && jobs.length === 0 && !error && (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-medium" style={{ color: 'var(--cream)' }}>Search for jobs above</p>
          <p className="text-sm mt-1" style={{ color: 'var(--mist)' }}>Or go to Resume Analyzer to auto-generate a query</p>
        </div>
      )}
    </div>
  );
};

export default JobSearchPage;
