/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Clock,
  Star,
  Users,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  CheckCircle,
  PlayCircle,
  Layers,
  Sparkles,
  Share2,
  Check,
  Award,
} from 'lucide-react';
import { COURSES } from '../data/mockData';
import { Course } from '../types';

interface CoursesViewProps {
  selectedSlug?: string;
  onNavigate: (path: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ selectedSlug, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedModuleIdx, setExpandedModuleIdx] = useState<number | null>(0);

  const categories = [
    'All',
    'Computer Science',
    'Cloud & DevOps',
    'Artificial Intelligence',
    'Physics & Quantum',
  ];

  // If a specific slug is selected in URL (e.g. /courses/advanced-distributed-systems)
  const activeCourse = selectedSlug
    ? COURSES.find((c) => c.slug === selectedSlug || c.id === selectedSlug)
    : null;

  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // If viewing specific course detail (Nested Route)
  if (activeCourse) {
    return (
      <div className="space-y-8 pb-16">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('/courses')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white px-4 py-2 rounded-xl border border-slate-200/90 shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-violet-600" />
            Back to Curricula Catalog
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
              Route: /courses/{activeCourse.slug}
            </span>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
              }}
              title="Copy deep link"
              className="p-2 rounded-lg bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-2xs transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* High-Contrast Deep Navy Course Banner with 3D Graphic */}
        <div className="relative overflow-hidden rounded-3xl bg-[#0B132B] text-white border border-slate-800 p-8 sm:p-10 space-y-6 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {activeCourse.category}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Level: {activeCourse.level}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-teal-400" />
                  {activeCourse.duration}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {activeCourse.rating} ({activeCourse.studentsCount.toLocaleString()} enrolled)
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                {activeCourse.title}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
                {activeCourse.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src={activeCourse.instructor.avatar}
                    alt={activeCourse.instructor.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-violet-400"
                  />
                  <div>
                    <p className="text-sm font-bold text-white">{activeCourse.instructor.name}</p>
                    <p className="text-xs text-slate-400">{activeCourse.instructor.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNavigate('/mastery-arena')}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-colors"
                  >
                    Test Knowledge in Arena
                  </button>
                  <button
                    onClick={() => alert(`Enrolled in ${activeCourse.title}! Track saved.`)}
                    className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold shadow-lg shadow-violet-600/30 transition-all hover:scale-105"
                  >
                    Start Learning Now
                  </button>
                </div>
              </div>
            </div>

            {/* Course Thumbnail Image Column */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
                <img
                  src={activeCourse.thumbnailUrl}
                  alt={activeCourse.title}
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modules & Syllabus Breakdown (Light Container) */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-600" />
              Curriculum Syllabus ({activeCourse.modules.length} Modules)
            </h2>
            <span className="text-xs text-slate-500">
              Interactive video lessons, guided coding labs & conceptual checkpoints
            </span>
          </div>

          <div className="space-y-3">
            {activeCourse.modules.map((mod, idx) => {
              const isExpanded = expandedModuleIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-50/60 border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedModuleIdx(isExpanded ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-100/70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-800 border border-violet-200 flex items-center justify-center font-bold text-xs">
                        0{idx + 1}
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          {mod.title}
                        </h3>
                        <p className="text-xs text-slate-500">{mod.lessons.length} core topics · {mod.duration}</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-200 bg-white space-y-2.5">
                      {mod.lessons.map((lesson, lessonIdx) => (
                        <div
                          key={lessonIdx}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 hover:border-violet-300 transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <PlayCircle className="w-4 h-4 text-violet-600" />
                            <span>{lesson}</span>
                          </div>
                          <span className="text-slate-400 text-xs font-mono">15-30 min</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Course Catalog List View (Light Modern Theme)
  return (
    <div className="space-y-8 pb-16">
      {/* Header and Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <Layers className="w-7 h-7 text-violet-600" />
              Mastermind Curricula Catalog
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Rigorous, production-ready syllabi curated by staff engineers and researchers.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics, algorithms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 shadow-2xs transition-colors"
            />
          </div>
        </div>

        {/* Category Pills (Clean Segmented Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid with High-Quality 3D Thumbnails */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 hover:border-violet-300 p-6 space-y-5 transition-all hover:shadow-md group overflow-hidden"
          >
            {/* Visual Thumbnail */}
            {course.thumbnailUrl && (
              <div
                onClick={() => onNavigate(`/courses/${course.slug}`)}
                className="w-full h-44 rounded-2xl overflow-hidden border border-slate-100 cursor-pointer relative bg-slate-900"
              >
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/95 text-slate-800 shadow-xs">
                  {course.category}
                </span>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-violet-700">{course.level} Level</span>
                <span className="flex items-center gap-1 font-semibold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {course.rating}
                </span>
              </div>

              <h2
                onClick={() => onNavigate(`/courses/${course.slug}`)}
                className="text-lg font-bold text-slate-900 group-hover:text-violet-700 cursor-pointer transition-colors leading-snug"
              >
                {course.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="space-y-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-violet-600" />
                  {course.studentsCount.toLocaleString()} learners
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <span className="text-xs text-slate-700 font-medium">
                    {course.instructor.name}
                  </span>
                </div>

                <button
                  onClick={() => onNavigate(`/courses/${course.slug}`)}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all shadow-xs"
                >
                  View Syllabus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
