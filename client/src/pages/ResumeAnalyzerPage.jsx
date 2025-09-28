// client/src/pages/ResumeAnalyzerPage.jsx
import React, { useState } from 'react';

const ResumeAnalyzerPage = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    console.log('Uploading file:', file.name);
    // Logic to send file to backend will go here
    // For now, we are just logging it.
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Resume Analyzer
      </h1>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Analyzing...' : 'Analyze My Resume'}
            </button>
          </div>
        </form>
      </div>

      {/* We will render the analysis results here later */}
    </div>
  );
};

export default ResumeAnalyzerPage;
