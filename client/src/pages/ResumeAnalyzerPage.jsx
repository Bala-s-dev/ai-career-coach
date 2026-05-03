import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const PriorityBadge = ({ priority }) => {
  const map = {
    High:   { bg: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.25)',  color: '#fca5a5' },
    Medium: { bg: 'rgba(239,159,39,0.18)', border: 'rgba(239,159,39,0.3)',  color: '#f5bc5c' },
    Low:    { bg: 'rgba(29,158,117,0.18)', border: 'rgba(29,158,117,0.3)',  color: '#4fd4a8' },
  };
  const s = map[priority] || map.Low;
  return (
    <span className="px-2.5 py-1 text-xs font-semibold rounded-full"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
      {priority}
    </span>
  );
};

const ScoreRing = ({ score }) => {
  const pct = Math.min(100, Math.max(0, score || 0));
  const r = 46, circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="relative shrink-0" style={{ width: 110, height: 110 }}>
      <svg width="110" height="110" viewBox="0 0 110 110" style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#534AB7"/>
            <stop offset="100%" stopColor="#4fd4a8"/>
          </linearGradient>
        </defs>
        <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8"/>
        <circle cx="55" cy="55" r={r} fill="none" stroke="url(#rg)" strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}/>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-bold" style={{ fontSize: '1.6rem', color: 'var(--hero)' }}>{score}</span>
        <span style={{ fontSize: '0.65rem', color: 'var(--meta)' }}>/100</span>
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

  const handleFileChange = (f) => { setFile(f); setAnalysis(null); setError(''); };
  const handleDrop = (e) => {
    e.preventDefault(); setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === 'application/pdf') handleFileChange(dropped);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) { setError('Please select a resume file.'); return; }
    setIsLoading(true); setAnalysis(null); setError('');
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);
    try {
      const response = await api.post('/resume/analyze', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setAnalysis(response.data.analysis);
      setResumeText(response.data.extractedText);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindJobs = async () => {
    setIsLoadingJobs(true); setError('');
    try {
      const response = await api.post('/resume/generate-job-query', { resumeText });
      navigate('/jobs', { state: { autoQuery: response.data.query } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  const score = analysis?.matchScore || analysis?.overallScore;

  return (
    <div className="max-w-4xl mx-auto animate-fadeInUp">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'rgba(83,74,183,0.9)' }}>Resume Analyzer</p>
        <h1 className="font-display text-4xl font-bold" style={{ color: 'var(--hero)' }}>Elevate your resume</h1>
        <p className="mt-2" style={{ color: 'var(--body-text)' }}>Upload your PDF and get an AI-powered analysis in seconds.</p>
      </div>

      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* File upload */}
          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: 'var(--body-text)' }}>
              Resume (PDF)
            </label>
            <div
              className={`file-drop-zone p-8 text-center ${isDragging ? 'active' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('resume-upload').click()}
            >
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(83,74,183,0.15)', color: '#a89dff', border: '1px solid rgba(83,74,183,0.25)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 12h6M9 16h6M9 8h2M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm" style={{ color: 'var(--hero)' }}>{file.name}</p>
                    <p className="text-xs" style={{ color: 'var(--meta)' }}>{(file.size / 1024).toFixed(0)} KB • PDF</p>
                  </div>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="ml-4 text-xs px-3 py-1 rounded-lg" style={{ color: 'var(--meta)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--meta)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                  </div>
                  <p className="font-medium text-sm mb-1" style={{ color: 'var(--body-text)' }}>Drop your PDF here, or click to browse</p>
                  <p className="text-xs" style={{ color: 'var(--meta)' }}>PDF files only • Max 10 MB</p>
                </>
              )}
            </div>
            <input id="resume-upload" type="file" accept=".pdf" className="hidden"
              onChange={(e) => handleFileChange(e.target.files[0])} />
          </div>

          {/* Job description */}
          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: 'var(--body-text)' }}>
              Job Description{' '}
              <span style={{ color: 'var(--meta)', fontWeight: 400 }}>(optional — for targeted analysis)</span>
            </label>
            <textarea rows={6} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here for a more targeted score and keyword matching..."
              className="input-base resize-none" />
          </div>

          <button type="submit" disabled={isLoading || !file}
            className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
                </svg>
                Analyzing your resume…
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/></svg>
                Analyze My Resume
              </>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="mt-6 p-4 rounded-xl text-sm"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
          {error}
        </div>
      )}

      {analysis && (
        <div className="mt-8 space-y-5 animate-fadeInUp">
          {/* Find Jobs CTA */}
          <div className="card p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--hero)' }}>Ready to apply?</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--meta)' }}>Let AI find jobs matched to your resume</p>
            </div>
            <button onClick={handleFindJobs} disabled={isLoadingJobs}
              className="btn-primary px-5 py-2.5 text-sm shrink-0 flex items-center gap-2">
              {isLoadingJobs ? 'Thinking…' : '✦ Find Jobs For Me'}
            </button>
          </div>

          {/* Score */}
          <div className="card p-8 flex flex-col md:flex-row items-center gap-8">
            <ScoreRing score={score} />
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h2 className="font-display font-semibold text-xl" style={{ color: 'var(--hero)' }}>
                  {analysis.matchScore ? 'Job Match Score' : 'Resume Score'}
                </h2>
                {score >= 75 && <span className="badge-low px-2.5 py-1 text-xs font-semibold">Strong Match</span>}
                {score >= 50 && score < 75 && <span className="badge-medium px-2.5 py-1 text-xs font-semibold">Good Start</span>}
                {score < 50 && <span className="badge-high px-2.5 py-1 text-xs font-semibold">Needs Work</span>}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--body-text)' }}>{analysis.summary}</p>
            </div>
          </div>

          {/* Keywords */}
          <div className="card p-6">
            <h3 className="font-display font-semibold mb-4" style={{ color: 'var(--hero)' }}>Suggested Keywords to Add</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywordGaps.map((keyword, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ background: 'rgba(29,158,117,0.1)', color: '#4fd4a8', border: '1px solid rgba(29,158,117,0.2)' }}>
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Improvements */}
          <div className="card p-6">
            <h3 className="font-display font-semibold mb-5" style={{ color: 'var(--hero)' }}>Actionable Improvements</h3>
            <div className="space-y-5">
              {analysis.improvements.map((item, i) => (
                <div key={i} className="card-elevated p-5 rounded-xl">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--body-text)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {item.category}
                    </span>
                    <PriorityBadge priority={item.priority} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <div className="p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}>
                      <p className="text-xs font-semibold mb-1.5" style={{ color: '#fca5a5' }}>Before</p>
                      <p className="text-sm italic" style={{ color: 'var(--body-text)' }}>"{item.before}"</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ background: 'rgba(29,158,117,0.06)', border: '1px solid rgba(29,158,117,0.15)' }}>
                      <p className="text-xs font-semibold mb-1.5" style={{ color: '#4fd4a8' }}>After</p>
                      <p className="text-sm font-medium" style={{ color: '#4fd4a8' }}>"{item.after}"</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '2px solid rgba(239,159,39,0.4)' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: '#f5bc5c' }}>Why this matters</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--body-text)' }}>{item.rationale}</p>
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
