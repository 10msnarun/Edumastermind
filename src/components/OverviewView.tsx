/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Award,
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  Server,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Cpu,
  Compass,
  Boxes,
  Zap,
  Check,
  ChevronRight,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { COURSES } from '../data/mockData';
import { AppConfig } from '../config';

interface OverviewViewProps {
  onNavigate: (path: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigate }) => {
  const activeCourse = COURSES[0];
  const devopsCourse = COURSES[1];

  const metrics = [
    { label: 'Daily Study Focus', value: '52 min', goal: '60 min target', progress: 86, icon: Clock, color: 'text-violet-600', barColor: 'bg-violet-600' },
    { label: 'Mastery Retention', value: '94.8%', goal: '+2.4% this week', progress: 95, icon: TrendingUp, color: 'text-teal-600', barColor: 'bg-teal-600' },
    { label: 'Concepts Mastered', value: '142', goal: '18 in progress', progress: 75, icon: Layers, color: 'text-indigo-600', barColor: 'bg-indigo-600' },
    { label: 'Mastermind Rank', value: 'Top 2%', goal: 'Level 14 Scholar', progress: 90, icon: Award, color: 'text-amber-500', barColor: 'bg-amber-500' },
  ];

  const roadmapSteps = [
    {
      step: '01',
      title: 'Distributed Foundations',
      description: 'CAP theorem, linearizability, and Raft consensus state machines.',
      icon: Cpu,
      status: 'In Progress (68%)',
      route: '/courses/advanced-distributed-systems',
      accent: 'border-violet-300 bg-violet-50/60 text-violet-800',
    },
    {
      step: '02',
      title: 'Containerization & DevOps',
      description: 'Hardened multi-stage Docker builds, unprivileged Nginx, and SPA routing.',
      icon: Boxes,
      status: 'Certified (92%)',
      route: '/courses/production-docker-and-containerization',
      accent: 'border-teal-300 bg-teal-50/60 text-teal-800',
    },
    {
      step: '03',
      title: 'Attention & LLM Mechanics',
      description: 'FlashAttention kernels, RoPE position embeddings, and KV cache inference.',
      icon: Zap,
      status: 'Enrolled (45%)',
      route: '/courses/attention-mechanisms-and-llms',
      accent: 'border-indigo-300 bg-indigo-50/60 text-indigo-800',
    },
    {
      step: '04',
      title: 'Quantum Computing Circuits',
      description: 'Bloch spheres, state superposition, entanglement, and Shor factoring.',
      icon: Compass,
      status: 'Queued (25%)',
      route: '/courses/quantum-algorithms-and-qubits',
      accent: 'border-amber-300 bg-amber-50/60 text-amber-800',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Enhanced Hero Section with Layered Educational Graphics */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/40 border border-slate-200/90 p-8 sm:p-12 shadow-sm">
        {/* Soft background ambient gradient accents */}
        <div className="absolute top-0 right-1/4 -mt-16 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 -mb-16 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Typography, Copy, Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-800 border border-violet-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <span>EduMastermind Platform v{AppConfig.version} · High-Velocity EdTech</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Master Deep Tech & Engineering.{' '}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                Accelerate Your Brilliance.
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Accelerate your grasp of Distributed Systems, Production Containerization, Machine Learning Architectures, and Quantum Mechanics through interactive visual simulations, timed mastery arenas, and spaced repetition.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('/mastery-arena')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm shadow-md shadow-violet-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Award className="w-4 h-4" />
                <span>Enter Mastery Arena</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/courses')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm transition-all shadow-2xs"
              >
                <BookOpen className="w-4 h-4 text-teal-600" />
                <span>Explore Curricula</span>
              </button>

              <button
                onClick={() => onNavigate('/docker')}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 text-xs font-mono font-medium transition-all shadow-2xs"
              >
                <Server className="w-4 h-4 text-emerald-400" />
                <span>Inspect Pod Architecture</span>
              </button>
            </div>

            {/* Proof and Trust Strip */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-200/80 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-teal-600" /> 100% Interactive Quizzes
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-teal-600" /> Docker & Nginx Production Ready
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-teal-600" /> Spaced Repetition Flashcards
              </span>
            </div>
          </div>

          {/* Right Column: Visual Learning Card & Generated Holographic Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-white group">
              <img
                src="/src/assets/images/hero_edutech_learning_1792577190741.jpg"
                alt="EduMastermind Advanced Holographic Learning Sphere"
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 text-xs font-bold shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active Mastermind Simulation</span>
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-violet-700 uppercase tracking-wider">
                    Interactive Concept Model
                  </span>
                  <span className="text-slate-500 font-mono">Real-time Telemetry</span>
                </div>
                <p className="text-xs font-semibold text-slate-800">
                  Consensus Invariants · KV Caching · Multi-Stage Isolation
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>94.8% Concept Retention</span>
                  <span className="text-teal-700 font-bold">Health 200 OK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row (Light, Card-Based with Clean Shadows) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">{metric.label}</span>
                <div className={`p-2 rounded-lg bg-slate-100 ${metric.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 mb-2">{metric.value}</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2">
                <div
                  className={`${metric.barColor} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${metric.progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 font-medium">{metric.goal}</p>
            </div>
          );
        })}
      </section>

      {/* Visual Learning Roadmap Diagram */}
      <section className="rounded-3xl bg-white border border-slate-200/80 p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet-700 mb-1">
              <Compass className="w-4 h-4" />
              <span>Architectural Roadmap</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              The Mastermind Engineering Pathway
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/courses')}
            className="text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1 self-start sm:self-auto"
          >
            View Full Syllabi <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Step Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {roadmapSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                onClick={() => onNavigate(step.route)}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-violet-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-violet-600 transition-colors">
                      Stage {step.step}
                    </span>
                    <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs text-slate-700 group-hover:text-violet-600 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-600">{step.status}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform group-hover:text-violet-600" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Continue Learning & Daily Challenge Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Continue Track (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-violet-100 text-violet-700">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Continue Your Mastermind Track</h2>
                <p className="text-xs text-slate-500">Pick up right where you left off in your modules</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/courses')}
              className="text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1"
            >
              All Curricula <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* First Track Card with Thumbnail */}
          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-slate-200/90 space-y-4 hover:border-violet-300 hover:shadow-sm transition-all">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={activeCourse.thumbnailUrl}
                alt={activeCourse.title}
                className="w-full sm:w-28 h-24 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-violet-700">
                    {activeCourse.category} · {activeCourse.level}
                  </span>
                  <span className="text-xs font-semibold text-violet-700 bg-violet-100 px-2.5 py-0.5 rounded-full">
                    {activeCourse.progress}% Done
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 hover:text-violet-700 transition-colors">
                  {activeCourse.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {activeCourse.description}
                </p>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Current: {activeCourse.modules[2].title}</span>
                <span>{activeCourse.duration} total</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-violet-600 h-full rounded-full transition-all"
                  style={{ width: `${activeCourse.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/70">
              <div className="flex items-center gap-2">
                <img
                  src={activeCourse.instructor.avatar}
                  alt={activeCourse.instructor.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-300"
                />
                <span className="text-xs text-slate-700 font-medium">
                  {activeCourse.instructor.name}
                </span>
              </div>
              <button
                onClick={() => onNavigate(`/courses/${activeCourse.slug}`)}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                Resume Track <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Second Track Card */}
          <div className="p-5 rounded-2xl bg-teal-50/40 border border-teal-200/80 space-y-4 hover:border-teal-300 hover:shadow-sm transition-all">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={devopsCourse.thumbnailUrl}
                alt={devopsCourse.title}
                className="w-full sm:w-28 h-24 rounded-xl object-cover border border-teal-200 shrink-0"
              />
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
                    {devopsCourse.category} · {devopsCourse.level}
                  </span>
                  <span className="text-xs font-semibold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
                    {devopsCourse.progress}% Done
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 hover:text-teal-700 transition-colors">
                  {devopsCourse.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {devopsCourse.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-teal-200/60">
              <span className="text-xs text-teal-800 font-mono">
                Container Health Check & Nginx try_files module ready
              </span>
              <button
                onClick={() => onNavigate(`/courses/${devopsCourse.slug}`)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                Review Module <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Deep Navy High-Contrast Challenge & Docker Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Deep Navy Daily Mastermind Challenge */}
          <div className="rounded-3xl bg-[#0B132B] text-white border border-slate-800 p-6 space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-violet-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400">
                <Award className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Daily Challenge
                </span>
              </div>
              <span className="text-xs text-violet-300 font-semibold bg-violet-950/70 px-2.5 py-0.5 rounded-full border border-violet-700/50">+250 XP</span>
            </div>

            <h3 className="text-sm font-semibold text-slate-100 leading-snug">
              Why must Nginx use `try_files $uri $uri/ /index.html` in containerized React apps?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Test your grasp of client-side routing, non-root Nginx execution, and container cache invalidation in the live Arena.
            </p>

            <button
              onClick={() => onNavigate('/mastery-arena')}
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold tracking-wide uppercase shadow-md shadow-violet-600/30 transition-all flex items-center justify-center gap-2"
            >
              Solve Challenge in Arena
            </button>
          </div>

          {/* Docker Pod Diagnostics Summary Widget (Light Card) */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-900">Container Pod</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                HEALTHY
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Image:</span>
                <span className="text-violet-700 font-bold">edumastermind-web:latest</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Port Mapping:</span>
                <span className="text-emerald-700 font-bold">8080 ➔ 80 (Nginx)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Security Mode:</span>
                <span className="text-teal-700 font-bold">Non-Root (UID 101)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Health Endpoint:</span>
                <span className="text-amber-700 font-bold">/health (HTTP 200)</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('/docker')}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-slate-500" />
              <span>Full Docker Diagnostics & CLI</span>
            </button>
          </div>
        </div>
      </section>

      {/* Certification Preparation & Corporate Training Section */}
      <section className="rounded-3xl bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-10 space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <GraduationCap className="w-96 h-96 -mr-12 -mb-12" />
        </div>

        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-violet-200 text-xs font-semibold border border-white/20">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Enterprise & Certification Masterclasses</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Certification Preparation & Corporate Engineering Training
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Equip your engineering teams with verifiable expertise in Cloud-Native Containers, Distributed Consensus, and Deep Learning Inference with our interactive curriculum.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 relative z-10 text-xs">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <p className="text-amber-300 font-bold text-base">Certified Engineers</p>
            <p className="text-slate-300">Industry-standard badges in DevOps & Systems Architecture.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <p className="text-teal-300 font-bold text-base">Interactive Coding Labs</p>
            <p className="text-slate-300">Hands-on containerized sandbox environments.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <p className="text-violet-300 font-bold text-base">Continuous Retention</p>
            <p className="text-slate-300">Algorithmic spaced repetition to solidify concepts.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
