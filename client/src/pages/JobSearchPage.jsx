import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';

const JobSearchPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  // Bug fix: wrap in useCallback so it's stable for useEffect dep
  const handleSearch = useCallback(
    async (e, directQuery) => {
      if (e) e.preventDefault();
      const q = directQuery ?? query;
      if (!q.trim()) return;
      setIsLoading(true);
      setJobs([]);
      setError('');
      setSearched(true);
      try {
        const res = await api.get(
          `/jobs/search?query=${encodeURIComponent(q)}`,
        );
        setJobs(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || 'Search failed.',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [query],
  );

  // Bug fix: correctly use autoQuery, set state then search
  useEffect(() => {
    const autoQuery = location.state?.autoQuery;
    if (autoQuery) {
      setQuery(autoQuery);
      // Search directly with the value from state, not from stale query state
      (async () => {
        setIsLoading(true);
        setJobs([]);
        setError('');
        setSearched(true);
        try {
          const res = await api.get(
            `/jobs/search?query=${encodeURIComponent(autoQuery)}`,
          );
          setJobs(res.data);
        } catch (err) {
          setError(
            err.response?.data?.message || err.message || 'Search failed.',
          );
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [location.state]);

  const truncate = (text, max = 150) => {
    if (!text) return '';
    return text.length <= max ? text : text.slice(0, max) + '…';
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeInUp">
      <div className="mb-7">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
          Job Search
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>
          Search curated job listings worldwide.
        </p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: 'var(--text-3)' }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Job title, keywords, or company…"
            className="input-base pl-9"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="btn-primary px-5 shrink-0"
        >
          {isLoading ? 'Searching…' : 'Search'}
        </button>
      </form>

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

      {/* Skeletons */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="shimmer-loading h-24 rounded-xl" />
          ))}
        </div>
      )}

      {/* Results */}
      {!isLoading && jobs.length > 0 && (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div key={job.job_id} className="card p-4 flex gap-4 items-start">
              {/* Logo */}
              <div
                className="w-11 h-11 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-white"
                style={{ border: '1px solid var(--border)' }}
              >
                {job.employer_logo ? (
                  <img
                    src={job.employer_logo}
                    alt={job.employer_name}
                    className="w-9 h-9 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<span style="font-size:16px;font-weight:700;color:#374151">${job.employer_name?.[0] || '?'}</span>`;
                    }}
                  />
                ) : (
                  <span
                    style={{ fontSize: 16, fontWeight: 700, color: '#374151' }}
                  >
                    {job.employer_name?.[0] || '?'}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 justify-between">
                  <div className="min-w-0">
                    <h2
                      className="text-sm font-semibold leading-snug"
                      style={{ color: 'var(--text-1)' }}
                    >
                      {job.job_title}
                    </h2>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: 'var(--text-2)' }}
                    >
                      {job.employer_name}
                    </p>
                  </div>
                  <a
                    href={job.job_apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs px-3 py-1.5 shrink-0"
                  >
                    Apply →
                  </a>
                </div>

                <div className="flex gap-2 mt-2 flex-wrap">
                  {job.job_city && (
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        background: 'var(--surface2)',
                        color: 'var(--text-2)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      📍 {job.job_city}
                      {job.job_country ? `, ${job.job_country}` : ''}
                    </span>
                  )}
                  {job.job_employment_type && (
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        background: 'var(--surface2)',
                        color: 'var(--text-2)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {job.job_employment_type}
                    </span>
                  )}
                </div>

                {job.job_description && (
                  <p
                    className="text-xs mt-2 leading-relaxed"
                    style={{ color: 'var(--text-3)' }}
                  >
                    {truncate(job.job_description)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && jobs.length === 0 && !error && (
        <div className="text-center py-16">
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
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <p className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>
            {searched ? 'No jobs found' : 'Search for jobs above'}
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>
            {searched
              ? 'Try different keywords or a broader query'
              : 'Or use Resume Analyzer to auto-generate a search query'}
          </p>
        </div>
      )}
    </div>
  );
};

export default JobSearchPage;
