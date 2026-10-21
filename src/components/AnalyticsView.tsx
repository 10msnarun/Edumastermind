/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Flame,
  ShieldCheck,
  PackageCheck,
  Network,
  Zap,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { ACHIEVEMENTS } from '../data/mockData';

export const AnalyticsView: React.FC = () => {
  const weeklyData = [
    { day: 'Mon', hours: 2.2, height: '65%' },
    { day: 'Tue', hours: 3.0, height: '90%' },
    { day: 'Wed', hours: 1.8, height: '55%' },
    { day: 'Thu', hours: 2.5, height: '75%' },
    { day: 'Fri', hours: 3.4, height: '100%' },
    { day: 'Sat', hours: 2.8, height: '82%' },
    { day: 'Sun', hours: 2.0, height: '60%' },
  ];

  const subjects = [
    { name: 'Cloud & DevOps Containerization', mastery: 94, color: 'from-teal-600 to-emerald-500' },
    { name: 'Advanced Distributed Systems', mastery: 88, color: 'from-violet-600 to-indigo-500' },
    { name: 'Modern Machine Learning & Attention', mastery: 76, color: 'from-purple-600 to-pink-500' },
    { name: 'Quantum Information Science', mastery: 64, color: 'from-blue-600 to-cyan-500' },
  ];

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'PackageCheck':
        return <PackageCheck className="w-6 h-6 text-teal-600" />;
      case 'Network':
        return <Network className="w-6 h-6 text-violet-600" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <BarChart3 className="w-7 h-7 text-violet-600" />
          Mastermind Learning Analytics & Velocity
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Real-time cognitive metrics, study consistency, and engineering certifications.
        </p>
      </div>

      {/* Top Velocity Stats (Light Cards with Violet/Teal/Amber Highlights) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
            <span>Weekly Study Volume</span>
            <Calendar className="w-4 h-4 text-violet-600" />
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono">17.7 hrs</p>
          <p className="text-xs text-teal-700 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> +18% compared to last week
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
            <span>Long-term Retention</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono">94.8%</p>
          <p className="text-xs text-slate-500 font-medium">Verified by spaced repetition recall</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
            <span>Current Study Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <p className="text-3xl font-black text-amber-600 font-mono">7 Days</p>
          <p className="text-xs text-slate-500 font-medium">All-time record: 24 days</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Hours Bar Graph */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-violet-600" />
              Daily Study Hours (This Week)
            </h2>
            <span className="text-xs text-slate-500 font-mono">Avg: 2.5 hrs/day</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2">
            {weeklyData.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="text-[11px] font-mono text-violet-700 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.hours}h
                </div>
                <div className="w-full bg-slate-100 rounded-t-lg h-36 flex items-end p-1">
                  <div
                    className="w-full bg-gradient-to-t from-violet-600 to-teal-400 rounded-t-md transition-all duration-500 group-hover:brightness-110"
                    style={{ height: item.height }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Mastery Progress Bars */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-600" />
              Domain Mastery Index
            </h2>
            <span className="text-xs text-slate-500 font-mono">Target: 90%+</span>
          </div>

          <div className="space-y-4 pt-2">
            {subjects.map((sub, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-800 font-semibold">{sub.name}</span>
                  <span className="font-mono font-bold text-violet-700">{sub.mastery}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${sub.color} h-full rounded-full transition-all duration-700`}
                    style={{ width: `${sub.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Unlocked Badges & Certifications (Light Cards with High-Fidelity Badges) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Earned Mastermind Badges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-3 hover:border-violet-300 hover:shadow-xs transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-violet-50 border border-violet-100">
                  {getBadgeIcon(ach.icon)}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {ach.rarity}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">{ach.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{ach.description}</p>
              </div>

              <div className="text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-100 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                Unlocked {ach.unlockedAt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
