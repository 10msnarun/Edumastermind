/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  RotateCw,
  Check,
  AlertCircle,
  HelpCircle,
  ThumbsUp,
  ArrowLeft,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { FLASHCARDS } from '../data/mockData';

export const FlashcardsView: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<string>('All');
  const [reviewedCount, setReviewedCount] = useState(0);

  const decks = ['All', 'Docker & DevOps', 'Distributed Systems', 'Web Architecture', 'AI Engineering'];

  const filteredCards = FLASHCARDS.filter(
    (card) => selectedDeck === 'All' || card.deck === selectedDeck
  );

  const card = filteredCards[currentIdx] || FLASHCARDS[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleRate = () => {
    setReviewedCount((prev) => prev + 1);
    handleNext();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Header and Deck Select */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-7 h-7 text-violet-600" />
            Spaced Repetition Flashcards
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Active recall for core systems, containerization, and modern algorithms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 shadow-2xs">
            Reviewed: <span className="font-bold text-violet-600">{reviewedCount}</span> cards
          </span>
        </div>
      </div>

      {/* Deck Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {decks.map((deck) => (
          <button
            key={deck}
            onClick={() => {
              setSelectedDeck(deck);
              setCurrentIdx(0);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedDeck === deck
                ? 'bg-violet-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-2xs'
            }`}
          >
            {deck}
          </button>
        ))}
      </div>

      {/* Card Progress HUD */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>
          Card {currentIdx + 1} of {filteredCards.length}
        </span>
        <span className="text-violet-600 font-semibold">Click card or press flip to reveal details</span>
      </div>

      {/* Interactive 3D Flippable Card (Light Modern Theme) */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer min-h-[320px] rounded-3xl bg-white border border-slate-200/90 hover:border-violet-300 p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-md relative transition-all duration-300 group select-none"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-violet-100 text-violet-800 border border-violet-200">
            {card.deck}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-violet-600 transition-colors">
            <RotateCw className="w-4 h-4" />
            <span>{isFlipped ? 'Showing Definition' : 'Click to Flip'}</span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="py-8 space-y-4 text-center">
          {!isFlipped ? (
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest text-slate-400">
                Term / Principle
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-violet-700 transition-colors">
                {card.term}
              </h2>
            </div>
          ) : (
            <div className="space-y-4 text-left max-w-xl mx-auto">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-teal-700">
                  Definition
                </span>
                <p className="text-base sm:text-lg font-semibold text-slate-900 mt-1 leading-snug">
                  {card.definition}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-violet-50/50 border border-violet-200/80 space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-violet-800">
                  Deep Dive & Architecture
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {card.conceptDeepDive}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
          <span>Difficulty: {card.difficulty}</span>
          <span>Tap anywhere to toggle side</span>
        </div>
      </div>

      {/* Active Recall Rating Controls */}
      <div className="space-y-3">
        <p className="text-center text-xs text-slate-500 font-semibold uppercase tracking-wider">
          Rate Your Recall Difficulty:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={handleRate}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition-all shadow-2xs"
          >
            <AlertCircle className="w-4 h-4 text-rose-600" />
            Again (&lt;1m)
          </button>
          <button
            onClick={handleRate}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all shadow-2xs"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            Hard (10m)
          </button>
          <button
            onClick={handleRate}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold transition-all shadow-2xs"
          >
            <ThumbsUp className="w-4 h-4 text-blue-600" />
            Good (1d)
          </button>
          <button
            onClick={handleRate}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all shadow-2xs"
          >
            <Check className="w-4 h-4 text-emerald-600" />
            Easy (4d)
          </button>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-2xs text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>

        <button
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-2xs text-xs font-semibold transition-colors"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
