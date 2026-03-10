import React from 'react';

const LandingPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const features = [
    {
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M9 12h6M9 16h6M9 8h2M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
      ),
      title: 'Resume Analyzer',
      description:
        'Upload your resume and receive a detailed AI-powered score, keyword gaps, and line-by-line improvement suggestions.',
    },
    {
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      ),
      title: 'Smart Job Search',
      description:
        'Find curated job listings matched to your experience. Let AI generate the perfect search query from your resume automatically.',
    },
    {
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Interview Coach',
      description:
        'Practice with AI-generated questions tailored to your target role, then receive instant, detailed feedback on every answer.',
    },
  ];

  const stats = [
    { value: '10k+', label: 'Careers Elevated' },
    { value: '94%', label: 'Interview Success Rate' },
    { value: '3×', label: 'More Callbacks' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--ink)' }}>
      {/* Nav */}
      <nav className="nav-blur fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #e8c96a, #c9a84c)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1L9 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5L7 1Z"
                  fill="#0d0d0f"
                />
              </svg>
            </div>
            <span
              className="font-display text-lg font-semibold tracking-tight"
              style={{ color: 'var(--cream)' }}
            >
              Career Coach<span style={{ color: 'var(--gold)' }}>AI</span>
            </span>
          </div>
          <a
            href={`${apiUrl}/auth/google`}
            className="btn-primary text-sm px-5 py-2.5"
          >
            Get Started Free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-grid relative min-h-screen flex items-center justify-center px-6 pt-16">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201, 168, 76, 0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">

          {/* Headline */}
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold leading-none tracking-tight mb-6">
            <span style={{ color: 'var(--cream)' }}>Land the job</span>
            <br />
            <span className="text-gold-gradient italic">you deserve.</span>
          </h1>

          <p
            className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'var(--mist)' }}
          >
            AI-powered resume analysis, personalized job matching, and live
            interview coaching — all in one elegant platform.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`${apiUrl}/auth/google`}
              className="btn-primary px-8 py-4 text-base flex items-center gap-2.5 w-full sm:w-auto justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
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
              Continue with Google
            </a>
            <a
              href="#features"
              className="btn-ghost px-8 py-4 text-base w-full sm:w-auto text-center"
              style={{ color: 'var(--mist-light)' }}
            >
              See how it works ↓
            </a>
          </div>

          {/* Stats */}
          <div className="mt-20 flex flex-wrap items-center justify-center gap-12">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-4xl font-semibold text-gold-gradient">
                  {value}
                </div>
                <div className="text-sm mt-1" style={{ color: 'var(--mist)' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-28 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: 'var(--gold-dim)' }}
          >
            What We Offer
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold"
            style={{ color: 'var(--cream)' }}
          >
            Every tool you need,
            <br />
            <span className="text-gold-gradient italic">
              nothing you don't.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon, title, description }, i) => (
            <div
              key={title}
              className="card p-7 flex flex-col gap-5 group hover:border-opacity-50 transition-all duration-300"
              style={{
                animationDelay: `${i * 0.1}s`,
                '--hover-border': 'var(--gold-dim)',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = 'var(--gold-dim)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = 'var(--ink-4)')
              }
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(201, 168, 76, 0.1)',
                  color: 'var(--gold)',
                  border: '1px solid rgba(201, 168, 76, 0.15)',
                }}
              >
                {icon}
              </div>
              <div>
                <h3
                  className="font-semibold text-lg mb-2"
                  style={{ color: 'var(--cream)' }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--mist)' }}
                >
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24" style={{ background: 'var(--ink-2)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm font-medium tracking-widest uppercase mb-4"
              style={{ color: 'var(--gold-dim)' }}
            >
              Process
            </p>
            <h2
              className="font-display text-4xl font-semibold"
              style={{ color: 'var(--cream)' }}
            >
              Up and running in minutes
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                num: '01',
                title: 'Connect your account',
                body: 'Sign in securely with Google. No passwords, no hassle.',
              },
              {
                num: '02',
                title: 'Upload your resume',
                body: 'Drop in your PDF and optionally paste a job description for targeted feedback.',
              },
              {
                num: '03',
                title: 'Get your action plan',
                body: 'Receive a scored analysis, keyword suggestions, and rewritten bullet points in seconds.',
              },
              {
                num: '04',
                title: 'Practice & apply',
                body: 'Use Interview Coach to rehearse, then use Smart Job Search to find matching roles.',
              },
            ].map(({ num, title, body }) => (
              <div key={num} className="flex gap-6 items-start card p-6">
                <div
                  className="font-display text-3xl font-semibold shrink-0 w-12 text-center"
                  style={{ color: 'var(--gold-dim)', lineHeight: 1 }}
                >
                  {num}
                </div>
                <div
                  className="divider-vertical w-px self-stretch"
                  style={{ background: 'var(--ink-5)' }}
                />
                <div>
                  <h4
                    className="font-semibold mb-1"
                    style={{ color: 'var(--cream)' }}
                  >
                    {title}
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--mist)' }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 py-24">
        <div
          className="max-w-3xl mx-auto rounded-2xl p-12 text-center relative overflow-hidden"
          style={{
            background: 'var(--ink-2)',
            border: '1px solid var(--ink-4)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(201, 168, 76, 0.12) 0%, transparent 60%)',
            }}
          />
          <div className="relative">
            <h2
              className="font-display text-4xl md:text-5xl font-semibold mb-4"
              style={{ color: 'var(--cream)' }}
            >
              Ready to stand out?
            </h2>
            <p className="mb-8" style={{ color: 'var(--mist)' }}>
              Join thousands of professionals who've elevated their career with
              Career CoachAI.
            </p>
            <a
              href={`${apiUrl}/auth/google`}
              className="btn-primary px-10 py-4 text-base inline-flex items-center gap-2.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
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
              Start for free
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8"
        style={{ borderTop: '1px solid var(--ink-4)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded flex items-center justify-center"
              style={{ background: 'var(--gold)' }}
            >
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1L9 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5L7 1Z"
                  fill="#0d0d0f"
                />
              </svg>
            </div>
            <span
              className="font-display text-sm font-semibold"
              style={{ color: 'var(--cream)' }}
            >
              Career Coach<span style={{ color: 'var(--gold)' }}>AI</span>
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--mist)' }}>
            © 2025 Career CoachAI. Helping careers reach their peak.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
