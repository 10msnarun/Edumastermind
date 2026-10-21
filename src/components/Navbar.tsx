/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  GraduationCap,
  Layers,
  Award,
  Sparkles,
  BarChart3,
  Server,
  Flame,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { AppConfig } from '../config';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', path: '/', icon: GraduationCap },
    { label: 'Curricula', path: '/courses', icon: Layers },
    { label: 'Mastery Arena', path: '/mastery-arena', icon: Award },
    { label: 'Flashcards', path: '/flashcards', icon: Sparkles },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Docker & DevOps', path: '/docker', icon: Server },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/' || currentPath === '/overview';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-teal-400 p-0.5 shadow-md shadow-violet-500/15 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-violet-600 group-hover:text-teal-600 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-slate-900">
                  EduMastermind
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 border border-violet-200">
                  Platform
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Master Any Concept · Accelerate Brilliance
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-violet-50 text-violet-800 border border-violet-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-violet-600' : 'text-slate-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Status Badges */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Live Container Status Badge */}
            <div
              onClick={() => handleNavClick('/docker')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium cursor-pointer hover:bg-emerald-100/60 transition-colors shadow-2xs"
              title="Click to view Docker healthcheck and container details"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] font-semibold">Port {AppConfig.containerPort} ➔ {AppConfig.hostPort}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>7-Day Streak</span>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-md">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-violet-50 text-violet-800 border border-violet-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 text-violet-600" />
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Nginx Web Container: Healthy
            </div>
            <span className="text-amber-700 font-semibold">🔥 7-Day Streak</span>
          </div>
        </div>
      )}
    </header>
  );
};
