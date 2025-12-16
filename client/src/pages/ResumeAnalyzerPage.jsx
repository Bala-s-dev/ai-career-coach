import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const ResumeAnalyzerPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [error, setError] = useState('');

  const PriorityBadge = ({ priority }) => {
    const styles = {
      High: 'bg-red-200 text-red-800',
      Medium: 'bg-yellow-200 text-yellow-800',
      Low: 'bg-green-200 text-green-800',
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${
          styles[priority] || 'bg-gray-200 text-gray-800'
        }`}
      >
        {priority} Priority
      </span>
    );
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setAnalysis(null);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a resume file.');
      return;
    }

    setIsLoading(true);
    setAnalysis(null);
    setError('');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    try {
      
      const response = await api.post('/resume/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to analyze resume.');
      }

      const result = response.data;
      setAnalysis(result.analysis);
      setResumeText(result.extractedText);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindJobs = async () => {
    setIsLoadingJobs(true);
    setError('');
    try {
      const response = await api.post('/resume/generate-job-query', {
        resumeText,
      });
      if (!response.ok) throw new Error('Could not generate job query.');
      
      const data = response.data;

      navigate('/jobs', { state: { autoQuery: data.query } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingJobs(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Resume Analyzer
      </h1>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="resume-upload"
              className="block text-lg font-medium text-gray-300 mb-2"
            >
              1. Upload your Resume (PDF only)
            </label>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf"
              required
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="job-description"
              className="block text-lg font-medium text-gray-300 mb-2"
            >
              2. Paste a Job Description (Optional)
            </label>
            <textarea
              id="job-description"
              rows={8}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here for a more targeted analysis..."
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-200"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading || !file}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-300"
            >
              {isLoading ? 'Analyzing...' : 'Analyze My Resume'}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="mt-8 p-4 bg-red-900 border border-red-700 text-red-200 rounded-lg">
          {error}
        </div>
      )}

      {analysis && (
        <div className="mt-8 space-y-6">
          {/* --- NEW BUTTON --- */}
          <div className="text-center p-4">
            <button
              onClick={handleFindJobs}
              disabled={isLoadingJobs}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg disabled:bg-gray-500 transition duration-300 text-lg"
            >
              {isLoadingJobs ? 'Thinking...' : '✨ Find Jobs For Me'}
            </button>
          </div>
          {/* Overall Score & Summary */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold mb-4">Analysis Complete</h2>
            <div className="text-center mb-4">
              <p className="text-lg text-gray-400">
                {analysis.matchScore ? 'Job Match Score' : 'Overall Score'}
              </p>
              <p className="text-6xl font-bold text-blue-400">
                {analysis.matchScore || analysis.overallScore}/100
              </p>
            </div>
            <p className="text-gray-300">{analysis.summary}</p>
          </div>

          {/* Keyword Gaps */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-3">Suggested Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywordGaps.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-blue-300 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Improvement Suggestions */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-4">
              Actionable Improvements
            </h3>
            <div className="space-y-6">
              {analysis.improvements.map((item, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-500 pl-4 py-2"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-blue-300 bg-gray-700 px-2 py-1 rounded-md">
                      {item.category}
                    </p>
                    <PriorityBadge priority={item.priority} />
                  </div>

                  <p className="text-gray-400 text-sm">Original:</p>
                  <blockquote className="text-gray-300 italic">
                    "{item.before}"
                  </blockquote>
                  <p className="text-gray-400 text-sm mt-2">Suggestion:</p>
                  <p className="text-green-300 font-medium">"{item.after}"</p>

                  <div className="mt-3 bg-gray-700/50 p-3 rounded-md">
                    <p className="text-sm text-yellow-300 font-semibold">
                      Why?
                    </p>
                    <p className="text-sm text-gray-300">{item.rationale}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzerPage;
