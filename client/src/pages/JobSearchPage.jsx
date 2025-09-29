// client/src/pages/JobSearchPage.jsx
import React, { useState } from 'react';

const JobSearchPage = () => {
  const [query, setQuery] = useState('React Developer in India');
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setIsLoading(true);
    setJobs([]);
    setError('');

    try {
      // Note: We are calling our own backend, not RapidAPI directly.
      const response = await fetch(
        `/api/jobs/search?query=${encodeURIComponent(query)}`,
        {
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch jobs.');
      }

      const data = await response.json();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to safely truncate the description
  const truncateDescription = (text, maxLength = 150) => {
    if (!text) return 'No description available.';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Find Your Next Job
      </h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Job title, keywords, or company..."
          className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-200"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Results Section */}
      <div className="space-y-4">
        {error && <p className="text-center text-red-400">{error}</p>}

        {jobs.length > 0 &&
          jobs.map((job) => (
            <div
              key={job.job_id}
              className="bg-gray-800 p-4 rounded-lg shadow-md flex gap-4"
            >
              <img
                src={job.employer_logo || 'https://via.placeholder.com/150'}
                alt={`${job.employer_name} logo`}
                className="w-16 h-16 object-contain rounded-md bg-white"
              />
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-white">
                  {job.job_title}
                </h2>
                <p className="text-md text-gray-300">{job.employer_name}</p>
                <p className="text-sm text-gray-400">
                  {job.job_city}, {job.job_state}, {job.job_country}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {truncateDescription(job.job_description)}
                </p>
                <a
                  href={job.job_apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-blue-400 hover:text-blue-300 font-semibold"
                >
                  View & Apply →
                </a>
              </div>
            </div>
          ))}

        {isLoading && (
          <p className="text-center text-gray-400">Loading jobs...</p>
        )}
      </div>
    </div>
  );
};

export default JobSearchPage;
