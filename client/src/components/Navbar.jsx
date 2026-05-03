import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user }) => {
  const location = useLocation();

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/analyzer',  label: 'Resume'    },
    { to: '/jobs',      label: 'Jobs'      },
    { to: '/interview', label: 'Interview' },
  ];

  return (
    <nav className="nav-blur fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-4">

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #7c6fee, #534AB7)',
              boxShadow: '0 0 20px rgba(83,74,183,0.55)',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L9 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5L7 1Z" fill="#fff" />
            </svg>
          </div>
          <span
            className="font-display text-lg font-bold tracking-tight"
            style={{ color: 'var(--hero)' }}
          >
            Career Coach<span style={{ color: '#a89dff' }}>AI</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1 ml-6">
          {navLinks.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                style={{
                  color:      active ? '#c4bfff'                    : 'var(--meta)',
                  background: active ? 'rgba(83,74,183,0.20)'       : 'transparent',
                  border:     active ? '1px solid rgba(83,74,183,0.3)' : '1px solid transparent',
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Spacer + right side */}
        <div className="flex items-center gap-3 ml-auto">

          {/* AI live indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(29,158,117,0.1)', border: '1px solid rgba(29,158,117,0.2)' }}>
            <span className="pulse-live" />
            <span style={{ fontSize: '0.72rem', fontWeight: 500, color: '#4fd4a8' }}>AI Active</span>
          </div>

          {/* User */}
          {user && (
            <>
              <div className="hidden md:flex items-center gap-2.5">
                <img
                  src={user.image}
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                  style={{ border: '1.5px solid rgba(255,255,255,0.2)' }}
                />
                <span className="text-sm font-medium" style={{ color: 'var(--body-text)' }}>
                  {user.displayName?.split(' ')[0]}
                </span>
              </div>
              <a
                href={`${import.meta.env.VITE_API_URL}/auth/logout`}
                className="btn-ghost text-xs px-3 py-1.5 font-medium"
              >
                Sign out
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
