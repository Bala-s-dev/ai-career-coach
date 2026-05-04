import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user }) => {
  const { pathname } = useLocation();

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/analyzer', label: 'Resume' },
    { to: '/jobs', label: 'Jobs' },
    { to: '/interview', label: 'Interview' },
  ];

  // Bug fix: Google OAuth passport returns photos array, not image directly
  const avatarUrl = user?.photos?.[0]?.value || user?.image || null;
  const firstName = user?.displayName?.split(' ')[0] || 'You';

  return (
    <nav className="nav-blur fixed top-0 left-0 w-full z-50">
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center gap-2">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 mr-4 shrink-0">
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
            className="font-semibold text-sm tracking-tight"
            style={{ color: 'var(--text-1)' }}
          >
            CareerCoach<span style={{ color: 'var(--accent-h)' }}>AI</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {links.map(({ to, label }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                style={{
                  color: active ? 'var(--text-1)' : 'var(--text-2)',
                  background: active ? 'var(--surface2)' : 'transparent',
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 ml-auto">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt={firstName}
              className="w-7 h-7 rounded-full object-cover"
              style={{ border: '1.5px solid var(--border2)' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <span
            className="text-sm hidden md:block"
            style={{ color: 'var(--text-2)' }}
          >
            {firstName}
          </span>
          <a
            href={`${import.meta.env.VITE_API_URL}/auth/logout`}
            className="btn-ghost text-xs px-3 py-1.5"
          >
            Sign out
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
