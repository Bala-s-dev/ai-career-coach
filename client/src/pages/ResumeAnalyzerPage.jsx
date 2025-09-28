// client/src/pages/ResumeAnalyzerPage.jsx
import React, { useState } from 'react';

const ResumeAnalyzerPage = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setAnalysis('');
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setIsLoading(true);
    setAnalysis('');
    setError('');

    const formData = new FormData();
    formData.append('resume', file); // 'resume' must match the key in upload.single('resume')

    try {
      const response = await fetch('http://localhost:5001/api/resume/analyze', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Important: sends cookies for authentication
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to analyze resume.');
      }

      const result = await response.json();
      // We'll display the extractedText for now
      setAnalysis(result.extractedText);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Resume Analyzer
      </h1>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        {/* ... form is the same ... */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="resume-upload"
              className="block text-lg font-medium text-gray-300 mb-2"
            >
              Upload your Resume (PDF only)
            </label>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
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

      {/* --- New Section to Display Results --- */}
      {error && (
        <div className="mt-6 p-4 bg-red-900 border border-red-700 text-red-200 rounded-lg">
          {error}
        </div>
      )}

      {analysis && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Extracted Text</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
            <pre className="whitespace-pre-wrap text-gray-300 text-sm">
              {analysis}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzerPage;
