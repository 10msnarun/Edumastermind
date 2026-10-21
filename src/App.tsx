/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewView } from './components/OverviewView';
import { CoursesView } from './components/CoursesView';
import { MasteryArenaView } from './components/MasteryArenaView';
import { FlashcardsView } from './components/FlashcardsView';
import { AnalyticsView } from './components/AnalyticsView';
import { DockerInspectorView } from './components/DockerInspectorView';
import { AppConfig } from './config';
import { Server, GraduationCap, ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState(null, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Determine current active view based on path
  const renderCurrentView = () => {
    if (currentPath === '/' || currentPath === '/overview') {
      return <OverviewView onNavigate={navigateTo} />;
    }

    if (currentPath.startsWith('/courses')) {
      const parts = currentPath.split('/').filter(Boolean);
      const slug = parts.length > 1 ? parts[1] : undefined;
      return <CoursesView selectedSlug={slug} onNavigate={navigateTo} />;
    }

    if (currentPath.startsWith('/mastery-arena') || currentPath.startsWith('/arena')) {
      return <MasteryArenaView />;
    }

    if (currentPath.startsWith('/flashcards')) {
      return <FlashcardsView />;
    }

    if (currentPath.startsWith('/analytics')) {
      return <AnalyticsView />;
    }

    if (currentPath.startsWith('/docker') || currentPath.startsWith('/settings')) {
      return <DockerInspectorView />;
    }

    // Default fallback
    return <OverviewView onNavigate={navigateTo} />;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col selection:bg-violet-600 selection:text-white">
      {/* Sticky Global Navigation */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {renderCurrentView()}
      </main>

      {/* Deep Navy High-Contrast Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0B132B] text-slate-300 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-teal-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#0B132B] rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-violet-400" />
                </div>
              </div>
              <div>
                <p className="text-base font-bold text-white tracking-tight">EduMastermind Platform</p>
                <p className="text-xs text-slate-400">
                  Next-Generation Engineering & Advanced Science Mastery
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <button
                onClick={() => navigateTo('/courses')}
                className="hover:text-white transition-colors"
              >
                Curricula Catalog
              </button>
              <button
                onClick={() => navigateTo('/mastery-arena')}
                className="hover:text-white transition-colors"
              >
                Mastery Arena
              </button>
              <button
                onClick={() => navigateTo('/flashcards')}
                className="hover:text-white transition-colors"
              >
                Spaced Flashcards
              </button>
              <button
                onClick={() => navigateTo('/analytics')}
                className="hover:text-white transition-colors"
              >
                Learning Velocity
              </button>
              <button
                onClick={() => navigateTo('/docker')}
                className="hover:text-teal-300 text-teal-400 font-mono transition-colors flex items-center gap-1.5"
              >
                <Server className="w-3.5 h-3.5" />
                Docker Pod Diagnostics
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span>© 2026 EduMastermind</span>
              <span>·</span>
              <span className="text-slate-500">Containerized Static Delivery via Non-Root Nginx Alpine</span>
            </div>

            <div className="font-mono flex items-center gap-2 text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
              <span>Port 80 ➔ 8080</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-semibold">Health: 200 OK</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
