import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/analyzer', label: 'Resume' },
    { to: '/jobs', label: 'Jobs' },
    { to: '/interview', label: 'Interview' },
  ];

  return (
    <nav className="nav-blur fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #e8c96a, #c9a84c)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L9 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5L7 1Z" fill="#0d0d0f"/>
            </svg>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight" style={{ color: 'var(--cream)' }}>
            Apex<span style={{ color: 'var(--gold)' }}>AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                style={{
                  color: active ? 'var(--gold-light)' : 'var(--mist)',
                  background: active ? 'rgba(201, 168, 76, 0.1)' : 'transparent',
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* User */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2.5">
              <img
                src={user.image}
                alt="profile"
                className="w-8 h-8 rounded-full ring-2"
                style={{ ringColor: 'var(--gold-dim)' }}
              />
              <span className="text-sm font-medium" style={{ color: 'var(--mist-light)' }}>
                {user.displayName?.split(' ')[0]}
              </span>
            </div>
            <a
              href={`${import.meta.env.VITE_API_URL}/auth/logout`}
              className="btn-ghost text-xs px-3 py-1.5 font-medium"
            >
              Sign out
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
