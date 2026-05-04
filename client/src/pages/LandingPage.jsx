import React from 'react';

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const LandingPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const features = [
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M9 12h6M9 16h6M9 8h2M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
      ),
      title: 'Resume Analyzer',
      desc: 'AI-powered score, keyword gaps, and line-by-line rewrites tailored to the role you want.',
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      ),
      title: 'Smart Job Search',
      desc: 'Curated listings matched to your experience. Auto-generate search queries from your resume.',
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Interview Coach',
      desc: 'Practice with AI questions for your target role and get instant, detailed feedback.',
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Nav */}
      <nav className="nav-blur fixed top-0 left-0 w-full z-50">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--accent)' }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1L9 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5L7 1Z"
                  fill="#fff"
                />
              </svg>
            </div>
            <span
              className="font-semibold text-sm"
              style={{ color: 'var(--text-1)' }}
            >
              CareerCoach<span style={{ color: 'var(--accent-h)' }}>AI</span>
            </span>
          </div>
          <a
            href={`${apiUrl}/auth/google`}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <GoogleIcon /> Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-grid min-h-screen flex items-center justify-center px-5 pt-14">
        <div className="max-w-2xl mx-auto text-center py-24">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-xs font-medium"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border2)',
              color: 'var(--text-2)',
            }}
          >
            <span className="pulse-live" />
            AI-Powered Career Tools
          </div>

          <h1
            className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-5"
            style={{ color: 'var(--text-1)' }}
          >
            Land the job
            <br />
            <span className="text-gold-gradient">you deserve.</span>
          </h1>

          <p
            className="text-base md:text-lg mb-10 leading-relaxed max-w-lg mx-auto"
            style={{ color: 'var(--text-2)' }}
          >
            Resume analysis, job matching, and interview coaching — everything
            you need to get hired, in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <a
              href={`${apiUrl}/auth/google`}
              className="btn-primary px-6 py-3 text-sm flex items-center gap-2 justify-center"
            >
              <GoogleIcon /> Continue with Google
            </a>
            <a
              href="#features"
              className="btn-ghost px-6 py-3 text-sm justify-center"
            >
              See features ↓
            </a>
          </div>

          <div className="flex flex-wrap gap-10 justify-center">
            {[
              ['10k+', 'Careers Elevated'],
              ['94%', 'Success Rate'],
              ['3×', 'More Callbacks'],
            ].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="text-2xl font-bold text-gold-gradient">{v}</div>
                <div
                  className="text-xs mt-1"
                  style={{ color: 'var(--text-3)' }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-5 py-20">
        <h2
          className="text-2xl font-bold mb-2 text-center"
          style={{ color: 'var(--text-1)' }}
        >
          Everything in one place
        </h2>
        <p
          className="text-sm mb-12 text-center"
          style={{ color: 'var(--text-2)' }}
        >
          Three tools, one workflow, zero fluff.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="card p-6">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{
                  background: 'var(--surface2)',
                  color: 'var(--accent-h)',
                  border: '1px solid var(--border2)',
                }}
              >
                {icon}
              </div>
              <h3
                className="font-semibold text-sm mb-2"
                style={{ color: 'var(--text-1)' }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-2)' }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section
        className="py-16"
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-3xl mx-auto px-5">
          <h2
            className="text-2xl font-bold mb-10 text-center"
            style={{ color: 'var(--text-1)' }}
          >
            Up and running in minutes
          </h2>
          <div className="space-y-3">
            {[
              [
                '01',
                'Sign in',
                'Securely connect with Google — no passwords needed.',
              ],
              [
                '02',
                'Upload your resume',
                'Drop in your PDF with an optional job description for targeted results.',
              ],
              [
                '03',
                'Get your action plan',
                'Score, keyword gaps, and rewritten bullets — delivered in seconds.',
              ],
              [
                '04',
                'Practice & apply',
                'Rehearse interviews, then find matching roles with Smart Job Search.',
              ],
            ].map(([num, title, body]) => (
              <div key={num} className="card p-5 flex gap-5 items-start">
                <span
                  className="text-lg font-bold shrink-0 w-8 text-center"
                  style={{ color: 'var(--accent)', lineHeight: 1.4 }}
                >
                  {num}
                </span>
                <div
                  className="w-px self-stretch"
                  style={{ background: 'var(--border2)' }}
                />
                <div>
                  <p
                    className="font-semibold text-sm mb-0.5"
                    style={{ color: 'var(--text-1)' }}
                  >
                    {title}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-2)' }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-5 py-20 text-center">
        <div
          className="card p-12 max-w-xl mx-auto"
          style={{ borderColor: 'rgba(99,102,241,0.2)' }}
        >
          <h2
            className="text-2xl font-bold mb-3"
            style={{ color: 'var(--text-1)' }}
          >
            Ready to stand out?
          </h2>
          <p className="text-sm mb-7" style={{ color: 'var(--text-2)' }}>
            Join thousands of professionals who've levelled up their career with
            CareerCoachAI.
          </p>
          <a
            href={`${apiUrl}/auth/google`}
            className="btn-primary px-7 py-3 text-sm flex items-center gap-2 justify-center mx-auto w-fit"
          >
            <GoogleIcon /> Start for free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-5 py-6"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <span
            className="text-sm font-semibold"
            style={{ color: 'var(--text-2)' }}
          >
            CareerCoach<span style={{ color: 'var(--accent-h)' }}>AI</span>
          </span>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>
            © 2025 CareerCoachAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
