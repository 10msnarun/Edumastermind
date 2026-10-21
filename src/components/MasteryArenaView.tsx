/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Award,
  Clock,
  Flame,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/mockData';

export const MasteryArenaView: React.FC = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFinished, setIsFinished] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<
    { questionId: string; selected: number; isCorrect: boolean }[]
  >([]);

  const question = QUIZ_QUESTIONS[currentQuestionIdx];

  // Timer countdown
  useEffect(() => {
    if (isFinished || answerSubmitted) return;

    if (timeLeft <= 0) {
      handleOptionSelect(-1); // Timeout penalty
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isFinished, answerSubmitted]);

  const handleOptionSelect = (optionIdx: number) => {
    if (answerSubmitted) return;

    setSelectedOption(optionIdx);
    setAnswerSubmitted(true);

    const isCorrect = optionIdx === question.correctIndex;

    if (isCorrect) {
      const bonus = streak >= 2 ? 150 : 100;
      setScore((prev) => prev + bonus + timeLeft * 2);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        selected: optionIdx,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (currentQuestionIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setAnswerSubmitted(false);
      setTimeLeft(30);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setTimeLeft(30);
    setIsFinished(false);
    setAnswerSubmitted(false);
    setUserAnswers([]);
  };

  if (isFinished) {
    const correctCount = userAnswers.filter((a) => a.isCorrect).length;
    const accuracy = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

    return (
      <div className="max-w-2xl mx-auto space-y-8 pb-16">
        <div className="text-center rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-violet-600 p-0.5 mx-auto shadow-md">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Award className="w-8 h-8 text-amber-500" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900">Mastery Arena Completed!</h1>
            <p className="text-slate-600 text-sm">
              You tested your mastery of containerization, Nginx routing, and systems engineering.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Score</p>
              <p className="text-2xl font-black text-amber-600 font-mono">{score}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Accuracy</p>
              <p className="text-2xl font-black text-violet-700 font-mono">{accuracy}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Correct</p>
              <p className="text-2xl font-black text-teal-700 font-mono">
                {correctCount}/{QUIZ_QUESTIONS.length}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm shadow-md shadow-violet-500/20 transition-all hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Challenge
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Header and Live Score HUD (Clean Light Panel) */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-violet-100 text-violet-800 border border-violet-200">
            Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
          </span>
          <span className="text-xs text-slate-600 font-medium hidden sm:inline">
            Topic: {question.topic}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Streak: {streak}x</span>
          </div>

          <div className="flex items-center gap-1.5 text-violet-800 bg-violet-50 px-3 py-1 rounded-lg border border-violet-200">
            <Zap className="w-3.5 h-3.5 text-violet-600" />
            <span>Score: {score}</span>
          </div>

          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-mono ${
              timeLeft <= 8
                ? 'text-rose-700 bg-rose-50 border-rose-300 animate-pulse'
                : 'text-slate-700 bg-slate-100 border-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Question Card (Light with Violet & Teal Details) */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              {question.difficulty} Difficulty
            </span>
            <span className="text-xs text-slate-400">Instant Verification</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === question.correctIndex;

            let buttonStyle =
              'bg-slate-50 border-slate-200/80 text-slate-800 hover:border-violet-300 hover:bg-violet-50/40';

            if (answerSubmitted) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
              } else if (isSelected && !isCorrect) {
                buttonStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-semibold';
              } else {
                buttonStyle = 'bg-slate-50/40 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={answerSubmitted}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-start gap-3.5 ${buttonStyle}`}
              >
                <div
                  className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                    answerSubmitted && isCorrect
                      ? 'bg-emerald-600 text-white'
                      : answerSubmitted && isSelected && !isCorrect
                      ? 'bg-rose-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-600'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <div className="flex-1 leading-normal">{option}</div>
                {answerSubmitted && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {answerSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Detailed Explanation Box (Lavender Accent) */}
        {answerSubmitted && (
          <div className="p-5 rounded-2xl bg-violet-50/70 border border-violet-200 space-y-2">
            <div className="flex items-center gap-2 text-violet-800 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span>Engineering Mastermind Explanation:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Footer Next Button */}
        {answerSubmitted && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-all shadow-md shadow-violet-500/20"
            >
              <span>{currentQuestionIdx + 1 === QUIZ_QUESTIONS.length ? 'View Final Results' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
