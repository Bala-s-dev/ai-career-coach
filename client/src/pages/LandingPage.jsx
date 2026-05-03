import React from 'react';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const LogoIcon = () => (
  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c6fee, #534AB7)', boxShadow: '0 0 20px rgba(83,74,183,0.55)' }}>
    <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
      <path d="M7 1L9 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5L7 1Z" fill="#fff"/>
    </svg>
  </div>
);

const LandingPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const features = [
    {
      color: 'rgba(83,74,183,0.2)',
      border: 'rgba(83,74,183,0.3)',
      iconColor: '#a89dff',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12h6M9 16h6M9 8h2M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/></svg>,
      title: 'Resume Analyzer',
      description: 'Upload your resume and receive a detailed AI-powered score, keyword gaps, and line-by-line improvement suggestions.',
    },
    {
      color: 'rgba(29,158,117,0.15)',
      border: 'rgba(29,158,117,0.25)',
      iconColor: '#4fd4a8',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
      title: 'Smart Job Search',
      description: 'Find curated job listings matched to your experience. Let AI generate the perfect search query from your resume automatically.',
    },
    {
      color: 'rgba(239,159,39,0.15)',
      border: 'rgba(239,159,39,0.25)',
      iconColor: '#f5bc5c',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
      title: 'Interview Coach',
      description: 'Practice with AI-generated questions tailored to your target role, then receive instant, detailed feedback on every answer.',
    },
  ];

  const steps = [
    { num: '01', title: 'Connect your account', body: 'Sign in securely with Google. No passwords, no hassle.' },
    { num: '02', title: 'Upload your resume', body: 'Drop in your PDF and optionally paste a job description for targeted feedback.' },
    { num: '03', title: 'Get your action plan', body: 'Receive a scored analysis, keyword suggestions, and rewritten bullet points in seconds.' },
    { num: '04', title: 'Practice & apply', body: 'Use Interview Coach to rehearse, then use Smart Job Search to find matching roles.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="nav-blur fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <LogoIcon />
            <span className="font-display text-lg font-bold tracking-tight" style={{ color: 'var(--hero)' }}>
              Career Coach<span style={{ color: '#a89dff' }}>AI</span>
            </span>
          </div>
          <a href={`${apiUrl}/auth/google`} className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2">
            <GoogleIcon /> Get Started Free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-grid relative min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(83,74,183,0.12) 0%, transparent 70%)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(83,74,183,0.12)', border: '1px solid rgba(83,74,183,0.28)' }}>
            <span className="pulse-live" />
            <span className="text-sm font-medium" style={{ color: '#c4bfff' }}>AI-Powered Career Intelligence</span>
          </div>

          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6">
            <span style={{ color: 'var(--hero)' }}>Land the job</span><br />
            <span className="text-gold-gradient">you deserve.</span>
          </h1>

          <p className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--body-text)' }}>
            AI-powered resume analysis, personalized job matching, and live interview coaching — all in one intelligent platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <a href={`${apiUrl}/auth/google`}
              className="btn-primary px-8 py-4 text-base flex items-center gap-2.5 w-full sm:w-auto justify-center">
              <GoogleIcon /> Continue with Google
            </a>
            <a href="#features" className="btn-ghost px-8 py-4 text-base w-full sm:w-auto text-center">
              See how it works ↓
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-12">
            {[{ value: '10k+', label: 'Careers Elevated' }, { value: '94%', label: 'Interview Success Rate' }, { value: '3×', label: 'More Callbacks' }].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-4xl font-bold text-gold-gradient">{value}</div>
                <div className="text-sm mt-1" style={{ color: 'var(--meta)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-28 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#4fd4a8' }}>What We Offer</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: 'var(--hero)' }}>
            Every tool you need,<br />
            <span className="text-gold-gradient">nothing you don't.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {features.map(({ color, border, iconColor, icon, title, description }, i) => (
            <div key={title} className="card p-7 flex flex-col gap-5 group cursor-default" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: color, color: iconColor, border: `1px solid ${border}` }}>
                {icon}
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2" style={{ color: 'var(--hero)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--body-text)' }}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24" style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--amber-lt, #f5bc5c)' }}>Process</p>
            <h2 className="font-display text-4xl font-bold" style={{ color: 'var(--hero)' }}>Up and running in minutes</h2>
          </div>
          <div className="space-y-4">
            {steps.map(({ num, title, body }) => (
              <div key={num} className="card p-6 flex gap-6 items-start group hover:border-purple-500/30">
                <div className="font-display text-3xl font-bold shrink-0 w-10 text-center" style={{ color: 'rgba(83,74,183,0.6)', lineHeight: 1 }}>{num}</div>
                <div className="w-px self-stretch" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--hero)' }}>{title}</h4>
                  <p className="text-sm" style={{ color: 'var(--body-text)' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto rounded-2xl p-12 text-center relative overflow-hidden"
          style={{ background: 'rgba(83,74,183,0.1)', border: '1px solid rgba(83,74,183,0.22)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(83,74,183,0.2) 0%, transparent 60%)' }} />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--hero)' }}>Ready to stand out?</h2>
            <p className="mb-8" style={{ color: 'var(--body-text)' }}>Join thousands of professionals who've elevated their career with CareerCoachAI.</p>
            <a href={`${apiUrl}/auth/google`} className="btn-primary px-10 py-4 text-base inline-flex items-center gap-2.5">
              <GoogleIcon /> Start for free
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <LogoIcon />
            <span className="font-display text-sm font-bold" style={{ color: 'var(--hero)' }}>
              Career Coach<span style={{ color: '#a89dff' }}>AI</span>
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--meta)' }}>© 2025 CareerCoachAI. Helping careers reach their peak.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
